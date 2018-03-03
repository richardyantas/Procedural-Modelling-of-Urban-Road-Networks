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



