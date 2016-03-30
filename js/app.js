//Global variable
var surveyImagesArray = [];
var totalClicks = 0;

//Object constructor
function SurveyImages(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.timesRendered = 0;
  this.timesClicked = 0;
  surveyImagesArray.push(this);
}

// SurveyImages.prototype.percentClicked = function(){
//   this.percentClicked = this.timesRendered / this.allPieData;
// };

//function generates an array of random numbers within min and max values
function randomNoArray (min, max) {
  var getThreeIndex = [];
  for (var i = 0; i < 3; i++) {
    getThreeIndex.push(Math.floor(Math.random() * (max - min)) + min);
  }
  while (getThreeIndex[0] === getThreeIndex[1] || getThreeIndex[1] === getThreeIndex[2] || getThreeIndex[0] === getThreeIndex[2]) {
    getThreeIndex.splice(1, 2);
    getThreeIndex.push(Math.floor(Math.random() * (max - min)) + min);
    getThreeIndex.push(Math.floor(Math.random() * (max - min)) + min);
  }
  return getThreeIndex;
}

//function to clear elements from page
function clearBox(elementID) {
  document.getElementById(elementID).innerHTML = '';
}

//function to count number of clicks
function addClicks(id) {
  for (var i = 0; i < surveyImagesArray.length; i++) {
    if (surveyImagesArray[i].name == id) {
      surveyImagesArray[i].timesClicked ++;
      totalClicks ++;
      console.log('total clicks: ' + totalClicks);
      break;
    }
  }
}

//function to render three different random images to a page
function renderImages() {
  var getThreeIndex = randomNoArray(0, surveyImagesArray.length);
  var randomObject, elBody, elImg;
  elBody = document.getElementById('marketResearch');
  for (var i = 0; i < 3; i++) {
    randomObject = surveyImagesArray[getThreeIndex[i]];
    elImg = document.createElement('img');
    elImg.setAttribute('class', 'survey-display');
    elImg.setAttribute('src', randomObject.filePath);
    elImg.setAttribute('id', randomObject.name);
    elBody.appendChild(elImg);
    randomObject.timesRendered ++;
  }
  eventListenerClickImage();
}

//create an instance of Survey Images for each product
var bagImg = new SurveyImages('bag', 'img/bag.jpg');
var bananaImg = new SurveyImages('banana', 'img/banana.jpg');
var bathroomImg = new SurveyImages('bathroom', 'img/bathroom.jpg');
var bootsImg = new SurveyImages('boots', 'img/boots.jpg');
var breakfastImg = new SurveyImages('breakfast', 'img/breakfast.jpg');
var bubblegumImg = new SurveyImages('bubblegum', 'img/bubblegum.jpg');
var chairImg = new SurveyImages('chair', 'img/chair.jpg');
var cthulhuImg = new SurveyImages('cthulhu', 'img/cthulhu.jpg');
var dogduckImg = new SurveyImages('dog-duck', 'img/dog-duck.jpg');
var dragonImg = new SurveyImages('dragon', 'img/dragon.jpg');
var penImg = new SurveyImages('pen', 'img/pen.jpg');
var petsweepImg = new SurveyImages('pet-sweep', 'img/pet-sweep.jpg');
var scissorsImg = new SurveyImages('scissors', 'img/scissors.jpg');
var sharkImg = new SurveyImages('shark', 'img/shark.jpg');
var sweepImg = new SurveyImages('sweep', 'img/sweep.png');
var tauntaunImg = new SurveyImages('tauntaun', 'img/tauntaun.jpg');
var unicornImg = new SurveyImages('unicorn', 'img/unicorn.jpg');
var usbImg = new SurveyImages('usb', 'img/usb.gif');
var watercanImg = new SurveyImages('water-can', 'img/water-can.jpg');
var wineglassImg = new SurveyImages('wine-glass', 'img/wine-glass.jpg');

