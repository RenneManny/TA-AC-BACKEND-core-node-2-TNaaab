// writeCode

// Create a basic http server in `stream.js`

// - add a listener on port 3456
// - send text data from postman using `POST` request on `/` route.
// - add `data` and `end` event on request to capture data
// - capture the data sent from postman on server side
// - send captured data in response using `res.write` -->

const http = require('http');
const server = http.createServer(handleRequest);

function handleRequest(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" }); // Change content type to 'text/plain'

    let store = '';
    req.on('data', (chunk) => {
        store = chunk + store;
    });

    req.on('end', () => {
        console.log(store);
        res.write(store); // Sending captured data in the response
        res.end(); // Ending the response
    });
}

server.listen(3456, () => {
    console.log('Server is listening at port 3456');
});
