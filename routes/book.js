const express = require("express");
const router = express.Router();
const bookCtrl = require("../controllers/book");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/", bookCtrl.getAllBook);

router.get("/:id", bookCtrl.getOneBook);

router.get("/bestrating", (req, res) => {
  res.send("Hello world !");
});

router.post("/", auth, multer, bookCtrl.createBook);

router.post("/:id/rating", auth, (req, res) => {
  res.send("Hello world !");
});

router.put("/:id", auth, multer, bookCtrl.modifyBook);

router.delete("/:id", auth, bookCtrl.deleteBook);

module.exports = router;