//event Handler for clicking an image
function handleImageClick(event) {
  var imgEl = event.target;
  var idEl = imgEl.id;
  addClicks(idEl);
  clearBox('marketResearch');
  if (totalClicks < 25) {
    renderImages();
  } else {
    createButton('results', 'Click for results!');
    eventListenerResultsButton();
    createButton('more-tries', '10 more');
    eventListenerButtonTenMore();
  }
}

function eventListenerClickImage() {
  var surveyDisplay = document.getElementsByClassName('survey-display');
  for (var i = 0; i < surveyDisplay.length; i++){
    surveyDisplay[i].addEventListener('click', handleImageClick);
  }
}

function eventListenerResultsButton() {
  var button = document.getElementById('results');
  button.addEventListener('click', generateGraphOfData);
}

function eventListenerButtonTenMore() {
  var button = document.getElementById('more-tries');
  button.addEventListener('click', addTenMoreClicks);
}

function addTenMoreClicks() {
  totalClicks = 15;
  clearBox('marketResearch');
  renderImages();
}

function BarChartData () {
  this.labels = [];
  this.datasets = [];
}

function BarDataSet(labelName, color) {
  this.label = labelName;
  this.fillColor = color;
  this.strokeColor = color;
  this.highlightFill = color;
  this.highlightStroke = color;
  this.data = [];
}

BarDataSet.prototype.setFields = function (inputArray, field) {
  for (var i = 0; i < inputArray.length ; i++) {
    this.data.push(inputArray[i][field]);
  }
};

BarDataSet.prototype.setPercentClicked = function (inputArray, field1, field2) {
  var percentClicked;
  for (var i = 0; i < inputArray.length ; i++) {
    percentClicked = parseInt(inputArray[i][field1]) / parseInt(inputArray[i][field2]);
    if (isNaN(percentClicked)) {
      this.data.push(0);
    } else {
      this.data.push(percentClicked);
    }
  }
};

BarChartData.prototype.setLabels = function (inputArray, field) {
  for (var i = 0; i < inputArray.length ; i++) {
    this.labels.push(inputArray[i][field]);
  }
};

BarChartData.prototype.pushData = function(chartData) {
  this.datasets.push(chartData);
};

function generateGraphOfData(){
  clearBox('marketResearch');
  clearBox('chartArea');
  var elChartArea = document.getElementById('chartArea');
  var elCanvas = document.createElement('canvas');
  elCanvas.setAttribute('height', '500');
  elCanvas.setAttribute('width', '700');
  elCanvas.setAttribute('id', 'myChart');
  elChartArea.appendChild(elCanvas);

  var clicksforgraph = new BarDataSet('clicks', 'rgba(220,220,220,1)');
  clicksforgraph.setFields(surveyImagesArray, 'timesClicked');
  console.log('clicksforgraph: ', clicksforgraph);

  var renderedforgraph = new BarDataSet('rendered', 'rgba(151,187,205,1)');
  renderedforgraph.setFields(surveyImagesArray, 'timesRendered');
  console.log('renederedforgraph: ', renderedforgraph);

  var percentClicks = new BarDataSet('percent clicked', 'rgb(0,0,0)');
  percentClicks.setPercentClicked(surveyImagesArray, 'timesClicked', 'timesRendered');
  console.log('percentClicks: ', percentClicks);

  var setUpBarChart = new BarChartData();
  setUpBarChart.pushData(clicksforgraph);
  setUpBarChart.pushData(renderedforgraph);
  setUpBarChart.pushData(percentClicks);
  setUpBarChart.setLabels(surveyImagesArray, 'name');
  console.log('setUpBarChart, ', setUpBarChart);
  var ctx = document.getElementById('myChart').getContext('2d');
  var myNewChart = new Chart(ctx).Bar(setUpBarChart);
}

function createButton (idName, buttonScript) {
  var button = document.createElement('button');
  button.setAttribute('id', idName);
  button.innerHTML = buttonScript;
  document.getElementById('marketResearch').appendChild(button);
}

// function createButtonMoreClicks

//call render Images function
renderImages();

//call event listner
