// startRestart.js
const startButton = document.getElementById("startButton");
const tryAgainButton = document.getElementById("tryAgainButton");

// Show the start button on page load
window.onload = () => {
    startButton.style.display = 'block'; // Show the start button
    tryAgainButton.style.display = 'none'; // Ensure try again button is hidden initially
};

// Start button functionality
startButton.addEventListener('click', () => {
    initGame(); // Start the game
    startButton.style.display = 'none'; // Hide the start button
});

// Try Again button functionality
tryAgainButton.addEventListener('click', () => {
    initGame(); // Restart the game
    tryAgainButton.style.display = 'none'; // Hide the try again button
});

// Function to show the Try Again button when the game is over
function showTryAgainButton() {
    tryAgainButton.style.display = 'block'; // Show the try again button
}