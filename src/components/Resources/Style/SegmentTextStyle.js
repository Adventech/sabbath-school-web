import { marked } from "marked"
import { StyledRenderer } from '@/components/Resources/Style/StyledRenderer'
import { TextStyle } from "@/plugins/Theme/TextStyle"

export const SegmentTitleTextStyle = {
    template: {
        textSize: function (unit) {
            const unitMap = {
                "xs": "xl",
                "sm": "2xl",
                "base": "3xl",
                "lg": "4xl",
                "xl": "5xl",
            }

            return unitMap[unit] ?? ""
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
        textOffset: false,
        textColor: true,
        textColorThemeOverride: true,

        renderText: true,
        renderLink: false,
    },

    getTextStyle: function (baseStyle, keyPath) {
        let ret = { class: "", style: "" }
        if (!baseStyle) return ret
        return TextStyle(this.template, baseStyle, keyPath, null)
    },

    getRenderedInlineText: function (text) {
        const renderer = StyledRenderer(this.template)
        return marked.parse(text, { renderer })
    }
}

export const SegmentSubtitleTextStyle = {
    ...SegmentTitleTextStyle,

    template: {
        textSize: function (unit) {
            const unitMap = {
                "xs": "xs",
                "sm": "sm",
                "base": "base",
                "lg": "lg",
                "xl": "xl",
            }

            return unitMap[unit] ?? ""
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
        textOffset: false,
        textColor: true,
        textColorThemeOverride: true,

        renderText: true,
        renderLink: false,
    },
}

export const SegmentDateTextStyle = {
    ...SegmentSubtitleTextStyle,
}