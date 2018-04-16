var counter = 0;
var iframes = document.getElementsByTagName('iframe');
//	adding click event on plus chat button.
document.getElementById('add-chat-iframe').addEventListener('click', function(e) {
	//////
	//	lines 7 through 13 are for draggin and make the style look nice
	var iframeWrapper = document.createElement('div');
	var divMover = document.createElement('div');
	iframeWrapper.id = "iframe-wrapper-" + counter;
	iframeWrapper.className = "iframe-wrapper";
	divMover.id = "iframe-wrapper-" + counter + "-header";
	divMover.className = "iframe-wrapper-header";
	divMover.appendChild(document.createTextNode("Drag me!"));
	//////

    var iframe = document.createElement('iframe');
    iframe.src = "./iframeChat.html";
    iframe.id = "iframe-" + counter;    
    document.body.insertAdjacentElement('beforeend', iframeWrapper);
    document.getElementById(iframeWrapper.id).insertAdjacentElement('beforeend', divMover);
    document.getElementById(iframeWrapper.id).insertAdjacentElement('beforeend', iframe);
    //make iframe draggable
    dragElement(iframeWrapper);
    counter++;
});
// check for browser support
if (window.addEventListener) {
    window.addEventListener('message', function(e) {
    	//listenning to some message (as long as same origin)
        if (e.origin === 'http://localhost:3000') {
            Array.from(iframes).forEach(function(element, index) {
                element.contentWindow.postMessage(e.data.id + ': ' + e.data.message, e.origin);
            });

            var chatMessage = {
                userName: e.data.id,
                message: e.data.message
            }
            //making sure i let the server know as well, to keep logs.
            var http = new XMLHttpRequest()
            http.open('POST', '/message');
            http.setRequestHeader('Content-type', 'application/json')
            http.send(JSON.stringify(chatMessage))
        }
    }, false);  
}

// make elements on the dom draggable, simply taken from W3C
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;  
    if (document.getElementById(elmnt.id + "-header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }
  

  function dragMouseDown(e) {
    e = e || window.event;
    elmnt.style.position = "absolute";
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {  	
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}