/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var i = 0;

module.exports.testa = function(){
  //console.log("test module");
};

var obj = {};
obj.results = [];

var messages = [
  {
    username: 'bob',
    text: 'helloWorld!!!'
  }
];

module.exports.requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  // var classes = {
  //   roomName : {},
  //   messages : {},
  // }
  // var checkURL = function(url){
  // }

  var statusCode, headers, allData, results;
  allData = '';
  //console.log(Object.keys(request).client);

  request.on('data', function (data) {
    if (request.url === '/classes/messages' && request.method === 'POST'){
      //if (data === undefined) console.log('UNDEFINED DATA');
      allData += data;
    } else if (request.url === '/classes/room1' && request.method === 'POST'){
      allData += data;
    } else if (request.method === 'OPTIONS'){
      allData += data;
    }
  });

  request.on('end', function () {

    if (request.url === '/classes/messages') {

      if (request.method === 'GET') {
        console.log('OPTIONS 2 running');

        statusCode = 200;
        headers = defaultCorsHeaders;

        headers['Content-Type'] = "text/json";
        response.writeHead(statusCode, headers);
        //var resBody = {};
        //resBody.results = [];

        response.end(JSON.stringify(messages));

      } else if (request.method === 'POST') {
        // statusCode = 201;
        // headers = defaultCorsHeaders;
        // headers['Content-Type'] = "text/json";
        // response.writeHead(statusCode, headers);
        // response.end();
        //console.log('allData:', allData);
        obj.results.push(JSON.parse(allData));
        //body.results.push(JSON.parse(allData));
        // console.log('body.results:',body.results);
        // console.log('body.results[0].username:',body.results[0].username);
        // console.log('body.results[0].message:',body.results[0].message);

        // console.log('body:', body);
        // body = JSON.stringify(body);
        // console.log('JSON.stringify(body):', body);
        statusCode = 201;
        headers = defaultCorsHeaders;
        headers['Content-Type'] = "text/json";
        response.writeHead(statusCode, headers);
        //response.end(JSON.parse(body).results);
        //console.log(response.statusCode);

        response.end(JSON.stringify(obj));

      } else if (request.method === 'OPTIONS') {
        console.log('OPTIONS running');
// exports.sendResponse = function(response, data, statusCode){
//   statusCode = statusCode || 200;
//   response.writeHead(statusCode, headers);
//   response.end(JSON.stringify(data));
// };
        //console.log('Hello Curl');
        statusCode = 200;

        headers = defaultCorsHeaders;
        headers['Content-Type'] = "application/json";
        response.writeHead(statusCode, headers);
        // response.end(JSON.stringify(message));

        //var resBody = {};
        //resBody.results = [];
        //response.end(JSON.stringify(messages));
        response.end(JSON.stringify({a:1}));
      }

    } else if (request.url === '/classes/room1'){
      if (request.method === 'GET') {

        statusCode = 200;
        headers = defaultCorsHeaders;

        headers['Content-Type'] = "text/json";
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(obj));

      } else if (request.method === 'POST') {

        obj.results.push(JSON.parse(allData));
        statusCode = 201;
        headers = defaultCorsHeaders;
        headers['Content-Type'] = "text/json";
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(obj));

      }
    } else {
      // if (request.method === 'OPTIONS') {
      //   //console.log('Hello Curl');
      //   statusCode = 200;
      //   response.writeHead(statusCode, headers);
      //   response.end(JSON.stringify(message));
      // }




      console.log("Serving request type " + request.method + " for url " + request.url);
      // The outgoing status.
      statusCode = 404;
      // See the note below about CORS headers.
      headers = defaultCorsHeaders;
      // Tell the client we are sending them plain text.
      // You will need to change this if you are sending something
      // other than plain text, like JSON or HTML.
      headers['Content-Type'] = "text/json";
      // .writeHead() writes to the request line and headers of the response,
      // which includes the status and all headers.
      response.writeHead(statusCode, headers);

      // Make sure to always call response.end() - Node may not send
      // anything back to the client until you do. The string you pass to
      // response.end() will be the body of the response - i.e. what shows
      // up in the browser.
      //
      // Calling .end "flushes" the response's internal buffer, forcing
      // node to actually send all the data over to the client.
      response.end(JSON.stringify('Error page!!'));

    }
    allData = '';
  });




};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
//End of module object

