const http = require('http');
const qs = require('querystring');

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let dataFormat = req.headers['content-type'];

    if (req.method === 'POST') {
        let store = '';

        req.on('data', (chunk) => {
            store += chunk;
        });

        req.on('end', () => {
            if (dataFormat === 'application/json') {
                try {
                    const jsonData = JSON.parse(store);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(jsonData));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Invalid JSON format');
                }
            } else if (dataFormat === 'application/x-www-form-urlencoded') {
                const parsedData = qs.parse(store);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(parsedData));
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Unsupported Content-Type');
            }
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
}

server.listen(7000, () => {
    console.log('Server is listening on port 7000');
});
