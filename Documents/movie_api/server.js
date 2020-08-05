/* In this way, you used the http module to set up the server, the url module to grab and read a URL request sent 
by the user, then the fs module to send back the appropriate file.*/

const http = require("http"),
  fs = require("fs"),
  url = require("url");

http
  .createServer((request, response) => {
    let addr = request.url,
      q = url.parse(addr, true),
      filePath = "";

    if (q.pathname.includes("documentation")) {
      filePath = __dirname + "/documenation.html";
    } else {
      filePath = "index.html";
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    });

    fs.appendFile(
      "log.txt",
      "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added Succesfully!");
        }
      }
    );
  })
  .listen(8080);
