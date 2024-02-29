// <!-- writeCode

// - create file.js
// - create readme.txt
// - create a server in `file.js`
// - Use createReadStream method in file.js to read a file(readme.txt) and send data to response one chunk at a time. -->
const http = require('http');
const fs = require('fs');
const server=http.createServer(handleRequest);
function handleRequest(req,res) {
    res.writeHead(200,{'content-type':'text/html'});
fs.createReadStream('./readme.txt').pipe(res);
//  console.log(res);

}
server.listen(3000,()=>{
    console.log("Server is listening at port 3000");
})