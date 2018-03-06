


function steps(){	
	var n = stages.dataStore.length
	for(var i=0;i<n;i++){
		for(var j=0;j<minorRoadsSet1[ stages.dataStore[i] ].length;j++){
			stages.enqueue( minorRoadsSet1[ stages.dataStore[i] ][j] );
			drawLine(nodes[stages.dataStore[i]],nodes[ minorRoadsSet1[ stages.dataStore[i] ][j] ],"red",1);							
		}				
	} 
	
	for(var i=0;i<stages.dataStore.length;i++){		
		
		var p = getPoint( stages.dataStore[i] );
		
		console.log( p.x + " " + p.y );

		if( nodes[ getIndex(p.x-1, p.y) ].road == 2  ){// CNode.road = 1 o 2
			drawLine( nodes[getIndex(p.x, p.y)],nodes[ getIndex(p.x-1, p.y) ],"red",1);
		} 
		if( nodes[ getIndex(p.x, p.y-1) ].road == 2  ){
			drawLine(nodes[getIndex(p.x, p.y)],nodes[ getIndex(p.x, p.y-1) ],"red",1);	
		}
		if( nodes[ getIndex(p.x+1, p.y) ].road == 2  ){
			drawLine(nodes[getIndex(p.x, p.y)],nodes[ getIndex(p.x+1, p.y) ],"red",1);
		}
		if( nodes[ getIndex(p.x, p.y+1) ].road == 2  ){
			drawLine(nodes[getIndex(p.x, p.y)],nodes[ getIndex(p.x, p.y+1) ],"red",1);
		}

	}

	for(var i=0;i<n;i++){
		stages.dequeue();
	}	
}

function showGraph(){
	printMajorRoads = false;
	printMinorRoads = false;
	printGraph = true;
	main();
	printGraph = false;
}

function showPerlin(){
	printPerlin = true;
	printGraph  = false;
	main();
	printPerlin = false;
}

function showWater(){
	printWater = true;
	main();
}

function showMajorRoads(){
	printMinorRoads = false;
	printMajorRoads = true;
	main();
	printMajorRoads = false;
}

function showMinorRoads(){
	printMinorRoads	= true;
	main();
	printMinorRoads = false;
}

function trafficSimulation(){
	// A - i1  = 4 , maximum capcity
	// B - i1  = 4 , maximum capcity
	// i1 - i2 = 6 , maximum capcity
	// i2 - B  = 4 , maximum capcity
	// Is choosen 2 segmentss A -i1   and B - i1; 
	trafficLevel++;
	if( trafficLevel >= 2){
		console.log(nodes[mxn2]);
		printMajorRoads = true;
		var p1 = aStar( nodes[ getIndex(city_d.x/CANVASSTEPNODE, city_d.y/CANVASSTEPNODE)] , nodes[mxn2] ,g);
		for(var i=0;i<parents2.length-1;i++){
			drawLine(nodes[mxn2], nodes[ parents2[mxn2] ], COLORMAJORROADS ,2);
			mxn2 = parents2[mxn2];
		}

		printMajorRoads = false;
	} 

}


