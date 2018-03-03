var cw = 500;
var ch = 500;
var w = window.innerWidth;
var h = window.innerHeight;
var cx = w/2;
var cy = h/2;

var canvas  = document.getElementById('canvas');
var section = document.getElementsByClassName('btn-group-vertical')
var step    = document.getElementById('step');

step.style.position = 'absolute'
step.style.width = '100px';
step.style.left = cx-50+"px";
step.style.top = '40px';

for (var i = 0; i < section.length; i++) {
  section[i].style.width = '100px';
  section[i].style.left  = cx-cw/2-200+"px";
  section[i].style.top  = "200px";
}
canvasInit(canvas, cw, ch, cx, cy);


var ctx = canvas.getContext('2d');

var ground =  "rgb(224, 137, 24)";
var water =   "rgb(89, 230, 255)";
var red =     "rgb(255,0,0)";

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

var counterBfs = 2;																																																																																																																																																																																			;


// save data of minorRoadsGrowing
var txtFile = "text.txt";


// Print layers:
var printGraph      = false;
var printPerlin     = false;
var printWater 		= false;
var printMajorRoads = false;
var printMinorRoads = false;

function main(){	

	for(var x = 0; x <= 500; x+=10){  // 51*51 = 2601 nodes
		for(var y = 0; y <= 500; y+=10){
			z = 30*noise(x/500,y/500);
			if(z<0){
				z = 0;
			}
			//console.log(z*10);
			points.push( new CPoint(x, y, z) );
			nodes.push(new CNode(new CPoint(x, y, z)))
		}
	}
	for(var x = 0; x <= 500; x+=10){
		heighMap[x] = [];
		for(var y = 0; y <= 500; y+=10){
			heighMap[x][y]=0;
		}
	}
	var a = new CPoint(500, 240);
	var b = new CPoint(260, 500);
	var c = new CPoint(  0, 280);
	var d = new CPoint( 120,   0);
	var e = new CPoint(430,   0);
	var center = new CPoint(250, 250);

	nucleus = [nodes[getIndex(a.x/10, a.y/10)],
			   nodes[getIndex(b.x/10, b.y/10)],
			   nodes[getIndex(c.x/10, c.y/10)],
			   nodes[getIndex(d.x/10, d.y/10)],
			   nodes[getIndex(e.x/10, e.y/10)]
				];

	//nodes.push(new CNode(new CPoint(10, 10)));
	//nodes.push(new CNode(new CPoint(200, 200)));
	
	plotMap(nodes); // Nodes is edited

	g = new CGraph(nodes);
	g = initGraph(g);
	drawNucleus(nucleus);



	var p1 = [];
	var p2 = [];
	var p3 = [];
	var p4 = [];

	p1 = aStar(nodes[getIndex(a.x/10, a.y/10)],nodes[getIndex(c.x/10, c.y/10)],g);

	p2 = aStar(nodes[getIndex(d.x/10, d.y/10)],nodes[getNodeByParents(p1,nodes[getIndex(c.x/10, c.y/10)],10)],g);

	p3 = aStar(nodes[getNodeByParents(p1,nodes[getIndex(c.x/10, c.y/10)],20)],nodes[getIndex(b.x/10, b.y/10)],g);
	
	p4 = aStar(nodes[getNodeByParents(p1,nodes[getIndex(c.x/10, c.y/10)],35)],nodes[getIndex(e.x/10, e.y/10)],g);	

	console.log(getIndex(50,50));

	//dfs(nodes[getIndex(25,25)],counterBfs);

	var minorRoadsSet1 = [];
	var minorRoadsSet2 = [];
	var minorRoadsSet3 = [];

	minorRoadsSet1 =  bfs(nodes[getNodeByParents(p1,nodes[getIndex(c.x/10, c.y/10)],10)],50);
	minorRoadsSet2 =  bfs(nodes[getNodeByParents(p1,nodes[getIndex(c.x/10, c.y/10)],20)],50);
	minorRoadsSet3 =  bfs(nodes[getNodeByParents(p1,nodes[getIndex(c.x/10, c.y/10)],35)],50);


	//var g = new CGraph(nodes);
	//g.addEdge(nodes[0], nodes[1]);
	//showGraph();


	
}

//main();



/*
// Default comparison semantics
const queue = new PriorityQueue();
queue.push(10, 20, 30, 40, 50);
console.log('Top:', queue.peek()); //=> 50
console.log('Size:', queue.size()); //=> 5
console.log('Contents:');
while (!queue.isEmpty()) {
  console.log(queue.pop()); //=> 40, 30, 20, 10
}



// Pairwise comparison semantics
const pairwiseQueue = new PriorityQueue((a, b) => a[1] < b[1]);
pairwiseQueue.push(['low', 0], ['medium', 5], ['high', 10]);
console.log('\nContents:');
while (!pairwiseQueue.isEmpty()) {
  console.log(pairwiseQueue.pop()[0]); //=> 'high', 'medium', 'low'
}

*/





	


