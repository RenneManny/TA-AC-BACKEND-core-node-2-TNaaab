// You are currently inside server.js

// Write code to 
// - capture absolute path of `server.js`(itself)
// - get absolute path of `app.js`
// - get realtive path of `index.html`
// - get absolute path of `index.html` using `path module` 
// const path = require('path');
// let serverPath=path.join(__dirname,'server.js');
// console.log(serverPath);
// let appPath=path.join(__dirname,'./app.js');
// console.log(appPath);
// // get realtive path of `index.html`
// const serverDir = __dirname;
// const indexHtmlPath = './index.html';
// const relativePath = indexHtmlPath.substring(serverDir.length);
// console.log("Relative path of index.html from server.js:", relativePath);
// const relative_Path=path.relative(__dirname,'./index.html');
// console.log(relative_Path);



// - handle post method on '/' route
// - send json data on it from postman

// ```js
// // data format is
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// ```
// - capture data from request on server side using data and end event on request object
// - when end event fires, send entire captured data in response with status code 201.

const http = require('http');
const qs = require('querystring');
const server=http.createServer(handleRequest);

function handleRequest(req,res){
    let store='';
    req.on('data',(chunk)=>{
      
        store+=chunk;
    });
    req.on('end',()=>{
        if(req.headers['content-type']==='application/json'){
            res.writeHead(201,{'content-type':'application/json'});
            let parsedData=JSON.parse(store)
            res.end(JSON.stringify(parsedData));
        }
        else if(req.headers['content-type']==='application/x-www-form-urlencoded'){
            res.writeHead(201,{'content-type':'application/json'});

        const formData=qs.parse(store);
        const captainName=formData.captain
            
            res.end(JSON.stringify({captain:captainName}));
        }
    });
    
}
server.listen(3000,()=>{
    console.log('Server is listening!!');
})
// Q. Follow above steps with form data from postman instead of json data.
// - once data has been captured, send only captain's name in response.

