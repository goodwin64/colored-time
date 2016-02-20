;
/*
 * @author: Max Donchenko (https://github.com/goodwin64)
 */
function valuesToColor(r, g, b) {
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function rgbInversion(rgbString) {
  /*
  "rgb(1, 145, 255)" ---> "rgb(254, 110, 0)"
  */
  values = rgbString.match(/\d{1,3}/g);
  newValues = values.map(function(value) {
    return 255 - value;
  });
  return rgbString.replace(/\d+, \d+, \d+/g, newValues.join(", "));
}

function randomStepUp(colors, key, percents) {
  percents = percents == undefined ? 50 : percents;
  if (Math.random() * 100 <= percents) {
    colors[key]++;
  } else {
    colors[key]--;
  }
}

function changeValues(colors) {

  var activeName = ["red", "green", "blue"][randomInteger(0, 2)],
  activeValue = colors[activeName];
  
  if (activeValue == colors[activeName + "Max"])
    colors[activeName]--;
  else if (activeValue == colors[activeName + "Min"])
    colors[activeName]++;
  else {
    var chanceToIncrement = document.querySelector("#" + activeName + " > input").value;
    randomStepUp(colors, activeName, chanceToIncrement * 10);
  }

  //return colors;
}

function displayTime() {
  
  var d, h, m, s;
  d = new Date(); //new data object
  h = d.getHours();
  m = d.getMinutes();
  s = d.getSeconds();

  if (h <= 9) h = "0" + h;
  if (m <= 9) m = "0" + m;
  if (s <= 9) s = "0" + s;

  // TODO: bind buttons to variables and processing them

  changeValues(colors);

  var bg = valuesToColor(colors["red"], colors["green"], colors["blue"]);
  document.body.style.background = bg;

  document.getElementById("time").style.color = rgbInversion(bg);
  document.getElementById("time").innerHTML = h + ":" + m + ":" + s;

  setTimeout(displayTime, 200);
}

var colors = {
    "red"       : 40,
    "redMax"    : 80,
    "redMin"    : 0,

    "green"     : 40,
    "greenMax"  : 80,
    "greenMin"  : 0,

    "blue"      : 40,
    "blueMax"   : 80,
    "blueMin"   : 0,
  }

displayTime();
