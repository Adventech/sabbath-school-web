import { marked } from "marked"
import { InlineTextStyle } from "@/plugins/Theme/TextStyle"

export const StyledRenderer = function (template, blockData, userData, contextData) {
    const renderer = new marked.Renderer()

    if (template.renderLink) {
        renderer.link = function (href, title, text) {
            if (href.indexOf("sspmBible://") === 0) {
                return `<a class="resource-link resource-link-sspm-bible" title="${title ?? ""}" href="${href}">${text}</a>`
            }

            if ((href.indexOf("sspmEGW://") === 0) || (href.indexOf("sspmegw://") === 0)) {
                return `<a class="resource-link resource-link-sspm-egw" title="${title ?? ""}" href="${href.replace(/sspmegw/i, 'sspmEGW')}">${text}</a>`
            }

            if ((href.indexOf("sspmCompletion://") === 0) || (href.indexOf("sspmCompletion://") === 0)) {
                const id = href.replace(/sspmCompletion:\/\//i, '')
                let classes = ""
                let t = text
                let hasData = false

                if (blockData && blockData.completion && blockData.completion[id]) {

                    // If contextData exists even if empty string take precedence over what we got from API
                    if (contextData && contextData.completion && contextData.completion[id] != null) {
                        t = contextData.completion[id]
                        hasData = true
                    } else if (userData) {
                        for (let userDataItem of userData) {
                            if (userDataItem.completion && userDataItem.completion[id]){
                                t = userDataItem.completion[id]
                                hasData = true
                            }
                        }
                    }

                    // In case if there is no word entered or new word repeat the placeholder
                    if (t.length === 0) {
                        t = blockData.completion[id].placeholder.repeat(blockData.completion[id].correctCompletion ? blockData.completion[id].length : 10)
                    }

                    if (hasData) {
                        if (blockData.completion[id].correctCompletion) {
                            classes += t === blockData.completion[id].correctCompletion ? "resource-link-sspm-completion-correct" : "resource-link-sspm-completion-incorrect"
                        }
                    }
                }

                return `<a class="resource-link resource-link-sspm-completion ${classes}" href="${href}">${t}</a>`
            }

            return `<a class="resource-link resource-link-other" title="${title ?? ""}" href="${href}" target="_blank">${text}</a>`
        }
    }

    if (template.renderText) {
        renderer.text = function (text) {
            const regex = /\^\[(.*?)\]\((.*?)\)/gm;
            return text.replace(regex, (match, content, options) => {
                // Replace common HTML entities with their corresponding characters
                const decodedOptions = options
                    .replace(/&quot;/g, '"')
                    .replace(/&apos;/g, "'")
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&')

                // Parse the JSON5 options
                let styleOptions
                let inlineClass = ""
                let inlineStyle = ""
                try {
                    styleOptions = JSON.parse(decodedOptions)
                    const textStyle = InlineTextStyle(template, styleOptions.style)
                    inlineClass = textStyle.class
                    inlineStyle = textStyle.style
                } catch (error) {
                    console.error(`Error parsing JSON5 options: ${error}`)
                }

                // Customize the content based on the options
                return `<span class="${inlineClass}" style="${inlineStyle}">${content}</span>`
            });
        }
    }

    return renderer
}