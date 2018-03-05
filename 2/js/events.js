


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
	printMajorRoads = true;
	main();
}

function showMinorRoads(){
	printMinorRoads = false;
	main();
}



