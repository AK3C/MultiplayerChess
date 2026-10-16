const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static('public'));

app.get('/api/etat', (req, res) => {
    res.json({ message: "Bienvenue ! Voici l'état actuel du serveur.", tour: 1 });
});

app.use(express.urlencoded({ extended: true }));
app.post('/api/action', (req, res) => {
    const actionDuJoueur = req.body;
    console.log("Action reçue du client :", actionDuJoueur);

    res.json({ 
        succes: true, 
        message: "Action bien reçue par le serveur !",
        donneesMisesAJour: actionDuJoueur 
    });
});

// Route pour récupérer la liste des joueurs
app.get('/api/users', (req, res) => {
  // Tu lis ton fichier users.json et tu l'renvoies
  const users = JSON.parse(fs.readFileSync('./server/data/users.json', 'utf-8'));
  res.json(users);
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});