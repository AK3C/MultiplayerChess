Online Chess game by the homies for the homies

# ♟️ Multiplayer Chess (Self-Hosted)

Une application web de jeu d'échecs multijoueur en temps réel, conçue pour être auto-hébergée sur un VPS personnel et jouée entre amis sur mobile (approche *Mobile-First* / PWA).

---

## 🛠️ Stack Technique

* **Front-end :** React (via Vite) + Tailwind CSS + Lucide React (Icônes)
* **Back-end :** Node.js + Express + Socket.io (Temps réel)
* **Logique Échecs :** `chess.js` (côté serveur pour l'arbitrage anti-triche et côté client pour l'UI) + `react-chessboard`
* **Stockage (Sans BDD) :** Fichiers JSON (`users.json` pour la sélection des profils, `stats.json` pour l'historique et les scores)

---

## 📁 Architecture du Projet

```text
multiplayer-chess/
│
├── .env                  
├── .env.example          
├── .gitignore            
├── package.json          
│
├── server/               # Back-end
│   ├── package.json      
│   ├── server.js         # API REST, routes Express, gestion WebSockets
│   └── data/
│       ├── users.json    # profils de joueurs
│       └── stats.json    # Historique des parties, scores et classement
│
└── client/               # Front-end
    ├── package.json      
    ├── vite.config.js    
    ├── index.html        # Page HTML principale
    └── src/
        ├── App.tsx       # Routeur principal 
        ├── Game.tsx 
        ├── main.tsx      # Point d'entrée React
        ├── socket.ts
        ├── components/
        │   ├── DrawButton.tsx    
        │   ├── ResignButton.tsx 
        │   ├── ThemeButton.tsx     
        │   ├── Timer.tsx
        │   ├── Board.tsx     
        └── styles/
            └── index.css # Configuration Tailwind CSS


## Configurer le serveur

Initialisation
```
cd server
npm install
```

Création des profils dans `server/data/users.json`. 


## Configurer le client

```
cd client
npm install
```

## Lancement serveur
```
cd server && node server.js
```

## Lancement client
```
cd client && npm run dev
```
