/*
 * LightningChartJS example for rendering a 'Mosaic chart'.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    SolidFill,
    ColorRGBA,
    DefaultLibraryStyle,
    emptyLine,
    emptyFill,
    UIElementBuilders,
    UIBackgrounds,
    UIOrigins,
    AxisTickStrategies,
    Themes
} = lcjs

const lc = lightningChart()

// Define an interface for creating mosaic charts.
let mosaicChart
// User side MosaicChart logic.
{
    mosaicChart = () => {
        // Create a XY-Chart and add a RectSeries to it for rendering rectangles.
        const chart = lc.ChartXY({
            // theme: Themes.dark 
        })
            .setTitle('Controlled Group Testing')
            .setMouseInteractions(false)
            // Disable default AutoCursor
            .setAutoCursorMode(0)
        const rectangles = chart.addRectangleSeries()

        const bottomAxis = chart.getDefaultAxisX()
            .setInterval(0, 100)
            .setScrollStrategy(undefined)
            .setMouseInteractions(false)
            .setTitle('%')
        const leftAxis = chart.getDefaultAxisY()
            .setInterval(0, 100)
            .setMouseInteractions(false)
            // Hide default ticks of left Axis.
            .setTickStrategy(AxisTickStrategies.Empty)
        const rightAxis = chart.addAxisY(true)
            .setInterval(0, 100)
            .setScrollStrategy(undefined)
            .setMouseInteractions(false)
            .setTitle('%')
        const topAxis = chart.addAxisX(true)
            .setInterval(0, 100)
            .setMouseInteractions(false)
            // Hide default ticks of top Axis.
            .setTickStrategy(AxisTickStrategies.Empty)

        // Create marker for the top of each column.
        const categoryMarkerBuilder = UIElementBuilders.PointableTextBox
            // Set the type of background for the marker.
            .setBackground(UIBackgrounds.Pointer)
            // Style the marker.
            .addStyler((marker) => marker
                // Hide Background. UIBackgrounds.None doesn't work for CustomTicks right now.
                .setBackground((background) => background
                    .setFillStyle(emptyFill)
                    .setStrokeStyle(emptyLine)
                )
                .setTextFillStyle(new SolidFill({ color: ColorRGBA(170, 170, 170) }))
            )
        // Create text on top of each section.
        const subCategoryLabelBuilder = UIElementBuilders.TextBox
            // Style the label.
            .addStyler(label => label
                // Set the origin point and fillStyle (color) for the label.
                .setOrigin(UIOrigins.Center)
                .setTextFillStyle(new SolidFill().setColor(ColorRGBA(255, 255, 255)))
                .setMouseInteractions(false)
            )

        const categories = []
        const yCategories = []
        const subCategories = []
        let margin = 4


        // Recreate rectangle figures from scratch.
        const _updateChart = () => {
            const px = { x: bottomAxis.scale.getPixelSize(), y: rightAxis.scale.getPixelSize() }
            // Remove already existing figures.
            rectangles.clear()
            // Make new figures from each category.
            const sumCategoryValues = categories.reduce((prev, cur) => prev + cur.value, 0)
            if (sumCategoryValues > 0) {
                let xPos = 0
                // For each category on a single column, recreate the marker to the left of the chart.
                for (const yCategory of yCategories) {
                    yCategory.tick
                        .setTextFormatter(_ => yCategory.name)
                        .setValue(yCategory.value)
                        .restoreMarker()
                }
                // For each category (or column)
                for (const category of categories) {
                    // Calculate the correct value to display for each category
                    const relativeCategoryValue = 100 * category.value / sumCategoryValues
                    const sumSubCategoryValues = category.subCategories.reduce((prev, cur) => prev + cur.value, 0)
                    // If there are subCategories for the column
                    if (sumSubCategoryValues > 0) {
                        // Recreate the tick to display above each category and set the correct value to it
                        category.tick
                            .setTextFormatter(_ => category.name + " (" + Math.round(relativeCategoryValue) + "%)")
                            .setValue(xPos + relativeCategoryValue / 2)
                            .restoreMarker()
                        let yPos = 0
                        for (const subCategory of category.subCategories) {
                            // Calculate proper value for the subCategory
                            const relativeSubCategoryValue = 100 * subCategory.value / sumSubCategoryValues
                            if (relativeSubCategoryValue > 0) {
                                const rectangleDimensions = {
                                    x: xPos + margin * px.x,
                                    y: yPos + margin * px.y,
                                    width: relativeCategoryValue - 2 * margin * px.x,
                                    height: relativeSubCategoryValue - 2 * margin * px.y
                                }
                                // Create a rectangle to represent the subCategory
                                rectangles.add(rectangleDimensions)
                                    .setFillStyle(subCategory.subCategory.fillStyle)
                                    .setStrokeStyle(emptyLine)
                                // Recreate the label for the subCategory and update the value for it
                                subCategory.label
                                    .setText(Math.round(relativeSubCategoryValue) + "%")
                                    .setPosition({ x: xPos + relativeCategoryValue / 2, y: yPos + relativeSubCategoryValue / 2 })
                                    .restore()
                            } else
                                // The subCategory is not shown, so we can dispose of its label.
                                subCategory.label.dispose()
                            yPos += relativeSubCategoryValue
                        }
                    } else {
                        // There are no subCategories for the column, so the elements related to it can be disposed.
                        category.tick
                            .disposeMarker()
                        category.subCategories.forEach(sub => sub.label.dispose())
                    }
                    xPos += relativeCategoryValue
                }
            }
        }
        // Method to add a new subCategory to the chart.
        const addSubCategory = () => {
            const subCategory = {
                fillStyle: DefaultLibraryStyle.seriesFill,
                setFillStyle(fillStyle) {
                    this.fillStyle = fillStyle
                    // Refresh the chart.
                    _updateChart()
                    return this
                }
            }
            subCategories.push(subCategory)
            return subCategory
        }
        // Method to add a new main category to the chart.
        const addCategory = (name) => {
            const category = {
                name,
                value: 0,
                tick: topAxis.addCustomTick(categoryMarkerBuilder)
                    .setGridStrokeStyle(emptyLine)
                ,
                subCategories: [],
                setCategoryValue(value) {
                    this.value = value
                    _updateChart()
                    return this
                },
                setSubCategoryValue(subCategory, value) {
                    const existing = this.subCategories.find(a => a.subCategory == subCategory)
                    if (existing !== undefined) {
                        existing.value = value
                    } else {
                        this.subCategories.push({
                            subCategory,
                            value,
                            label: chart.addUIElement(subCategoryLabelBuilder, { x: bottomAxis.scale, y: rightAxis.scale })
                        })
                    }
                    _updateChart()
                    return this
                }
            }
            categories.push(category)
            return category
        }
        // Method to add subCategory markers.
        const addYCategory = (name, value) => {
            const yCategory = {
                name,
                value: value,
                tick: leftAxis.addCustomTick(categoryMarkerBuilder)
                    .setGridStrokeStyle(emptyLine),
                setCategoryYValue(value) {
                    this.value = value
                    _updateChart()
                    return this
                }
            }
            yCategories.push(yCategory)
            return yCategory
        }
        // Return interface for mosaic chart
        return {
            addSubCategory,
            addCategory,
            addYCategory
        }
    }
}

// Use the interface for example.
const chart = mosaicChart()
chart.addYCategory("Refreshed", 80)
chart.addYCategory("No Effect", 40)
chart.addYCategory("Caused Exhaustion", 12)

const subCategory_exhaust = chart.addSubCategory()
    .setFillStyle(new SolidFill().setColor(ColorRGBA(200, 0, 0)))
const subCategory_noEffect = chart.addSubCategory()
    .setFillStyle(new SolidFill().setColor(ColorRGBA(240, 190, 0)))
const subCategory_refresh = chart.addSubCategory()
    .setFillStyle(new SolidFill().setColor(ColorRGBA(0, 180, 0)))

chart.addCategory('With caffeine')
    .setCategoryValue(48)
    .setSubCategoryValue(subCategory_exhaust, 25)
    .setSubCategoryValue(subCategory_noEffect, 35)
    .setSubCategoryValue(subCategory_refresh, 40)

chart.addCategory('Decaffeinated')
    .setCategoryValue(32)
    .setSubCategoryValue(subCategory_exhaust, 10)
    .setSubCategoryValue(subCategory_noEffect, 45)
    .setSubCategoryValue(subCategory_refresh, 45)

chart.addCategory('Placebo product')
    .setCategoryValue(20)
    .setSubCategoryValue(subCategory_exhaust, 20)
    .setSubCategoryValue(subCategory_noEffect, 50)
    .setSubCategoryValue(subCategory_refresh, 30)
