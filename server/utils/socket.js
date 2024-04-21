const SocketIO = require("socket.io");

module.exports = {
  webSocket: (server) => {
    const io = SocketIO(server, {
      path: "/socket.io",
      cors: {
        origin: "*", //or 'https://localhost:PORT'
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socketConnection) => {
      this.socket = socketConnection;
      console.log(`a user connected ${this.socket.id}`);

      this.socket.on("disconnect", () => {
        this.socket.disconnect();
        console.log("Client disconnected");
      });
    });
  },
  emit: (eventName, msg) => {
    try {
      this.socket && this.socket.emit(eventName, msg);
    } catch (error) {
      console.error("Error emitting content:", error.message);
    }
  },
  disconnect: () => {
    this.socket && this.socket.disconnect();
  },
};
