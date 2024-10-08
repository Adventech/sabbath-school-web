import { themeStore } from '@/plugins/Theme/ThemeStore.js'
import { THEME_COLOR } from "./ThemeStore"

const getPropertyByKeyPath = function (baseStyle, keyPath, block) {
    const defaultProperty = null

    const resolveProperty = function (style, defaultProperty) {
        return keyPath.split('.').reduce((obj, key) => obj?.[key], style) ?? defaultProperty
    }

    let resultProperty

    if (block) {
        baseStyle = block.nested ? baseStyle.nested?.all : baseStyle.inline?.all

        resultProperty = resolveProperty(baseStyle, defaultProperty)

        baseStyle =
            block.nested
                ? baseStyle.nested?.blocks?.find((b) => b.type === block.type)?.style
                : baseStyle.inline?.blocks?.find((b) => b.type === block.type)?.style

        resultProperty = resolveProperty(baseStyle, resultProperty)

        if (block.style) {
            resultProperty = resolveProperty(block.style, resultProperty)
        }

        return resultProperty
    }

    return resolveProperty(baseStyle, defaultProperty)
}

export const TextStyle = function (template, baseStyle, keyPath, block) {
    let textStyleClass = []
    let textStyleCSS = []

    const textTypeface = template.textTypeface ? getPropertyByKeyPath(baseStyle, `${keyPath ? keyPath + "." : ""}text.typeface`, block) : null
    const textColor = template.textColor ? getPropertyByKeyPath(baseStyle, `${keyPath ? keyPath + "." : ""}text.color`, block) : null
    const textSize = template.textSize ? getPropertyByKeyPath(baseStyle, `${keyPath ? keyPath + "." : ""}text.size`, block) : null
    const textAlignment = template.textAlignment ? getPropertyByKeyPath(baseStyle, `${keyPath ? keyPath + "." : ""}text.align`, block) : null
    const textOffset = template.textOffset ? getPropertyByKeyPath(baseStyle, `${keyPath ? keyPath + "." : ""}text.offset`, block) : null

    textTypeface && textStyleCSS.push(`font-family: '${textTypeface}'`) && textStyleClass.push(`${textTypeface}`)
    textSize && textStyleClass.push(`!text-${template.textSize(textSize)}`)
    textAlignment && textStyleClass.push(`!text-${template.textAlignment(textAlignment)}`)
    textOffset && textStyleClass.push(`!align-${template.textOffset(textOffset)}`)

    if (template.textColor && textColor) {
        if ((themeStore().color !== THEME_COLOR.SEPIA
                && themeStore().color !== THEME_COLOR.DARK)
            || !template.textColorThemeOverride) {
            textColor && textStyleCSS.push(`color: ${textColor} !important`)
        }
    }

    return { style: textStyleCSS.join("; "), class: textStyleClass.join(" ") }
}

export const InlineTextStyle = function (template, style) {
    let textStyleClass = []
    let textStyleCSS = []

    if (style && style.text) {
        if (template.textTypeface && style.text.typeface) {
            textStyleCSS.push(`font-family: '${style.text.typeface}'`)
        }

        if (template.textColor && style.text.color) {
            if ((themeStore().color !== THEME_COLOR.SEPIA
                && themeStore().color !== THEME_COLOR.DARK)
                || !template.textColorThemeOverride) {
                textStyleCSS.push(`color: ${style.text.color} !important`)
            }
        }

        if (template.textSize && style.text.size) {
            textStyleClass.push(`!text-${template.textSize(style.text.size)}`)
        }

        if (template.textAlignment && style.text.align) {
            textStyleClass.push(`!text-${template.textAlignment(style.text.align)}`)
        }

        if (template.textOffset && style.text.offset) {
            textStyleClass.push(`!align-${template.textOffset(style.text.offset)}`)
        }
    }
    return { style: textStyleCSS.join(";"), class: textStyleClass.join(" ") }
}