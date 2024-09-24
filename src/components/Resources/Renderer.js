import { marked } from "marked"
import { getTextStyle } from "@/plugins/Theme/TextStyle.js"
import { getInlineTextStyle } from "../../plugins/Theme/TextStyle"

const renderer = new marked.Renderer()

renderer.link = function (href, title, text) {
    if (href.indexOf("sspmBible://") === 0) {
        return `<a class="resource-link-sspm-bible" title="${title ?? ""}" href="${href}">${text}</a>`
    }

    if (href.indexOf("sspmEGW://") === 0) {
        return `<a class="resource-link-sspm-egw" title="${title ?? ""}" href="${href}">${text}</a>`
    }

    return `<a class="resource-link-other" title="${title ?? ""}" href="${href}" target="_blank">${text}</a>`
}

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
            const textStyle = getInlineTextStyle(styleOptions.style)
            inlineClass = textStyle.class
            inlineStyle = textStyle.style
        } catch (error) {
            console.error(`Error parsing JSON5 options: ${error}`)
        }

        // Customize the content based on the options
        return `<span class="${inlineClass}" style="${inlineStyle}">${content}</span>`
    });
};

export {
    marked,
    renderer
}