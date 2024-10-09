import { themeStore } from '@/plugins/Theme/ThemeStore.js'
import { THEME_COLOR } from "./ThemeStore"

const spacingUnitsToClass = function (prefix, unit) {
    const unitMap = {
        "none": "0",
        "xs": "1",
        "sm": "3",
        "base": "5",
        "lg": "4",
        "xl": "7",
    }

    return unitMap[unit] ? `${prefix}${unitMap[unit]}` : ""
}

const positionUnitsToClass = function (unit) {
    let positionClass = []

    if (unit.x === "center" && unit.y === "center") { positionClass = ["bg-center"] } else {
        if (unit.x === "start") { positionClass.push("bg-left") }
        if (unit.x === "end") { positionClass.push("bg-right") }

        if (unit.y === "top") { positionClass[0] && positionClass.push(positionClass[0] + "-top") }
        if (unit.y === "bottom") { positionClass[0] && positionClass.push(positionClass[0] + "-bottom") }


        if (unit.x === "center" && unit.y === "top") { positionClass.push("bg-top") }
        if (unit.x === "center" && unit.y === "bottom") { positionClass.push("bg-bottom") }
    }

    return positionClass.join(" ")
}

const getSpacing = function (defaultStyles, block, nested, styleKey, spacingKey) {
    const defaultSpacing = { top: "none", start: "none", bottom: "none", end: "none" }
    const baseStyle = nested ? defaultStyles.nested?.all : defaultStyles.inline?.all

    const resolveSpacing = function (style, defaultSpacing) {
        return {
            top: style?.[styleKey]?.[spacingKey]?.top ?? defaultSpacing.top,
            start: style?.[styleKey]?.[spacingKey]?.start ?? defaultSpacing.start,
            bottom: style?.[styleKey]?.[spacingKey]?.bottom ?? defaultSpacing.bottom,
            end: style?.[styleKey]?.[spacingKey]?.end ?? defaultSpacing.end,
        }
    }

    let spacing = resolveSpacing(baseStyle, defaultSpacing)

    let globalBlockStyle =
        nested
            ? defaultStyles.nested?.blocks?.find((b) => b.type === block.type)?.style
            : defaultStyles.inline?.blocks?.find((b) => b.type === block.type)?.style

    spacing = resolveSpacing(globalBlockStyle, spacing)

    if (block.style) {
        spacing = resolveSpacing(block.style, spacing)
    }

    return spacing
}

