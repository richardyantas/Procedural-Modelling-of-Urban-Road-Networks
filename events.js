
function steps(){
	//for(var i=0;i<minorRoadsSet1.length-1;i++){
		var a = nodes[ minorRoadsSet1[tp]  ];
		var b = nodes[ minorRoadsSet1[tp+1]];
		drawLine(a,b,"red",1);		
	//}	
	tp++;
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
	printMinorRoads = true;
	main();
}



