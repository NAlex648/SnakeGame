// snakeGame.js
(function() {
    let snake, direction, food, score, gameOver, gameInterval;

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Expose initGame to the global scope
    window.initGame = function() {
        initGrid(); // Initialize the grid

        snake = [{ x: Math.floor(GRID_COLUMNS / 2), y: Math.floor(GRID_ROWS / 2) }];
        direction = 'RIGHT';
        score = 0;
        gameOver = false;
        createFood();

        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(update, 125);
    };

    // Create food at random positions
    function createFood() {
        do {
            food = {
                x: Math.floor(Math.random() * GRID_COLUMNS),
                y: Math.floor(Math.random() * GRID_ROWS)
            };
        } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
    }

    // Draw the snake and food
    function drawSnake() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawGrid(); // Redraw the grid

        // Draw the snake
        snake.forEach((segment, index) => {
            ctx.fillStyle = index === snake.length - 1 ? 'red' : 'black'; // Last segment is red
            ctx.fillRect(segment.x * (canvas.width / GRID_COLUMNS), segment.y * (canvas.height / GRID_ROWS), 
                        canvas.width / GRID_COLUMNS, canvas.height / GRID_ROWS);
        });

        // Draw the food
        ctx.fillStyle = 'green';
        ctx.fillRect(food.x * (canvas.width / GRID_COLUMNS), food.y * (canvas.height / GRID_ROWS), 
                    canvas.width / GRID_COLUMNS, canvas.height / GRID_ROWS);
    }

    // Update game state
    function update() {
        if (gameOver) return;

        const head = { ...snake[snake.length - 1] };

        if (direction === 'UP') head.y--;
        if (direction === 'DOWN') head.y++;
        if (direction === 'LEFT') head.x--;
        if (direction === 'RIGHT') head.x++;

        // Wrap around logic
        if (head.x < 0) head.x = GRID_COLUMNS - 1;
        else if (head.x >= GRID_COLUMNS) head.x = 0; 
        if (head.y < 0) head.y = GRID_ROWS - 1;
        else if (head.y >= GRID_ROWS) head.y = 0;

        if (head.x === food.x && head.y === food.y) {
            score++;
            updateScore(score);
            createFood(); // Create new food if the snake eats it
        } else {
            snake.shift(); // Remove the tail segment
        }

        snake.push(head); // Add new head

        // Check for collisions with the body
        if (snake.slice(0, -1).some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver = true;
            clearInterval(gameInterval);
            alert(`Game Over! Your score was: ${score}`);
            showTryAgainButton(); // Show the try again button when game is over
        }

        drawSnake(); // Redraw everything
    }

    // Change direction based on key press
    function changeDirection(event) {
        const key = event.key;
        if (key === 'ArrowUp' || key === 'w') {
            if (direction !== 'DOWN') direction = 'UP';
        }
        if (key === 'ArrowDown' || key === 's') {
            if (direction !== 'UP') direction = 'DOWN';
        }
        if (key === 'ArrowLeft' || key === 'a') {
            if (direction !== 'RIGHT') direction = 'LEFT';
        }
        if (key === 'ArrowRight' || key === 'd') {
            if (direction !== 'LEFT') direction = 'RIGHT';
        }
    }

    // Control button logic
    function setupControlButtons() {
        const upButton = document.getElementById('upButton');
        const downButton = document.getElementById('downButton');
        const leftButton = document.getElementById('leftButton');
        const rightButton = document.getElementById('rightButton');

        upButton.addEventListener('click', () => {
            if (direction !== 'DOWN') direction = 'UP';
        });
        downButton.addEventListener('click', () => {
            if (direction !== 'UP') direction = 'DOWN';
        });
        leftButton.addEventListener('click', () => {
            if (direction !== 'RIGHT') direction = 'LEFT';
        });
        rightButton.addEventListener('click', () => {
            if (direction !== 'LEFT') direction = 'RIGHT';
        });
    }

    // Initialize the grid
    function initGrid() {
        drawGrid();
        setupControlButtons(); // Setup control buttons after grid is initialized
    }

    // Update the score display
    function updateScore(points) {
        document.getElementById('scoreDisplay').textContent = `Score: ${points}`;
    }

    // Event listeners
    document.addEventListener('keydown', changeDirection);
})();