import { themeStore } from '@/plugins/Theme/ThemeStore.js'
import { THEME_COLOR } from "./ThemeStore"

const textOffsetToClass = function (prefix, unit) {
    const unitMap = {
        "sup": "super text-xs font-bold",
        "sub": "sub text-xs font-bold",
    }

    return unitMap[unit] ? `${prefix}${unitMap[unit]}` : ""
}

const textUnitsToClass = function (prefix, unit) {
    const unitMap = {
        "xs": {
            "xs": "3xs",
            "sm": "2xs",
            "base": "xs",
            "lg": "sm",
            "xl": "base",
        },
        "sm": {
            "xs": "2xs",
            "sm": "xs",
            "base": "sm",
            "lg": "base",
            "xl": "lg",
        },
        "base": {
            "xs": "xs",
            "sm": "sm",
            "base": "base",
            "lg": "lg",
            "xl": "xl",
        },
        "lg": {
            "xs": "sm",
            "sm": "base",
            "base": "lg",
            "lg": "xl",
            "xl": "2xl",
        },
        "xl": {
            "xs": "base",
            "sm": "lg",
            "base": "xl",
            "lg": "2xl",
            "xl": "3xl",
        },
    }

    return unitMap[themeStore().size][unit] ? `${prefix}${unitMap[themeStore().size][unit]}` : ""
}

const textAlignmentToClass = function (prefix, unit) {
    const unitMap = {
        "start": "start",
        "end": "end",
        "center": "center",
    }

    return unitMap[unit] ? `${prefix}${unitMap[unit]}` : ""
}

const getProperty = function (defaultStyles, block, nested, styleKey, propertyKey) {
    const defaultProperty = null
    const baseStyle = nested ? defaultStyles.nested?.all : defaultStyles.inline?.all

    const resolveProperty = function (style, defaultProperty) {
        return style?.[styleKey]?.[propertyKey] ?? defaultProperty
    }

    let resultProperty = resolveProperty(baseStyle, defaultProperty)

    let globalBlockStyle =
        nested
            ? defaultStyles.nested?.blocks?.find((b) => b.type === block.type)?.style
            : defaultStyles.inline?.blocks?.find((b) => b.type === block.type)?.style

    resultProperty = resolveProperty(globalBlockStyle, resultProperty)

    if (block.style) {
        resultProperty = resolveProperty(block.style, resultProperty)
    }

    return resultProperty
}

export const getTextStyleAndClass = function (defaultStyles, block, nested, key) {
    let textStyleClass = []
    let textStyleCSS = []

    const textTypeface = getProperty(defaultStyles, block, nested, key, "typeface")
    const textColor = getProperty(defaultStyles, block, nested, key, "color")
    const textSize = getProperty(defaultStyles, block, nested, key, "size")
    const textAlign = getProperty(defaultStyles, block, nested, key, "align")
    const textOffset = getProperty(defaultStyles, block, nested, key, "offset")

    textTypeface && textStyleCSS.push(`font-family: '${textTypeface}'`) && textStyleClass.push(`${textTypeface}`)
    textSize && textStyleClass.push(textUnitsToClass("text-", textSize))
    textAlign && textStyleClass.push(textAlignmentToClass("text-", textAlign))
    textOffset && textStyleClass.push(textAlignmentToClass("align-", textOffset))


    if (themeStore().color !== THEME_COLOR.DARK && themeStore().color !== THEME_COLOR.SEPIA) {
        textColor && textStyleCSS.push(`color: ${textColor}`)
    }

    return { style: textStyleCSS.join("; "), class: textStyleClass.join(" ") }
}

export const getInlineTextStyle = function (style) {
    let textStyleClass = []
    let textStyleCSS = []

    if (style && style.text) {
        if (style.text.typeface) {
            textStyleCSS.push(`font-family: '${style.text.typeface}'`)

        }

        if (themeStore().color !== THEME_COLOR.SEPIA && themeStore().color !== THEME_COLOR.DARK) {
            if (style.text.color) {
                textStyleCSS.push(`color: ${style.text.color}`)
            }
        }

        if (style.text.size) {
            textStyleClass.push(`${textUnitsToClass("text-", style.text.size)}`)
        }

        if (style.text.align) {
            textStyleClass.push(`${textAlignmentToClass("text-", style.text.align)}`)
        }

        if (style.text.offset) {
            textStyleClass.push(`${textOffsetToClass("align-", style.text.offset)}`)
        }
    }
    return { style: textStyleCSS.join(";"), class: textStyleClass.join(" ") }
}

export const getTextStyle = function (style) {
    let textStyleClass = []
    let textStyleCSS = ""

    if (false && style && style.text) {
        if (style.text.typeface) {
            textStyleCSS += `font-family: '${style.text.typeface}';`

        }

        if (themeStore().color !== THEME_COLOR.SEPIA && themeStore().color !== THEME_COLOR.DARK) {
            if (style.text.color) {
                textStyleCSS += `color: ${style.text.color};`
            }
        }

        if (style.text.size) {
            textStyleClass.push(`${textUnitsToClass("text-", style.text.size)}`)
        }

        if (style.text.align) {
            textStyleClass.push(`${textAlignmentToClass("text-", style.text.align)}`)
        }

        if (style.text.offset) {
            textStyleClass.push(`${textOffsetToClass("align-", style.text.offset)}`)
        }
    }
    return { style: textStyleCSS, class: textStyleClass.join(" ") }
}