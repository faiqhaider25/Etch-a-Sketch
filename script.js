const message = `Default Mode: Colour Mode.
Click anywhere on the grid to make it active and enjoy sketching.`;
alert(message);
const inputColor = document.querySelector('#inputColor');
const gridSizeParagraph = document.querySelector('#gridSize');
const gridStatus = document.querySelector('#gridStatus');
const gridSizeSelector = document.querySelector('#grid-Size-Selector'); //main size selector
const gridElement = document.querySelector('.grid');
const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8F00FF'];
let DRAWING_COLOR = inputColor.value;
let control = 0; //default color mode
// 0 - color - mode, 1 - rainbow - mode, 2 - eraser

let active = 0; //parody of a boolean number
document.querySelector('.grid').addEventListener('click', () => {
    gridStatus.textContent = active === 1 ? 'Inactive' : 'Active'
    active = active === 0 ? 1 : 0;
});


// Update DRAWING_COLOR on input change
inputColor.addEventListener('input', () => {
    DRAWING_COLOR = inputColor.value;
});

// Function to draw the grid and set up event listeners
function drawGrid(number) {
    if (isNaN(number) || number <= 0 || number > 64) {
        alert('Please enter a valid positive number. (1-64)');
        return;
    }
    if (!gridElement) {
        alert('No element with class "grid" found.');
        return;
    }

    // Clear any existing grid elements
    gridElement.innerHTML = '';
    // Calculate box size
    const boxSize = 600 / number;

    for (let i = 0; i < (number * number); i++) {
        const box = document.createElement('div');
        box.className = 'boxes';
        box.style.width = `${boxSize}px`;
        box.style.height = `${boxSize}px`;
        box.style.border = '1px solid rgb(221, 218, 218)';
        gridElement.appendChild(box);
    }
    attachBoxListeners();
}

// Function to attach mouseover event listeners to boxes
function attachBoxListeners() {
    document.querySelectorAll('.boxes').forEach(box => {
        box.addEventListener('mouseover', () => {
            if (control === 0 && active)
                box.style.backgroundColor = DRAWING_COLOR;
            else if (control === 1 && active) {
                const randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
                box.style.backgroundColor = randomColor;
            }
            else if (control === 2 && active) {
                box.style.backgroundColor = 'white';
            }
        });
    });
}

// Function to update grid size
function updateGridSize() {
    const value = gridSizeSelector.value;
    gridSizeParagraph.textContent = `${value}x${value}`;
    drawGrid(value);
}

// Initial setup
updateGridSize();
gridSizeSelector.addEventListener('input', updateGridSize);

// Button functionality
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.button').forEach(btn => btn.classList.remove('active'));
        if (button.textContent.trim() !== 'Toggle Grid' && button.textContent.trim() !== 'Reset') {
            button.classList.add('active');
        }
        if (button.textContent.trim() === 'Color Mode')
            control = 0;
        else if (button.textContent.trim() === 'Rainbow Mode')
            control = 1;
        else if (button.textContent.trim() === 'Eraser')
            control = 2;
        else if (button.textContent.trim() === 'Toggle Grid') {
            document.querySelectorAll('.boxes').forEach((box) => {
                box.style.border = (box.style.border === 'none') ? '1px solid rgb(221, 218, 218)' : 'none';
            });
        }
        else if (button.textContent.trim() === 'Reset') {
            drawGrid(gridSizeSelector.value);
        }
    });
});