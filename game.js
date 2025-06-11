// Lấy các phần tử DOM
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const scoreElement = document.getElementById('score');

// Kích thước ô
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Khởi tạo rắn
let snake = [
    { x: 10, y: 10 }
];
let snakeLength = 1;

// Khởi tạo mồi
let food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
};

// Tốc độ và hướng di chuyển
let xVelocity = 0;
let yVelocity = 0;
let speed = 7;

// Biến trạng thái trò chơi
let gameStarted = false;
let gameOver = false;
let score = 0;
let gameLoop;

// Xử lý sự kiện phím
document.addEventListener('keydown', function(event) {
    // Chỉ xử lý khi trò chơi đã bắt đầu
    if (!gameStarted) return;
    
    // Phím mũi tên trái
    if (event.key === 'ArrowLeft' && xVelocity !== 1) {
        xVelocity = -1;
        yVelocity = 0;
    }
    // Phím mũi tên phải
    else if (event.key === 'ArrowRight' && xVelocity !== -1) {
        xVelocity = 1;
        yVelocity = 0;
    }
    // Phím mũi tên lên
    else if (event.key === 'ArrowUp' && yVelocity !== 1) {
        xVelocity = 0;
        yVelocity = -1;
    }
    // Phím mũi tên xuống
    else if (event.key === 'ArrowDown' && yVelocity !== -1) {
        xVelocity = 0;
        yVelocity = 1;
    }
});

// Bắt đầu trò chơi
startButton.addEventListener('click', function() {
    if (!gameStarted && !gameOver) {
        gameStarted = true;
        gameLoop = setInterval(gameEngine, 1000 / speed);
    }
});

// Chơi lại
resetButton.addEventListener('click', function() {
    resetGame();
});

// Hàm vẽ rắn
function drawSnake() {
    ctx.fillStyle = '#4CAF50';
    
    // Vẽ từng phần của rắn
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
        
        // Vẽ mắt cho đầu rắn
        if (i === 0) {
            ctx.fillStyle = '#000';
            // Vẽ mắt dựa vào hướng di chuyển
            if (xVelocity === 1) { // Đang di chuyển sang phải
                ctx.fillRect(snake[i].x * gridSize + gridSize - 6, snake[i].y * gridSize + 4, 3, 3);
                ctx.fillRect(snake[i].x * gridSize + gridSize - 6, snake[i].y * gridSize + gridSize - 7, 3, 3);
            } else if (xVelocity === -1) { // Đang di chuyển sang trái
                ctx.fillRect(snake[i].x * gridSize + 3, snake[i].y * gridSize + 4, 3, 3);
                ctx.fillRect(snake[i].x * gridSize + 3, snake[i].y * gridSize + gridSize - 7, 3, 3);
            } else if (yVelocity === -1) { // Đang di chuyển lên
                ctx.fillRect(snake[i].x * gridSize + 4, snake[i].y * gridSize + 3, 3, 3);
                ctx.fillRect(snake[i].x * gridSize + gridSize - 7, snake[i].y * gridSize + 3, 3, 3);
            } else if (yVelocity === 1) { // Đang di chuyển xuống
                ctx.fillRect(snake[i].x * gridSize + 4, snake[i].y * gridSize + gridSize - 6, 3, 3);
                ctx.fillRect(snake[i].x * gridSize + gridSize - 7, snake[i].y * gridSize + gridSize - 6, 3, 3);
            } else { // Trạng thái ban đầu
                ctx.fillRect(snake[i].x * gridSize + gridSize - 6, snake[i].y * gridSize + 4, 3, 3);
                ctx.fillRect(snake[i].x * gridSize + gridSize - 6, snake[i].y * gridSize + gridSize - 7, 3, 3);
            }
            ctx.fillStyle = '#4CAF50';
        }
    }
}

// Hàm vẽ mồi
function drawFood() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

// Hàm kiểm tra va chạm
function checkCollision() {
    // Kiểm tra va chạm với tường
    if (snake[0].x < 0 || snake[0].x >= tileCount || snake[0].y < 0 || snake[0].y >= tileCount) {
        return true;
    }
    
    // Kiểm tra va chạm với thân rắn
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

// Hàm di chuyển rắn
function moveSnake() {
    // Tạo phần đầu mới dựa trên hướng di chuyển
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };
    
    // Thêm đầu mới vào đầu mảng
    snake.unshift(head);
    
    // Kiểm tra nếu rắn ăn mồi
    if (head.x === food.x && head.y === food.y) {
        // Tăng điểm
        score++;
        scoreElement.textContent = score;
        
        // Tạo mồi mới
        generateFood();
    } else {
        // Nếu không ăn mồi, xóa phần đuôi
        snake.pop();
    }
}

// Hàm tạo mồi mới
function generateFood() {
    // Tạo vị trí ngẫu nhiên cho mồi
    let newFood;
    let foodOnSnake;
    
    do {
        foodOnSnake = false;
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        // Kiểm tra xem mồi có nằm trên thân rắn không
        for (let i = 0; i < snake.length; i++) {
            if (newFood.x === snake[i].x && newFood.y === snake[i].y) {
                foodOnSnake = true;
                break;
            }
        }
    } while (foodOnSnake);
    
    food = newFood;
}

// Hàm hiển thị màn hình kết thúc
function showGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 15);
    
    ctx.font = '20px Arial';
    ctx.fillText(`Điểm: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
}

// Hàm reset trò chơi
function resetGame() {
    clearInterval(gameLoop);
    
    // Reset các biến trạng thái
    snake = [{ x: 10, y: 10 }];
    xVelocity = 0;
    yVelocity = 0;
    score = 0;
    scoreElement.textContent = score;
    gameStarted = false;
    gameOver = false;
    
    // Tạo mồi mới
    generateFood();
    
    // Xóa màn hình
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Vẽ lại trạng thái ban đầu
    drawSnake();
    drawFood();
}

// Hàm chính của trò chơi
function gameEngine() {
    // Di chuyển rắn
    moveSnake();
    
    // Kiểm tra va chạm
    if (checkCollision()) {
        clearInterval(gameLoop);
        gameOver = true;
        showGameOver();
        return;
    }
    
    // Xóa màn hình
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Vẽ rắn và mồi
    drawSnake();
    drawFood();
}

// Khởi tạo trò chơi
function initGame() {
    drawSnake();
    drawFood();
}

// Khởi chạy trò chơi
window.onload = initGame;
