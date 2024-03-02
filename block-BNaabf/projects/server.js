const http = require("http");
const server = http.createServer(handleRequest);
const qs = require("querystring");
const fs = require("fs");
function handleRequest(req, res) {
  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (req.url === "/form" && req.method === "GET") {
      res.setHeader("content-type", "text/html");
      fs.createReadStream("./form.html").pipe(res);
    }
    if (req.method === "POST" && req.url === "/form") {
      let parsedData = qs.parse(store);
      res.setHeader("content-type", "text/html");
      res.write(`<h2>${parsedData.name}</h2>`);
      res.write(`<h3>${parsedData.email}</h3>`);
      res.write(`<p>${parsedData.age}</p>`);
      res.end();
    }
  });
}
server.listen(5678, () => {
  console.log("Server is listening at port 3000");
});
