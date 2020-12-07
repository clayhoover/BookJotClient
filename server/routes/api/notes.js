const router = require("express").Router();
const booksController = require("../../controllers/booksController");



router.route("/")
  .get(booksController.findAll)

  router.route("/:id")
  .post(booksController.create)

module.exports = router;