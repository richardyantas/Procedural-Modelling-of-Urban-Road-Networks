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
        	var nx = Math.floor(currX/10);
        	var ny = Math.floor(currY/10);
        	if( Math.abs(currX-10*nx)<=5 && Math.abs(currY-10*ny)<=5){
        		drawCircle(10*nx,10*ny,'blue',5);	
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
	var nx = Math.floor(currX/10);
	var ny = Math.floor(currY/10);
	console.log(  nx + " " + ny + " heighMap = " + heighMap[10*nx][10*ny] );
	if( heighMap[10*nx][10*ny] == 0){
		if( Math.abs(currX-10*nx)<=5 && Math.abs(currY-10*ny)<=5){
			drawCircle(10*nx,10*ny,'blue',5);	
			heighMap[10*nx][10*ny] = 1;
		} 		
	}
}


