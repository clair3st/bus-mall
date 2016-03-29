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

console.log('bag: ', bagImg);
console.log('array: ', surveyImagesArray);
