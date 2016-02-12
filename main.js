//lets display the current time

function arrToColor(arr){
  var arr2 = arr.map(function(elem){
    return elem[0];
  });
  return "rgb(" + arr2.join(", ") + ")";
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

function randomBool() {
    return Math.random() >= 0.5;
  }

function rgbInversion(rgbString){
  /*
  "rgb(1, 145, 255)" ---> "rgb(254, 110, 0)"
  */
  values = rgbString.match(/\d{1,3}/g);
  newValues = values.map(function(value){
    return 255 - value;
  }); 
  return rgbString.replace(/\d+, \d+, \d+/g, newValues.join(", "));
}

function to6d(str){
  return "0".repeat(6 - str.length) + str;
}

function intToRgbString(num){
  numHex = to6d(num.toString(16));
  arr = [numHex.slice(0,2), numHex.slice(2,4), numHex.slice(4,6)];
  var i = 0;
  return "rgb(0, 0, 0)".replace(/\d{1,3}/g, function(){
    return parseInt(arr[i++], 16);
  });
}

function getSecondsToday() {
  var d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

function inc(colors, index){
  if (colors[index][0] >= 0 && colors[index][0] < 255) {
    colors[index][0]++;
  }
}

function dec(colors, index){
  if (colors[index][0] > 0 && colors[index][0] <= 255) {
    colors[index][0]--;
  }
}

function step(arr){
  if (arr[1]) {
    arr[0]++;
  } else {
    arr[0]--;
  }
}

function changeValues(colors){
  var maxColor = 80,
      minColor = 0,
      rTact = 0,
      gTact = 0,
      bTact = 0;
  
  var active = randomInteger(0,2);
  step(colors[active]); 
  
  if (colors[active][0] === maxColor){
    colors[active][1] = false;
  } else if (colors[active][0] === minColor) {
    colors[active][1] = true;
  } else {
    colors[active][1] = randomBool();
  }
  
  minColor = Math.min(rTact, gTact, bTact);
  
  /*if (colors[0][0] == maxColor) {
    colors = [
      [randomInteger(1, 64), true], 
      [randomInteger(1, 64), true], 
      [randomInteger(1, 64), true]
    ];
  }
  */
  
  //return colors;
}

function displayTime() {
  var d, h, m, s;
	d = new Date(); //new data object
	h = d.getHours();
	m = d.getMinutes();
	s = d.getSeconds();
  
  if (h<=9) h = "0"+h;
  if (m<=9) m = "0"+m;
  if (s<=9) s = "0"+s;
	
	
  changeValues(colors);
  console.log(colors);
  
	//set background color
  var bg = arrToColor(colors);
	document.body.style.background = bg;
  //console.log(bg);
  
  //set text color
	document.getElementById("time").style.color = rgbInversion(bg);
  document.getElementById("time").innerHTML = h+":"+m+":"+s;
	//document.getElementById("time").innerHTML = bg;
	//retrigger the function every second
	setTimeout(displayTime, 200);
}

//call the function
/*var colors = [
  [randomInteger(0, 64), true], 
  [randomInteger(0, 64), true], 
  [randomInteger(0, 64), true]
];
*/

var colors = [
  [40, true], 
  [40, true], 
  [40, true]
];

displayTime();
