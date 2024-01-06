export const getDefaultBlockStyle = function () {
    return {
        margin: {
            end: "base",
            start: "base",
            top: "base",
            bottom: "base",
        },
        padding: {}
    }
}

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

export const getBlockStyleClass = function (style) {
    let blockStyle = {
        margin: {
            end: "base",
            start: "base",
            top: "base",
            bottom: "base",
        },
        padding: {}
    }
    let blockStyleClass = []
    let blockStyleCSS = ""

    if (style && style.block) {
        if (style.block.padding) {
            blockStyle.padding = { ...blockStyle.padding, ...style.block.padding }
        }

        if (style.block.margin) {
            blockStyle.margin = { ...blockStyle.margin, ...style.block.margin }
        }

        if (style.block.backgroundColor) {
            blockStyleCSS += `background-color: ${style.block.backgroundColor}`
        }
    }

    blockStyleClass.push(blockStyle.margin.top ? `${spacingUnitsToClass("mt-", blockStyle.margin.top)}` : '')
    blockStyleClass.push(blockStyle.margin.bottom ? `${spacingUnitsToClass("mb-", blockStyle.margin.bottom)}` : '')
    blockStyleClass.push(blockStyle.margin.start ? `${spacingUnitsToClass("ml-", blockStyle.margin.start)}` : '')
    blockStyleClass.push(blockStyle.margin.end ? `${spacingUnitsToClass("mr-", blockStyle.margin.end)}` : '')

    blockStyleClass.push(blockStyle.padding.top ? `${spacingUnitsToClass("pt-", blockStyle.padding.top)}` : '')
    blockStyleClass.push(blockStyle.padding.bottom ? `${spacingUnitsToClass("pb-", blockStyle.padding.bottom)}` : '')
    blockStyleClass.push(blockStyle.padding.start ? `${spacingUnitsToClass("pl-", blockStyle.padding.start)}` : '')
    blockStyleClass.push(blockStyle.padding.end ? `${spacingUnitsToClass("pr-", blockStyle.padding.end)}` : '')

    return { style: blockStyleCSS, class: blockStyleClass.join(" ") }
}