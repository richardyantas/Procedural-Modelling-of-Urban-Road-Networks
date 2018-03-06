
canvas.addEventListener("mousemove", function (e) {
    findxy('move', e)
}, false);
canvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
}, false);
canvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
}, false);
canvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
}, false);


// Events for recognize press button
var keyName;
document.addEventListener('keydown', (event) => {
  keyName = event.key;
  //alert('keydown event\n\n' + 'key: ' + keyName);
});

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
        	var nx = Math.floor(currX/CANVASSTEPNODE);
        	var ny = Math.floor(currY/CANVASSTEPNODE);
        	if( Math.abs(currX-CANVASSTEPNODE*nx)<=CANVASSTEPNODE/2 && Math.abs(currY-CANVASSTEPNODE*ny)<=CANVASSTEPNODE/2){
        		drawFillCircle(CANVASSTEPNODE*nx,CANVASSTEPNODE*ny,'rgba(11, 126, 188, 1)',CANVASSTEPNODE);	
        	}        	           
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

function draw() {	
	var nx = Math.floor(currX/CANVASSTEPNODE);
	var ny = Math.floor(currY/CANVASSTEPNODE);
	console.log(  nx + " " + ny + " heighMap = " + heighMap[CANVASSTEPNODE*nx][CANVASSTEPNODE*ny] );
	if( heighMap[CANVASSTEPNODE*nx][CANVASSTEPNODE*ny] == 0){
		if( Math.abs(currX-CANVASSTEPNODE*nx)<=5 && Math.abs(currY-CANVASSTEPNODE*ny)<=5){
            nodes[ getIndex(nx,ny) ].road = 2;
			drawFillCircle(CANVASSTEPNODE*nx,CANVASSTEPNODE*ny,'rgba(11, 126, 188, 1)',CANVASSTEPNODE);	
			heighMap[CANVASSTEPNODE*nx][CANVASSTEPNODE*ny] = 1;
		} 		
	}
}


