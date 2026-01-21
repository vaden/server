require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connexion à MongoDB réussie !');

    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion MongoDB:', err.message);
    process.exit(1);
  });
