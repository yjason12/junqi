#!/usr/bin/env node

/**
 * Module dependencies.
 */

 import "reflect-metadata";
 import app from "./app";
 var debug = require("debug")("socketio-server:server");
 import * as http from "http";
 import socketServer from "./socket";
 
 /**
  * Get port from environment and store in Express.
  */
 
  var port = process.env.PORT || "9000"
  app.set("port", port);
 
 /**
  * Create HTTP server.
  */
 
 var server = http.createServer(app);
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 server.on("error", onError);
 server.on("listening", onListening);
 
 const io = socketServer(server);
 
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
  function onError(error:NodeJS.ErrnoException) {
    if (error.syscall !== "listen") {
      throw error;
    }
  
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
  function onListening() {
    var addr = server.address();
    if(!addr) throw "Address is NULL";
    console.log("Server Running on Port: ", port);
  }