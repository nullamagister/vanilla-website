const staticServer = require('static-server');
const server = new staticServer({
    rootPath: "./dist",
    port: 8000
});

server.start(() => {
    console.log("Server is running ...");
})