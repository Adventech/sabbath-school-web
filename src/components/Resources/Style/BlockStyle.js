import { marked } from "marked"
import { themeStore } from '@/plugins/Theme/ThemeStore.js'
import { TextStyle } from "@/plugins/Theme/TextStyle"
import { ElementStyle } from "@/plugins/Theme/BlockStyle"
import { StyledRenderer } from '@/components/Resources/Style/StyledRenderer'

export const BlockStyle = {
    template: {
        textSize: function (unit) {
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

            return unitMap[themeStore().size][unit] ?? ""
        },
        textTypeface: true,
        textAlignment: function (unit) {
            const unitMap = {
                "start": "start",
                "end": "end",
                "center": "center",
            }

            return unitMap[unit] ?? ""
        },
        textOffset: function (unit) {
            const unitMap = {
                "sup": "super text-xs font-bold",
                "sub": "sub text-xs font-bold",
            }

            return unitMap[unit] ?? ""
        },
        textColor: true,
        textColorThemeOverride: true,

        renderText: true,
        renderLink: true,
    },

    getElementStyle: function (baseStyle, keyPath, block) {
        let ret = { class: "", style: "" }
        if (!baseStyle) return ret
        return ElementStyle(this.template, baseStyle, keyPath, block)
    },

    getTextStyle: function (baseStyle, keyPath, block) {
        let ret = { class: "", style: "" }
        if (!baseStyle) return ret
        return TextStyle(this.template, baseStyle, keyPath, block)
    },

    getRenderedInlineText: function (text) {
        const renderer = StyledRenderer(this.template)
        return marked.parse(text, { renderer })
    }
}