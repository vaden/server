const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 4000;
const mongoUri =
  "mongodb+srv://MaximeV:L2u78M9wAXCfphe@cluster0.entkqfa.mongodb.net/grimoire?retryWrites=true&w=majority";

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connexion à MongoDB réussie !");

    app.listen(port, () => {
      console.log(`Serveur démarré sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erreur de connexion MongoDB:", err.message);
    process.exit(1);
  });
