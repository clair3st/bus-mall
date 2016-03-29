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

var bag = new SurveyImages('bag', 'img/bag.jpg');
var banana = new SurveyImages('banana', 'img/banana.jpg');
var bathroom = new SurveyImages('bathroom', 'img/bathroom.jpg');
var boots = new SurveyImages('boots', 'img/bathroom.jpg');
var breakfast = new SurveyImages('breakfast', 'img/breakfast.jpg');
var bubblegum = new SurveyImages('bubblegum', 'img/bubblegum.jpg');

console.log('bag: ', bag);
console.log('array: ', surveyImagesArray);

function renderImages(surveyImagesArray) {
  for (var i = 0; i < 3; i++) {
    randomObject = randomImageObject(surveyImagesArray);
    elBody = document.getElementById('marketResearch');
    elImg = document.createElement('img');
    elImg.setAttribute('class', 'survey-display');
    elImg.setAttribute('src', randomObject.filePath);
    elImg.setAttribute('id', randomObject.name);
    elBody.appendChild(elImg);
    randomObject.timesRendered += 1;
  }
}

//function that call a random filePath from the Array
function randomImageObject(globalArray) {
  return globalArray[randomNo(0, globalArray.length)];
}

//function to generate random number between inclusive min and exclusive max
function randomNo (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//function to clear elements from page
function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = '';
}

//function to add to clicks
function addClicks(id) {
  for (var i = 0; i < surveyImagesArray.length; i++) {
    if (surveyImagesArray[i].name == id) {
      surveyImagesArray[i].timesClicked += 1;
    }
  }
}

//call render Images function
renderImages(surveyImagesArray);

function handleImageClick(event) {
  imgEl = event.target;
  idEl = imgEl.id;

  console.log('id ', idEl);
  addClicks(idEl);
  clearBox('marketResearch');
  renderImages(surveyImagesArray);
  eventListener();
}

function eventListener() {
  var surveyDisplay = document.getElementsByClassName('survey-display');
  for (var i = 0; i < surveyDisplay.length; i++){
    surveyDisplay[i].addEventListener('click', handleImageClick);
  }
}

eventListener();
