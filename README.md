# NI-Chat-TEST
This is a test application to show iframe communication with eachother
some style skills and dom manipulation with dragging elements
it also has a node backend to keep log of the chat with "node-json-db".

### Installation

Install the dependencies and start the server.

```sh
$ npm install 
$ node app.js
```

### Server API options

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Route | returns |
| ------ | ------ |
| /list | all the messages logged from chat |
| /list/:name | all the messages sent from named iframe |
| /message | posting new message to server |

### Todos

 - complete bonus extra
 - Maybe make draggable objects work better

License
----

MIT
