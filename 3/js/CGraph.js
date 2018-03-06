// Variables
var id = 0;
var points = [];

function CGraph(nodes){
	this.vertices = nodes.length;
	this.edges = 0;
	this.adj = [];
	this.visit = [];
	this.visitNode = [];
	this.majorRoads = [];
	for(var i=0;i<this.vertices;i++){
		this.majorRoads[i] = false;
	}	
	for(var i=0;i<this.vertices;i++){
		this.visitNode[i] = false;
	}
	for(var n=0; n<this.vertices;n++){
		this.adj[ nodes[n].id ] = [];
	}
	for(var i=0; i<this.vertices;i++){
		this.visit[i] = [];
		for(var j=0; j<this.vertices;j++){
			this.visit[i][j] = false;
		}
	}
	this.addEdge = addEdge;
}

function addEdge(a,b,weight){
	this.adj[a.id].push({n:b,w:weight});
	this.adj[b.id].push({n:a,w:weight});	
	this.edges++;
}

function CNode(p){
	this.id   = id++;
	this.x    = p.x;
	this.y    = p.y;	
	this.z    = p.z;
	this.road = 1;

}

function expansion(g,a,b){ // mandamos solo indices, a and b are index		
	if(b!=-10){		
		if(g.visit[a][b] == false){		
			//console.log(a+" "+b); 			
			if( printGraph ){
				drawLine(new CPoint(nodes[a].x, nodes[a].y),new CPoint(nodes[b].x, nodes[b].y,1));
			}
			g.addEdge(nodes[a],nodes[b],distance(nodes[a],nodes[b]));	
			g.visit[a][b] = true;
			g.visit[b][a] = true;
		}		
	}
}

function getIndex(i,j){	
	if( (0<=i && i<=NUMDIV) && (0<=j && j<=NUMDIV) )
		return (NUMDIV+1)*i+j;
	else
		return -10;
}

function getPoint(id){
	var x = Math.floor(id/(NUMDIV+1));
	var y = id%(NUMDIV+1);
	return new CPoint(x, y, 0);
}

function initGraph(g){	
	var c;
	for(var i = 0; i <= NUMDIV; i++){  // 51*51 = 2601 nodes
		for(var j = 0; j <= NUMDIV; j++){
			c = getIndex(i, j);
			expansion(g,c,getIndex(i-1, j-1));
			expansion(g,c,getIndex(i-1, j  ));
			expansion(g,c,getIndex(i-1, j+1));
			expansion(g,c,getIndex(i,   j+1));
			expansion(g,c,getIndex(i+1, j+1));
			expansion(g,c,getIndex(i+1, j  ));
			expansion(g,c,getIndex(i+1, j-1));
			expansion(g,c,getIndex(i  , j-1));
		}
	}

	for(var i=0; i<g.vertices;i++){
		for(var j=0; j<g.vertices;j++)
			g.visit[i][j] = false;
	}
	/*
	for(var y=0;y<501;y++){
		g.majorRoads[getIndex(100, y)] = true;
	}*/
	return g;
}

function drawNucleus(nucleus){	
	for(var i=0;i<nucleus.length;i++)
		drawFillCircle(nucleus[i].x, nucleus[i].y, "red",4);		
	drawFillCircle(CANVASWIDTH/2, CANVASHEIGHT/2, "red",4); // Center
}



var keyName;
var pdown = false;
document.addEventListener('keydown', (event) => {
  //keyName = event.key;
  //alert('keydown event\n\n' + 'key: ' + keyName);
  pdown = true;
});

document.addEventListener('keyup', (event) => {
  pdown = false;
});

/*
// Pairwise comparison semantics
const pairwiseQueue = new PriorityQueue((a, b) => a[1] < b[1]);
pairwiseQueue.push(['low', 0], ['medium', 5], ['high', 10]);
console.log('\nContents:');
while (!pairwiseQueue.isEmpty()) {
  console.log(pairwiseQueue.pop()[0]); //=> 'high', 'medium', 'low'
}
*/



