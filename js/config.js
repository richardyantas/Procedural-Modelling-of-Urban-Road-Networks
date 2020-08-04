// Global Variables

var CANVASWIDTH = 500;																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																										
var CANVASHEIGHT = 500;																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																								
var CANVASSTEPNODE = 10;
var NUMDIV = CANVASWIDTH/CANVASSTEPNODE;
var w = window.innerWidth;
var h = window.innerHeight;
var cx = w/2;
var cy = h/2;

// COLORMAJORROADS
var COLORBACKGROUND =  "rgb(249, 215, 139)";//"rgb(255, 80, 0)";
var COLORWATER      =  "rgba(11, 126, 188, 1)";														
var COLORMINORROADS =  "black";																																																																																																																																																																						 
var COLORMAJORROADS =  "black";																																																																																																																																																																							

// tmp;										
var tp = 0;

var canvas  = document.getElementById('canvas');
var section = document.getElementsByClassName('btn-group-vertical')
var step    = document.getElementById('step');

step.style.position = 'absolute';
step.style.width    = '100px';
step.style.left     = cx-50+"px";
step.style.top      = '40px';


for (var i = 0; i < section.length; i++) {
  section[i].style.width = '100px';
  section[i].style.left  = cx-CANVASWIDTH/2-200+"px";
  section[i].style.top   = '200px';
}

canvasInit(canvas, cx, cy);

var ctx = canvas.getContext('2d');

var flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var v = 2;
var points = [];
var nodes = [];
var nucleus = [];
var heighMap = []; // Save two kinds of Points
var g;

var counterBfs = 2;		


var city_a;
var city_b;
var city_c;
var city_d;
var city_e;																																																																																																																																																																																	

// save data of minorRoadsGrowing
// var txtFile = "text.txt";


// Print layers:
var printGraph      = false;
var printPerlin     = false;
var printWater 		= false;
var printMajorRoads = false;
var printMinorRoads = false;

// Minor roads stored in vector
var minorRoadsSet1 = [];
var minorRoadsSet2 = [];
var minorRoadsSet3 = [];

// for a while

var stages = new Queue();


// Major roads

var p1 = [];
var p2 = [];
var p3 = [];
var p4 = [];

// traffic level

var trafficLevel = 0;

var parents2;
var mxn2;


