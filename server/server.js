const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const { Chess } = require('chess.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes API Express
app.get('/api/etat', (req, res) => {
    res.json({ message: "Bienvenue ! Voici l'état actuel du serveur.", tour: 1 });
});

app.post('/api/action', (req, res) => {
    const actionDuJoueur = req.body;
    console.log("Action reçue du client :", actionDuJoueur);

    res.json({ 
        succes: true, 
        message: "Action bien reçue par le serveur !",
        donneesMisesAJour: actionDuJoueur 
    });
});

app.get('/api/users', (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync('./server/data/users.json', 'utf-8'));
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la lecture des utilisateurs" });
  }
});

// Logique Échecs (Socket.io)
const game = new Chess();

io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté :', socket.id);

  socket.on('make_move', ({ from, to }) => {
    console.log(`\n--- TENTATIVE DE COUP REÇUE ---`);
    console.log(`De : ${from} Vers : ${to}`);
    console.log(`Tour actuel sur le serveur : ${game.turn()}`);
    console.log(`FEN actuelle sur le serveur : ${game.fen()}`);

    try {
      // Tenter le coup
      const move = game.move({ from, to, promotion: 'q' });

      if (move) {
        console.log(`✅ Coup VALIDÉ par le serveur ! Nouvelle FEN : ${game.fen()}`);
        io.emit('gameStateUpdate', {
          fen: game.fen(),
          turn: game.turn(), // 'w' ou 'b'
          isGameOver: game.isGameOver(),
        });
      } else {
        console.log(`❌ Coup REFUSÉ par chess.js (retourne null)`);
        socket.emit('invalid_move');
      }
    } catch (error) {
      console.log(`❌ ERREUR CATCHÉE dans chess.js :`, error.message);
      socket.emit('invalid_move');
    }
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté :', socket.id);
  });
});

// Lancement du serveur HTTP (et non plus app.listen)
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

