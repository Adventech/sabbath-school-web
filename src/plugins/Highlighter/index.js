import rangy from 'rangy'
import './style.css'
import $ from "jquery"

class Highlighter {
    constructor () {
        this.rangy = rangy
    }

    normalizeInnerHTML (innerHTML) {
        return innerHTML.replace(/\n/gm, '').replace(/&nbsp;/gm, '\u00a0')
    }

    findNextTag (str) {
        let match = str.match(/<[^<>]+>/)
        return match ? match.index : null
    }

    // This function generates the array of position of the
    // text ignoring HTML tags. This is important when we are applying highlights to be inside the tags that
    // are already present in the innerHTML of the target element
    // for we can add highlights like that:
    //     <strong>Hello</strong> -> <strong><span class="highlight...">Hello</span></strong>
    getPositionsIgnoringTags (inputString) {
        const resultArray = [];
        const tagRegex = /<[^<>]+>/g;
        let currentIndex = 0;
        let openTags = []
        let tagIdCounter = 0

        inputString.replace(tagRegex, (match, index) => {
            // Process characters outside of the tag
            for (let i = currentIndex; i < index; i++) {
                let tagBoundaries = null
                if (openTags.length) {
                    tagBoundaries = openTags.at(-1)
                }
                resultArray.push({position: i, insideTag: !!openTags.length, tagBoundaries});
            }

            // Update the currentIndex to skip the tag


            if (match.indexOf("/") === 1) {
                let t = openTags.at(-1)

                // let t = openTags.find(o => o.id === tagIdCounter)
                t.closingStart = index
                t.closingEnd = index+match.length

                openTags.splice(-1)
            } else {
                tagIdCounter++
                openTags.push({openingStart: index, openingEnd: index+match.length, id: tagIdCounter})
            }

            currentIndex = index + match.length;
        });

        // Process remaining characters outside of tags
        for (let i = currentIndex; i < inputString.length; i++) {
            let tagBoundaries = null
            if (openTags.length) {
                tagBoundaries = openTags.at(-1)
            }
            resultArray.push({position: i, insideTag: !!openTags.length, tagBoundaries});
        }

        return resultArray;
    }

    // removing all created highlights i.e clearing
    async clearHighlights (element) {
        $(element).find("[class^=resource_highlight_]").each((i, e) => $(e).replaceWith($(e).html()))
    }

    // returns an array of highlights that do not overlap with the target highlight
    async filterOverlappingHighlights (highlight, existingHighlights) {
        let highlights = [highlight]

        for (let i = 0; i < existingHighlights.length; i++) {
            let existingHighlight = existingHighlights[i]

            if ((highlight.startIndex >= existingHighlight.startIndex && highlight.startIndex <= existingHighlight.endIndex)
                || (highlight.endIndex >= existingHighlight.startIndex && highlight.endIndex <= existingHighlight.endIndex)
                || (highlight.startIndex <= existingHighlight.startIndex && highlight.endIndex >= existingHighlight.endIndex)
            ) {
            } else {
                highlights.push(existingHighlight)
            }
        }
        return highlights
    }

    // returns the list of highlights that were applied
    // it will filter highlights that overlaps with the target highlight including "removing" highlight
    // removing highlight is not added to the list
    async applyHighlights (element, highlights, highlight) {
        await this.clearHighlights(element)

        highlights = highlight ? await this.filterOverlappingHighlights(highlight, highlights) : highlights
        let ret = []
        let absoluteHighlights = []
        let elementInnerHTML = this.normalizeInnerHTML(element.firstChild.innerHTML)
        let positions = this.getPositionsIgnoringTags(elementInnerHTML)

        // Very important function to split highlights into "subhighlights" if spans across
        // HTML elements.
        let self = this

        let processBoundaries = function (highlight) {
            let startIndex = positions[highlight.startIndex]
            let endIndex = positions[highlight.endIndex]

            if (startIndex === endIndex) { return }

            if (highlight.endIndex >= positions.length-1) {
                endIndex = positions.at(-1)
            }

            if ((startIndex.insideTag && endIndex.insideTag
                    && startIndex.tagBoundaries.id === endIndex.tagBoundaries.id)
                || !startIndex.insideTag && !endIndex.insideTag
            ) {
                absoluteHighlights.push({startIndex: startIndex.position, endIndex: endIndex.position+1, color: highlight.color})
                return
            }

            if (startIndex.insideTag && endIndex.insideTag && startIndex.tagBoundaries.id !== endIndex.tagBoundaries.id) {
                let nextTagPosition = self.findNextTag(elementInnerHTML.substring(startIndex.position))
                let e = nextTagPosition ? startIndex.position + nextTagPosition : startIndex.tagBoundaries.closingStart
                absoluteHighlights.push({startIndex: startIndex.position, endIndex: e, color: highlight.color})
                processBoundaries({startIndex: highlight.startIndex+(e-startIndex.position), endIndex: highlight.endIndex, color: highlight.color})
                return
            }

            if (startIndex.insideTag && !endIndex.insideTag) {
                absoluteHighlights.push({startIndex: startIndex.position, endIndex: startIndex.tagBoundaries.closingStart, color: highlight.color})
                processBoundaries({startIndex: highlight.startIndex+(startIndex.tagBoundaries.closingStart-startIndex.position), endIndex: highlight.endIndex, color: highlight.color})
                return
            }

            if (!startIndex.insideTag && endIndex.insideTag) {
                let nextTagPosition = self.findNextTag(elementInnerHTML.substring(startIndex.position))
                let e = nextTagPosition ? startIndex.position + nextTagPosition : startIndex.tagBoundaries.openingStart
                absoluteHighlights.push({startIndex: startIndex.position, endIndex: e, color: highlight.color})
                processBoundaries({startIndex: highlight.startIndex+(e-startIndex.position), endIndex: highlight.endIndex, color: highlight.color})
            }
        }

        for (let highlight of highlights) {
            if (!highlight.color) continue

            processBoundaries(highlight)
            ret.push(highlight)
        }

        absoluteHighlights = absoluteHighlights.sort((a, b) => b.endIndex - a.endIndex)

        for (let absoluteHighlight of absoluteHighlights) {
            let innerHTML = this.normalizeInnerHTML(element.firstChild.innerHTML)

            let startIndex = absoluteHighlight.startIndex
            let endIndex = absoluteHighlight.endIndex

            const openingTag = `<span class="resource_highlight_${absoluteHighlight.color}">`
            const closingTag = `</span>`

            let newHTML

            newHTML = [innerHTML.slice(0, endIndex), closingTag, innerHTML.slice(endIndex)].join('')
            newHTML = [newHTML.slice(0, startIndex), openingTag, newHTML.slice(startIndex)].join('');

            element.firstChild.innerHTML = newHTML
        }

        return ret
    }

    async getHighlightForElement (element, opts) {
        let selection

        selection = this.rangy.getSelection()
        const range = selection.getRangeAt(0)

        if (range.containsNode(element.firstChild, true)) {
            const bookmarkRange = range.getBookmark(element.firstChild)
            if (bookmarkRange.end) {
                return { startIndex: bookmarkRange.start, endIndex: bookmarkRange.end, ...opts }
            }
        }

        return null
    }
}

export default {
    install(vue, opts) {
        vue.config.globalProperties.$highlighter = new Highlighter()
    }
}