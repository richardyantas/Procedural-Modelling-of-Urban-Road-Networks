

function main(){	

	nodesInit();
	nucleusInit();
	heighMapInit();

	plotMap(nodes);

	g = new CGraph(nodes);
	g = initGraph(g);
	drawNucleus(nucleus);

	p1 = aStar(nodes[getIndex(city_a.x/CANVASSTEPNODE, city_a.y/CANVASSTEPNODE)],nodes[getIndex(city_c.x/CANVASSTEPNODE, city_c.y/CANVASSTEPNODE)],g);
	p2 = aStar(nodes[getIndex(city_d.x/CANVASSTEPNODE, city_d.y/CANVASSTEPNODE)],nodes[getNodeByParents(p1,nodes[getIndex(city_c.x/CANVASSTEPNODE, city_c.y/CANVASSTEPNODE)],10)],g);
	p3 = aStar(nodes[getNodeByParents(p1,nodes[getIndex(city_c.x/CANVASSTEPNODE, city_c.y/CANVASSTEPNODE)],20)],nodes[getIndex(city_b.x/CANVASSTEPNODE, city_b.y/CANVASSTEPNODE)],g);
	p4 = aStar(nodes[getNodeByParents(p1,nodes[getIndex(city_c.x/CANVASSTEPNODE, city_c.y/CANVASSTEPNODE)],35)],nodes[getIndex(city_e.x/CANVASSTEPNODE, city_e.y/CANVASSTEPNODE)],g);	

	console.log(getIndex(50,50));

	//dfs(nodes[getIndex(25,25)],counterBfs);

	for(var i=0;i<100000;i++){ // calculate exact value for limit
		minorRoadsSet1[i] = [];
		minorRoadsSet2[i] = [];
		minorRoadsSet3[i] = [];
	}
	
	stages.enqueue( getNodeByParents(p1,nodes[getIndex(city_c.x/10, city_c.y/10)],10) );


	var b1 = bfs(nodes[getNodeByParents(p1,nodes[getIndex(city_c.x/CANVASSTEPNODE, city_c.y/CANVASSTEPNODE)],10)],100,minorRoadsSet1 );
	var b2 = bfs(nodes[getNodeByParents(p1,nodes[getIndex(city_c.x/CANVASSTEPNODE, city_c.y/CANVASSTEPNODE)],20)],100,minorRoadsSet2 );
	var b3 = bfs(nodes[getNodeByParents(p1,nodes[getIndex(city_c.x/CANVASSTEPNODE, city_c.y/CANVASSTEPNODE)],35)],100,minorRoadsSet3 );

	mxn2    = b2.mnode;
	parents2 = b2.parents;

	minorRoadsSet1 = b1.road;
	minorRoadsSet2 = b2.road;
	minorRoadsSet3 = b3.road;

	
}

//main();





	


