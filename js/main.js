/*Programacion de JavaScript*/

var puzzlePieces = document.getElementsByClassName('movil');
var winSong = document.getElementById("winSong");
var svgFrame = document.getElementById('svgFrame');
var h1 = document.getElementById('timer');
var winText = document.getElementById('winText');

var seconds = 0, minutes = 0, hours = 0,
    param;

var initialWidth = [213,289,213,213,288,213,250,250,213];
var initialHeight = [179,142,179,179,217,143,142,142,179];

var currentSelectedElement = null;  
var currentX = 0;
var currentY = 0;
var currentElementPosx = 0;
var currentElementPosy = 0;

var destinationPosx = [247,421,670,247,421,670,247,458,670];   
var destinationPosy = [37,37,37,178,141,178,318,318,280];

function setSizes(){
    for(var index = 0; index < puzzlePieces.length; index++){
        puzzlePieces[index].setAttribute("width", initialWidth[index]);
        puzzlePieces[index].setAttribute("height", initialHeight[index]);
        puzzlePieces[index].setAttribute("x", Math.floor((Math.random() * 1) + 1));
        puzzlePieces[index].setAttribute("y", Math.floor((Math.random() * 309) + 1));
        puzzlePieces[index].setAttribute("onmousedown","selectedElement(event)");
    }
}

function selectedElement(event) {
    currentSelectedElement = reorder(event);
    var pieceWidth = parseFloat(currentSelectedElement.width);
    var pieceHeight = parseFloat(currentSelectedElement.getAttribute("height"));
	currentX = event.clientX;        
	currentY = event.clientY;
	currentElementPosx = parseFloat(currentSelectedElement.getAttribute("x"));     
	currentElementPosy = parseFloat(currentSelectedElement.getAttribute("y"));
	currentSelectedElement.setAttribute("onmousemove","moveElement(event)");
}

function moveElement(event){
	var dx = event.clientX - currentX;
	var dy = event.clientY - currentY;
	currentElementPosx = currentElementPosx + dx;
	currentElementPosy = currentElementPosy + dy;
	currentSelectedElement.setAttribute("x",currentElementPosx);
	currentSelectedElement.setAttribute("y",currentElementPosy);
	currentX = event.clientX;        
	currentY = event.clientY;
	currentSelectedElement.setAttribute("onmouseout","unselectElement(event)");
	currentSelectedElement.setAttribute("onmouseup","unselectElement(event)");
	calibrate();
}

function unselectElement(event){
	testing();
	if(currentSelectedElement != null){			
		currentSelectedElement.removeAttribute("onmousemove");
		currentSelectedElement.removeAttribute("onmouseout");
		currentSelectedElement.removeAttribute("onmouseup");
		currentSelectedElement = null;
	}
}

function reorder(event){
	var parentOfSelectedImage = event.target.parentNode;
	var clone = parentOfSelectedImage.cloneNode(true);
	var id = parentOfSelectedImage.getAttribute("id");
	svgFrame.removeChild(document.getElementById(id));
	svgFrame.appendChild(clone);
	return svgFrame.lastChild.firstChild;
}

function calibrate(){
	for(var index = 0; index < puzzlePieces.length; index++){
		if (Math.abs(currentElementPosx - destinationPosx[index]) < 15 && Math.abs(currentElementPosy - destinationPosy[index]) < 15) {
			currentSelectedElement.setAttribute("x",destinationPosx[index]);
			currentSelectedElement.setAttribute("y",destinationPosy[index]);
		}
	}
}
			
function testing() {
	var complete = 0;
	var parents = document.getElementsByClassName('parent');
	for(var index = 0; index < puzzlePieces.length; index++){
		var posx = parseFloat(parents[index].firstChild.getAttribute("x"));    
        var posy = parseFloat(parents[index].firstChild.getAttribute("y"));
        id = parents[index].getAttribute("id");
        console.log("X: " + posx + " Y: " + posy + " ID: " + id);
		if(destinationPosx[id] == posx && destinationPosy[id] == posy){
			complete++;
		}
	}
	if(complete == 9){
        //winSong.play();
        clearTimeout(param);
        winText.textContent = 
        "Congratulation! You won in " + hours + " hours " + minutes + " minutes and " + seconds +" seconds!!!"
	}
}

/*****************************************************************************************************************/

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    param = setTimeout(add, 1000);
}

function startTimer(){
    winText.textContent = '';
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    timer();
}

function init(){
    setSizes();
}

window.onload = init();