function dfs(source,c){	
	if(g.majorRoads[source.id])return;	
	if(c <= 0)return;
	//drawCircle(source.x, source.y, "yellow",1);
	//console.log(source.id);
	g.visitNode[source.id] = true;	
	for( var i=0;i<4;i++){// var i=0;i<g.adj[source.id].length;i++		
		var n = g.adj[source.id].length;
		var v = Math.floor((Math.random() * (n-1) ) + 0)
		var ne = g.adj[source.id][v].n;
		if( !g.visitNode[ne.id] ){		
			c--;
			drawLine(source, ne, "black");	
			dfs(ne,c);							
		}	
	}	
}

function bfs(source,c,treeBfs){
	
	//var minorRoad = [];
	var dist = [];
	dist[source.id] = 0;
	var q = new Queue();
	var ini = 0;
	var nodesvisit = [];
	var parents = [];

	//minorRoad.push(source.id);
	q.enqueue(source);

	while(ini<c){
		ini++;
		var no = q.dequeue();	
		//console.log(no.id);		

		for(var i=0;i<5;i++){
			var t  = g.adj[no.id].length;
			var v  = Math.floor((Math.random() * (t-1) ) + 0);
			var ne = g.adj[no.id][v].n;
			if( !g.visitNode[ne.id] && ne.road != 2 ){
				treeBfs[no.id].push(ne.id);
				dist[ne.id] = dist[no.id]+1;
				g.visitNode[ne.id] = true;								
				//minorRoad.push(ne.id);
				nodesvisit.push(ne.id);
				q.enqueue(ne);
				parents[ne.id] = no.id;
				if( printMinorRoads )			
					drawLine(no, ne, COLORMINORROADS,1);	
			}
		}
	}

	var miny = 10000;
	var mnode = 50;
	for(var i=0;i<nodesvisit.length;i++){

		if(nodes[nodesvisit[i]].y<miny){
			//console.log("richjard");
			miny = nodes[nodesvisit[i]].y
			mnode = nodesvisit[i];
			
		}
	}
	
	return {road:treeBfs,mnode:mnode,parents:parents};
}

function aStar(source,destiny,g){
	const pq = new PriorityQueue((a, b) => a.d < b.d);	
	var xd = destiny.x;
	var yd = destiny.y;
	var xs = source.x;
	var ys = source.y;

	var distH     = [];
	var distW     = [];
	var visitNode = [];
	var parents   = [];

	for(var i=0;i<g.vertices;i++){
		parents[i]   = i;
		distH[i]     = -1;
		distW[i]     = 10000;		
		visitNode[i] = false; 
	}

	distW[source.id] = 0;
	distH[source.id] = Math.sqrt(Math.pow(xd-xs,2)+Math.pow(yd-ys,2));
	var d= distW[source.id]+distH[source.id];
	pq.push({n:source,d:4});

	var flag = true;

	while( flag ){ // !pq.isEmpty()
		var o = pq.peek();
		pq.pop();
		visitNode[o.n.id] = true;		
		//console.log(o);
		for(var i=0;i<g.adj[o.n.id].length;i++){
			var oo = g.adj[o.n.id][i] // Object Neighbour Node
			if(!visitNode[oo.n.id]){
				var x = oo.n.x;
				var y =	oo.n.y;
				if(distH[oo.n.id] == -1){
					distH[oo.n.id] = Math.sqrt( Math.pow(x-xd,2) + Math.pow(y-yd,2)  );
				}
				if(distW[oo.n.id]>distW[o.n.id]+oo.w){
					distW[oo.n.id]=distW[o.n.id]+oo.w;
					var _d = distW[oo.n.id] + distH[oo.n.id];
					pq.push({n:oo.n,d:_d});
					parents[oo.n.id] = o.n.id;
				}
				if(oo.n.id == destiny.id){
					flag = false;
				}
			}
		}			
	}	
		//reset visited if it would be used after.

	var k = destiny.id;
	for(var i=0;i<parents.length;i++){
		nodes[k].road = 2;  // Convert to major roads type 2
		if( printMajorRoads )
			drawLine(nodes[k], nodes[parents[k]], COLORMAJORROADS ,2);
		k = parents[k];
	}

	return parents;
}

