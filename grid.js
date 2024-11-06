// grid.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Resize the canvas based on the grid size and screen
function resizeCanvas() {
    const maxCanvasSize = Math.min(GRID_COLUMNS * BASE_GRID_SIZE, 600); // Max width
    canvas.width = maxCanvasSize;
    canvas.height = maxCanvasSize; // Keep it square

    // Ensure the height does not exceed the max height of the border
    canvas.height = Math.min(canvas.height, Math.floor(window.innerHeight * 0.75));
    drawGrid(); // Redraw grid after resizing
}

// Draw the grid
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.strokeStyle = 'lightgray';

    const gridWidth = canvas.width / GRID_COLUMNS; // Dynamic grid size based on canvas width
    const gridHeight = canvas.height / GRID_ROWS; // Dynamic grid size based on canvas height

    for (let i = 0; i <= GRID_ROWS; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * gridHeight);
        ctx.lineTo(canvas.width, i * gridHeight);
        ctx.stroke();
    }

    for (let j = 0; j <= GRID_COLUMNS; j++) {
        ctx.beginPath();
        ctx.moveTo(j * gridWidth, 0);
        ctx.lineTo(j * gridWidth, canvas.height);
        ctx.stroke();
    }
}

// Initialize the grid
function initGrid() {
    drawGrid();
}

// Call resizeCanvas on load and on window resize
window.onload = () => {
    initGrid();
    resizeCanvas();
};
window.addEventListener('resize', resizeCanvas);