const router = require("express").Router();
const bookRoutes = require("./books");
const notes = require("./notes");

// book routes
router.use("/books", bookRoutes);
router.use("/notes", notes);

module.exports = router;
