    var messagesList = document.getElementById('messages');
    if (window.addEventListener) {
        window.addEventListener('load', function() {
            var form = document.getElementById('chatForm');
            var target_origin = 'http://localhost:3000';
            form.firstChild.textContent = window.frameElement.id + ": ";
            form.onsubmit = function(e) {
                e.preventDefault();
                e.stopPropagation();
                parent.postMessage({
                    'message': form.elements.msg.value,
                    'id': window.frameElement.id
                }, target_origin);
                form.elements.msg.value = "";            }
        }, false);

        // message handler
        window.addEventListener('message', function(e) {
            if (e.origin === 'http://localhost:3000') {
                var message = document.createElement("li");
                message.appendChild(document.createTextNode(e.data));
                messagesList.appendChild(message);
                messagesList.scrollTop = messagesList.scrollHeight;
            }
        }, false);
    }