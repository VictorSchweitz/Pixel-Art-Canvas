// Toolbar stuff
const toolbar = document.getElementById('toolbar')
const toggleToolbarBtn = document.getElementById('toggle-toolbar-btn')

// Open Toolbar
toggleToolbarBtn.addEventListener('click', () =>
{
   toolbar.classList.toggle('opened')
   toggleToolbarBtn.classList.toggle('close-toolbar')

   if (toolbar.classList.contains('opened'))
   {
      canvas.style.borderRadius = 'calc(var(--base-border-radius) / 2) calc(var(--base-border-radius) / 2) 0 0'
   }
   else
   {
      canvas.style.borderRadius = 'calc(var(--base-border-radius) / 2)'
   }
})

// Actual project variables //
/**
 * @type HTMLCanvasElement
 */
const canvas = document.getElementById('canvas')
const drawingCanvasContext = canvas.getContext('2d')
const guideLinesToggle = document.getElementById('guide-lines-toggle')
const colorInput = document.getElementById('color-input')
const clearCanvasBtn = document.getElementById('clear-canvas-btn')

// Number of cells for canvas length and height
const cellSideCount = 5

// Making the length and height of each cell take up an even amount of space
const cellPixelLength = canvas.width / cellSideCount

// Color history - used to tell the color of a given x and y coordinate
const colorHistory = {}

// Set default color
colorInput.value = '#009578'
colorInput.style.cursor = 'pointer'

// Guide lines toggle
guideLinesToggle.style.cursor = 'pointer'


// Initialize default canvas background color
drawingCanvasContext.fillStyle = '#fff'
drawingCanvasContext.fillRect(0, 0, canvas.width, canvas.height)

// Event listeners
canvas.addEventListener('mousedown', mouseDownOnCanvas)
clearCanvasBtn.addEventListener('click', clearCanvas)
guideLinesToggle.addEventListener('change', toggleGuideLines)


// Mousedown event on canvas
function mouseDownOnCanvas(e)
{
   // Ensure user is using their primary mouse button
   if (e.button !== 0)
   {
      return
   }

   // Achieve the position of the click //
   const canvasBoundingRect = canvas.getBoundingClientRect()
   const x = e.clientX - canvasBoundingRect.left
   const y = e.clientY - canvasBoundingRect.top
   const cellX = Math.floor(x / cellPixelLength)
   const cellY = Math.floor(y / cellPixelLength)
   // const currentColor = colorHistory[`${cellX}_${cellY}`]

   fillCell(cellX, cellY)

   console.log(cellX, cellY)
}

// Clear canvas
function clearCanvas()
{

}


// Toggle Guide Lines
function toggleGuideLines()
{

}

// Fill cell
function fillCell(cellX, cellY)
{
   // Setting the start x position to take up exact one square
   const startX = cellX * cellPixelLength

   // Setting the start y position to take up exact one square
   const startY = cellY * cellPixelLength

   // Setting the fill style to be the chosen color
   drawingCanvasContext.fillStyle = colorInput.value

   // Filling out the square at the given position with the chosen color
   drawingCanvasContext.fillRect(startX, startY, cellPixelLength, cellPixelLength)

   // Updating the color history for the given square
   colorHistory[`${cellX}_${cellY}`] = colorInput.value
}