const getPosition = function (defaultStyles, block, nested, styleKey, positionKey) {
    const defaultPosition = null
    const baseStyle = nested ? defaultStyles.nested?.all : defaultStyles.inline?.all

    const resolvePosition = function (style, defaultPosition) {
        let ret = {
            x: style?.[styleKey]?.[positionKey]?.x ?? defaultPosition?.x,
            y: style?.[styleKey]?.[positionKey]?.y ?? defaultPosition?.y,
        }

        if (ret.x && ret.y) {
            return ret
        }
        return defaultPosition
    }

    let position = resolvePosition(baseStyle, defaultPosition)

    let globalBlockStyle =
        nested
            ? defaultStyles.nested?.blocks?.find((b) => b.type === block.type)?.style
            : defaultStyles.inline?.blocks?.find((b) => b.type === block.type)?.style

    position = resolvePosition(globalBlockStyle, position)

    if (block.style) {
        position = resolvePosition(block.style, position)
    }

    return position
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

export const getBlockStyleClass = function (defaultStyles, block, nested, key) {
    let blockStyleClass = []
    let blockStyleCSS = []

    const padding = getSpacing(defaultStyles, block, nested, key, "padding")
    const margin = getSpacing(defaultStyles, block, nested, key, "margin")

    const backgroundColor = getProperty(defaultStyles, block, nested, key, "backgroundColor")
    const backgroundImage = getProperty(defaultStyles, block, nested, key, "backgroundImage")
    const backgroundPosition = getPosition(defaultStyles, block, nested, key, "backgroundPosition")
    const rounded = getProperty(defaultStyles, block, nested, key, "rounded")

    blockStyleClass.push(padding.top ? `${spacingUnitsToClass("pt-", padding.top)}` : '')
    blockStyleClass.push(padding.start ? `${spacingUnitsToClass("pl-", padding.start)}` : '')
    blockStyleClass.push(padding.bottom ? `${spacingUnitsToClass("pb-", padding.bottom)}` : '')
    blockStyleClass.push(padding.end ? `${spacingUnitsToClass("pr-", padding.end)}` : '')

    blockStyleClass.push(margin.top ? `${spacingUnitsToClass("mt-", margin.top)}` : '')
    blockStyleClass.push(margin.start ? `${spacingUnitsToClass("ml-", margin.start)}` : '')
    blockStyleClass.push(margin.bottom ? `${spacingUnitsToClass("mb-", margin.bottom)}` : '')
    blockStyleClass.push(margin.end ? `${spacingUnitsToClass("mr-", margin.end)}` : '')

    if (themeStore().color !== THEME_COLOR.DARK && themeStore().color !== THEME_COLOR.SEPIA) {
        backgroundColor && blockStyleCSS.push(`background-color: ${backgroundColor}`)
        backgroundImage && blockStyleCSS.push(`background-image: url('${backgroundImage}'); background-size: contain; background-repeat: no-repeat;`)
        backgroundPosition && blockStyleClass.push(positionUnitsToClass(backgroundPosition))
    }

    rounded && blockStyleClass.push(`rounded`)

    return { style: blockStyleCSS.join("; "), class: blockStyleClass.join(" ") }
}

// ----

const getPositionByKeyPath = function (baseStyle, block, keyPath) {
    const defaultPosition = null
    baseStyle = block.nested ? baseStyle.nested?.all : baseStyle.inline?.all

    const resolvePosition = function (style, defaultPosition) {
        let ret = {
            x: keyPath.split('.').reduce((obj, key) => obj?.[key], style)?.x ?? defaultPosition?.x,
            y: keyPath.split('.').reduce((obj, key) => obj?.[key], style)?.y ?? defaultPosition?.y,
        }

        if (ret.x && ret.y) {
            return ret
        }
        return defaultPosition
    }

    let position = resolvePosition(baseStyle, defaultPosition)

    let globalBlockStyle =
        block.nested
            ? baseStyle.nested?.blocks?.find((b) => b.type === block.type)?.style
            : baseStyle.inline?.blocks?.find((b) => b.type === block.type)?.style

    position = resolvePosition(globalBlockStyle, position)

    if (block.style) {
        position = resolvePosition(block.style, position)
    }

    return position
}

const getSpacingByKeyPath = function (baseStyle, block, keyPath) {
    const defaultSpacing = { top: "none", start: "none", bottom: "none", end: "none" }
    baseStyle = block.nested ? baseStyle.nested?.all : baseStyle.inline?.all

    const resolveSpacing = function (style, defaultSpacing) {
        return {
            top: keyPath.split('.').reduce((obj, key) => obj?.[key], style)?.top ?? defaultSpacing.top,
            start: keyPath.split('.').reduce((obj, key) => obj?.[key], style)?.start ?? defaultSpacing.start,
            bottom: keyPath.split('.').reduce((obj, key) => obj?.[key], style)?.bottom ?? defaultSpacing.bottom,
            end: keyPath.split('.').reduce((obj, key) => obj?.[key], style)?.end ?? defaultSpacing.end,
        }
    }

    let spacing = resolveSpacing(baseStyle, defaultSpacing)

    let globalBlockStyle =
        block.nested
            ? baseStyle.nested?.blocks?.find((b) => b.type === block.type)?.style
            : baseStyle.inline?.blocks?.find((b) => b.type === block.type)?.style

    spacing = resolveSpacing(globalBlockStyle, spacing)

    if (block.style) {
        spacing = resolveSpacing(block.style, spacing)
    }

    return spacing
}

const getPropertyByKeyPath = function (baseStyle, block, keyPath) {
    const defaultProperty = null
    baseStyle = block.nested ? baseStyle.nested?.all : baseStyle.inline?.all

    const resolveProperty = function (style, defaultProperty) {
        return keyPath.split('.').reduce((obj, key) => obj?.[key], style) ?? defaultProperty
    }

    let resultProperty = resolveProperty(baseStyle, defaultProperty)

    let globalBlockStyle =
        block.nested
            ? baseStyle.nested?.blocks?.find((b) => b.type === block.type)?.style
            : baseStyle.inline?.blocks?.find((b) => b.type === block.type)?.style

    resultProperty = resolveProperty(globalBlockStyle, resultProperty)

    if (block.style) {
        resultProperty = resolveProperty(block.style, resultProperty)
    }

    return resultProperty
}

export const ElementStyle = function (template, baseStyle, keyPath, block) {
    let blockStyleClass = []
    let blockStyleCSS = []

    const padding = getSpacingByKeyPath(baseStyle, block, `${keyPath ? keyPath + "." : ""}padding`)
    const margin = getSpacingByKeyPath(baseStyle, block, `${keyPath ? keyPath + "." : ""}margin`)

    const backgroundColor = getPropertyByKeyPath(baseStyle, block, `${keyPath ? keyPath + "." : ""}backgroundColor`)
    const backgroundImage = getPropertyByKeyPath(baseStyle, block, `${keyPath ? keyPath + "." : ""}backgroundImage`)
    const backgroundPosition = getPositionByKeyPath(baseStyle, block, `${keyPath ? keyPath + "." : ""}backgroundPosition`)
    const rounded = getPropertyByKeyPath(baseStyle, block, `${keyPath ? keyPath + "." : ""}rounded`)

    blockStyleClass.push(padding.top ? `!${spacingUnitsToClass("pt-", padding.top)}` : '')
    blockStyleClass.push(padding.start ? `!${spacingUnitsToClass("pl-", padding.start)}` : '')
    blockStyleClass.push(padding.bottom ? `!${spacingUnitsToClass("pb-", padding.bottom)}` : '')
    blockStyleClass.push(padding.end ? `!${spacingUnitsToClass("pr-", padding.end)}` : '')

    blockStyleClass.push(margin.top ? `!${spacingUnitsToClass("mt-", margin.top)}` : '')
    blockStyleClass.push(margin.start ? `!${spacingUnitsToClass("ml-", margin.start)}` : '')
    blockStyleClass.push(margin.bottom ? `!${spacingUnitsToClass("mb-", margin.bottom)}` : '')
    blockStyleClass.push(margin.end ? `!${spacingUnitsToClass("mr-", margin.end)}` : '')

    if (themeStore().color !== THEME_COLOR.DARK && themeStore().color !== THEME_COLOR.SEPIA) {
        backgroundColor && blockStyleCSS.push(`background-color: ${backgroundColor}`)
        backgroundImage && blockStyleCSS.push(`background-image: url('${backgroundImage}'); background-size: contain; background-repeat: no-repeat;`)
        backgroundPosition && blockStyleClass.push(positionUnitsToClass(backgroundPosition))
    } else if (themeStore().color === THEME_COLOR.DARK) {
        backgroundColor && blockStyleClass.push(`bg-gray-900`)
    } else if (themeStore().color === THEME_COLOR.SEPIA) {
        backgroundColor && blockStyleClass.push(`bg-amber-50`)
    }

    rounded && blockStyleClass.push(`rounded`)

    return { style: blockStyleCSS.join("; "), class: blockStyleClass.join(" ") }
}