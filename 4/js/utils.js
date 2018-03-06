function canvasInit(canvas,cx,cy){
	cx = cx - CANVASWIDTH/2;
	cy = cy - CANVASHEIGHT/2;
	canvas.width  = CANVASWIDTH;
	canvas.height = CANVASHEIGHT;
	canvas.style.position = 'absolute';
	canvas.style.left = cx+"px";
	canvas.style.top  = cy+"px";
	canvas.style.background = COLORBACKGROUND;
}


function nodesInit(){
	for(var x = 0; x <= CANVASWIDTH; x+=CANVASSTEPNODE){  // 51*51 = 2601 nodes
		for(var y = 0; y <= CANVASHEIGHT; y+=CANVASSTEPNODE){
			z = 30*noise(x/CANVASWIDTH,y/CANVASHEIGHT);
			if(z<0){
				z = 0;
			}
			points.push( new CPoint(x, y, z) );
			nodes.push(new CNode(new CPoint(x, y, z)))
		}
	}
}

function nucleusInit(){
	city_a = new CPoint(500, 240);
	city_b = new CPoint(260, 500);
	city_c = new CPoint(  0, 280);
	city_d = new CPoint(120,   0);
	city_e = new CPoint(430,   0);

	var center = new CPoint(CANVASWIDTH/2, CANVASHEIGHT/2);

	nucleus = [nodes[getIndex(Math.floor(city_a.x/CANVASSTEPNODE), Math.floor(city_a.y/CANVASSTEPNODE))],
			   nodes[getIndex(Math.floor(city_b.x/CANVASSTEPNODE), Math.floor(city_b.y/CANVASSTEPNODE))],
			   nodes[getIndex(Math.floor(city_c.x/CANVASSTEPNODE), Math.floor(city_c.y/CANVASSTEPNODE))],
			   nodes[getIndex(Math.floor(city_d.x/CANVASSTEPNODE), Math.floor(city_d.y/CANVASSTEPNODE))],
			   nodes[getIndex(Math.floor(city_e.x/CANVASSTEPNODE), Math.floor(city_e.y/CANVASSTEPNODE))]
				];
}

function heighMapInit(){
	for(var x = 0; x <= CANVASWIDTH; x+=CANVASSTEPNODE){
		heighMap[x] = [];
		for(var y = 0; y <= CANVASHEIGHT; y+=CANVASSTEPNODE){
			heighMap[x][y]=0;
		}
	}
}


function CPoint(x,y,z){
	this.x = x;
	this.y = y;	
	this.z = z;
}


function drawLine(p1,p2,color,wi){
	ctx.beginPath();
	ctx.lineWidth = wi;	
	ctx.strokeStyle = color;
	ctx.moveTo(p1.x,p1.y);
	ctx.lineTo(p2.x,p2.y);
	ctx.stroke();
	ctx.closePath();
}

function drawCircle(x,y,color,radius){
	ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.arc(x,y,radius,(Math.PI/180)*0,(Math.PI/180)*360,false);
    ctx.stroke();
    ctx.closePath();
}

function drawFillCircle(x,y,color,radius){
	ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(x,y,radius,(Math.PI/180)*0,(Math.PI/180)*360,false);
    ctx.fillStyle = color;
    ctx.fill()
    ctx.closePath();
}

function Queue(){
	this.dataStore = [];
	this.enqueue = enqueue;
	this.dequeue = dequeue;
	this.front   = front;
	this.back    = back;
	this.toString= toString;
	this.empty   = empty;
}

function enqueue(element){
	return this.dataStore.push(element);	
}

function dequeue(){
	return this.dataStore.shift();
}

function front(){
	return this.dataStore[0];
}

function back(){
	return this.dataStore[this.dataStore.length-1];	
}

function toString(){
	var retStr = "";
	for(var i=0;i<this.dataStore.length;++i){
		retStr += this.dataStore[i]+"\n";
	}
	return retStr;
}

function empty(){
	if(this.dataStore.length == 0){
		return true;
	}
	else{
		return false;
	}
}


function findnoise2(x,y){
	var n=x+y*57;
	n=(n*Math.pow(2,13))^n;	
	var nn=(n*(n*n*60493+19990303)+1376312589)&0x7fffffff;	
	return 1.0-nn/1073741824.0;
}

function interpolate(a,b,x){
	var ft=x*3.1415927;
	var f=(1.0-Math.cos(ft))*0.5;
	return a*(1.0-f)+b*f;
}

function noise(x,y){
	var floorx=x;
	var floory=y;
	var s,t,u,v;

	s = findnoise2(floorx+0,floory+0);
	t = findnoise2(floorx+1,floory+0);
	u = findnoise2(floorx+0,floory+1);
	v = findnoise2(floorx+1,floory+1);

	var int1=interpolate(s,t,x-floorx);
	var int2=interpolate(u,v,x-floorx);			
	return interpolate(int1,int2,y-floory);
}


function plotMap(nodes){

	if( printWater ){
		for(var i=0;i<nodes.length;i++){
			if( distance(nodes[getIndex(50, 0)],nodes[i]) < 150){
				drawFillCircle(nodes[i].x, nodes[i].y, "rgba(11, 126, 188, 1)", 10);	
				nodes[i].z = 0;		
			}
		}	
	}
	
	if( printPerlin ){
		for(var i=0;i<nodes.length;i++){
			//console.log(nodes[i].z);
			if(nodes[i].z > 0.0){
				drawCircle(nodes[i].x, nodes[i].y, "brown", 2);			
			}
			if(nodes[i].z > 2.0){
				drawCircle(nodes[i].x, nodes[i].y, "rgb(135, 99, 37)", 2);			
			}

			if(nodes[i].z > 8.0){
				drawCircle(nodes[i].x, nodes[i].y, "black", 2);			
			}		
		}		
	}
}

function distance(a,b){
	return Math.sqrt( Math.pow(a.x-b.x,2)+ Math.pow(a.y-b.y,2) + Math.pow(a.z-b.z,2) );
}

function getNodeByParents(parents,destiny,n){
	var k = destiny.id;
	for(var i=0;i<n;i++){
		//drawLine(nodes[k], nodes[parents[k]], "black");
		k = parents[k];
	}
	return k;
}
