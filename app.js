//Global variable
surveyImagesArray = [];

//Object constructor
function SurveyImages(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesRendered = 0;
  this.timesClicked = 0;
  surveyImagesArray.push(this);
}

var bagImg = new SurveyImages('bag', 'img/bag.jpg');
var bananaImg = new SurveyImages('banana', 'img/banana.jpg');
var bathroomImg = new SurveyImages('bathroom', 'img/bathroom.jpg');

console.log('bag: ', bagImg);
console.log('array: ', surveyImagesArray);

function renderImages(randomObject) {
  elBody = document.getElementById('marketResearch');
  elImg = document.createElement('img');
  elImg.setAttribute('class', 'surveyDisplay');
  elImg.setAttribute('src', randomObject.filePath);
  elBody.appendChild(elImg);
  randomObject.timesRendered += 1;
}

console.log('random object ', randomImagesObject(surveyImagesArray));
renderImages(randomImagesObject(surveyImagesArray));

//function that call a random filePath from the Array
function randomImagesObject(globalArray) {
  return globalArray[randomNo(0, globalArray.length)];
}

//function to generate random number between inclusive min and exclusive max
function randomNo (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
