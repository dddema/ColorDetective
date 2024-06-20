let gameLevel = 0;
let gameScore = 0;

let circleSize = 10;
let circleNumberSide = 2;

let currentColor;


initGame();
function initGame(){
  updateScore(); 
  currentColor = getRandomColor();
  createCircles(Math.pow((circleNumberSide), 2));
  // initStrings(); 
}

function nextLevel(){
  // change the color of all the circles to a new random generated color
  currentColor = getRandomColor();

  // remove all the circles
  document.getElementById('grid').innerHTML = '';

  if(gameLevel%3===0)
    circleNumberSide = circleNumberSide+1;
  createCircles(Math.pow((circleNumberSide), 2));

  // Modify CSS variables from JavaScript
  const root = document.documentElement;
  root.style.setProperty('--grid-row', circleNumberSide);
  root.style.setProperty('--grid-size', 15-(1/2)*gameLevel+"vh");
  // root.style.setProperty('--circle-size', 10-gameLevel+"vw");
  // 50vh = circleSize*circleNumberSide + gapSize*gapNumber
  // CircleSize = (gapSize*gapNumber - 50vh)/circleNumberSide
  // gapNumber = circleNumberSide - 1
  root.style.setProperty('--circle-size', (40-(circleNumberSide-1))/circleNumberSide+"vw");
}

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360); // Random hue value between 0 and 360
  const saturation = Math.floor(Math.random() * 41) + 60; // Saturation between 60% and 100%
  const lightness = Math.floor(Math.random() * 41) + 40; // Lightness between 40% and 80%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function adjustHue(hsl, degree) {
  // Parse the HSL color
  let [h, s, l] = hsl.match(/\d+/g).map(Number);

  // Adjust the hue by the specified degree
  h = Math.random() > 0.5 ? (h + degree) % 360 : (h - degree) % 360;

  return `hsl(${h}, ${s}%, ${l}%)`;
}

function updateScore(){
  gameScore = gameScore + gameLevel;
  document.getElementById('score-text').textContent = "Score: " + gameScore;
  document.getElementById('level-text').textContent = "Level: " + gameLevel;
}

function oddCirckeClick(){
  gameLevel++;
  updateScore();
  nextLevel();
}

function circleClick() {
  gameEnded();
}

function createCircles(numberOfCells){
  theOddOneOut = Math.floor(Math.random() * (numberOfCells));
  for (let i = 0; i < numberOfCells; i++) {      
      const cell = document.createElement('div');
      cell.classList.add('circle');
      if(i === theOddOneOut){
        cell.style.backgroundColor = adjustHue(currentColor, 10*circleNumberSide-gameLevel*gameScore);
        cell.addEventListener('click', oddCirckeClick);
      }else{
        cell.style.backgroundColor = currentColor;
        cell.addEventListener('click', circleClick);
      }

      document.getElementById('grid').appendChild(cell);
  }
}
