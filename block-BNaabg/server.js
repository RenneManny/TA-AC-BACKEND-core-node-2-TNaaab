const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const userDir = path.join(__dirname, "users/");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Route for creating a user
    if (parsedUrl.pathname === "/users" && req.method === "POST") {
        let store = '';

        req.on('data', (chunk) => {
            store += chunk;
        });

        req.on('end', () => {
            const userData = JSON.parse(store);
            const username = userData.username;

            const filePath = path.join(userDir, username + ".json");

            fs.open(filePath, "wx", (err, fd) => {
                if (err) {
                    if (err.code === 'EEXIST') {
                        res.writeHead(409, {'Content-Type': 'text/plain'});
                        res.end('User already exists');
                    } else {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal Server Error');
                    }
                } else {
                    fs.writeFile(fd, store, (err) => {
                        if (err) {
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.end('Internal Server Error');
                        } else {
                            fs.close(fd, (err) => {
                                if (err) {
                                    res.writeHead(500, {'Content-Type': 'text/plain'});
                                    res.end('Internal Server Error');
                                } else {
                                    res.writeHead(201, {'Content-Type': 'text/plain'});
                                    res.end('User created successfully');
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    // Route for getting a user
    else if (parsedUrl.pathname === "/users" && req.method === "GET") {
        const username = parsedUrl.query.username;
        const filePath = path.join(userDir, username + ".json");

        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('User not found');
                } else {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                }
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(data);
            }
        });
    }

    // Route for updating a user
    else if (parsedUrl.pathname === "/users" && req.method === "PUT") {
        const username = parsedUrl.query.username;
        const filePath = path.join(userDir, username + ".json");

        let store = '';

        req.on('data', (chunk) => {
            store += chunk;
        });

        req.on('end', () => {
            fs.open(filePath, "r+", (err, fd) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        res.writeHead(404, {'Content-Type': 'text/plain'});
                        res.end('User not found');
                    } else {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal Server Error');
                    }
                } else {
                    fs.ftruncate(fd, (err) => {
                        if (err) {
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.end('Internal Server Error');
                        } else {
                            fs.writeFile(fd, store, (err) => {
                                if (err) {
                                    res.writeHead(500, {'Content-Type': 'text/plain'});
                                    res.end('Internal Server Error');
                                } else {
                                    fs.close(fd, (err) => {
                                        if (err) {
                                            res.writeHead(500, {'Content-Type': 'text/plain'});
                                            res.end('Internal Server Error');
                                        } else {
                                            res.writeHead(200, {'Content-Type': 'text/plain'});
                                            res.end('User updated successfully');
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    // Route for deleting a user
    else if (parsedUrl.pathname === "/users" && req.method === "DELETE") {
        const username = parsedUrl.query.username;
        const filePath = path.join(userDir, username + ".json");

        fs.unlink(filePath, (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end('User not found');
                } else {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal Server Error');
                }
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('User deleted successfully');
            }
        });
    }

    // Route for handling unknown routes
    else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
