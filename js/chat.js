// Khởi tạo WebSocket server
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

// Danh sách các kết nối đến WebSocket server
const connections = [];

// Hàm xử lý khi có kết nối mới
server.on('connection', (socket) => {
  // Thêm kết nối vào danh sách
  connections.push(socket);

  // Xử lý khi có tin nhắn mới từ client
  socket.on('message', (message) => {
    // Gửi tin nhắn đến các kết nối khác
    for (let connection of connections) {
      if (connection !== socket) {
        connection.send(message);
      }
    }
  });

  // Xử lý khi kết nối bị đóng
  socket.on('close', () => {
    // Xóa kết nối khỏi danh sách
    const index = connections.indexOf(socket);
    connections.splice(index, 1);
  });
});