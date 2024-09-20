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

export const getTextStyle = function (style) {
    let textStyleClass = []
    let textStyleCSS = ""
    if (style && style.text) {
        if (style.text.typeface) {
            textStyleCSS += `font-family: '${style.text.typeface}';`

        }

        if (themeStore().color === THEME_COLOR.LIGHT) {
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