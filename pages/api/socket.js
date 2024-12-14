// pages/api/socket.js
let roomUsers = {};

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const { Server } = require('socket.io');
    const io = new Server(res.socket.server, {
      path: '/api/socket_io',
      cors: {
        origin: "*"
      }
    });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('joinRoom', (roomId) => {
        if(!roomUsers[roomId]) {
          roomUsers[roomId] = [];
        }

        let role;
        if (roomUsers[roomId].length === 0) {
          role = 'partner';
        } else {
          role = 'user';
        }

        roomUsers[roomId].push({ socketId: socket.id, role: role });
        socket.join(roomId);
        socket.emit('assignedRole', { role });

        socket.on('chatMessage', ({ roomId, message, sender }) => {
          io.to(roomId).emit('chatMessage', { sender, message });
        });

        socket.on('videoAction', ({ roomId, action, time }) => {
          socket.to(roomId).emit('videoAction', { action, time });
        });

        socket.on('draw', ({ roomId, x, y, drawing, drawer, brushColor, brushSize, eraser }) => {
          socket.to(roomId).emit('draw', { x, y, drawing, drawer, brushColor, brushSize, eraser });
        });

        socket.on('requestCombine', ({ roomId, partnerData, userData }) => {
          // İki resmi birleştir
          // Burada basitçe partnerData ve userData'yı alıp client'a geri yolluyoruz.
          // Gerçekte sunucuda bir canvas yok, bu nedenle client tarafında birleştirileceğiz.
          // Buradan emit ile client'a geri data gönderebilirdik ama client tarafında birleştireceğiz.
          // Şimdilik serverdan bir şey yapmıyoruz. İsterseniz serverda birleştirme yapabilirsiniz ama bu daha karmaşık.
          // Burada basit tutuyoruz, client kendisi birleştirecek.
        });
        
        socket.on('quizAnswers', ({ roomId, answers }) => {
            // Bu örnekte quiz sonuçlarını sadece iletebiliriz, ama gerek yok.
            // Şimdilik bir şey yapmıyoruz. İstersen io.to(roomId).emit('quizAnswers', { answers }) yapabilirsin.
          });
  
  
        socket.on('disconnect', () => {
          roomUsers[roomId] = roomUsers[roomId].filter(u => u.socketId !== socket.id);
        });
      });
    });
  }
  res.end();
}
