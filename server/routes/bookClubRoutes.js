const express = require("express");
const router = express.Router();
const bookClubController = require("../controllers/bookClubController");
// const { requireAuth } = require("../middleware/auth");

router.post("/", bookClubController.createBookClub);
router.get("/", bookClubController.getAllClubs);
router.get("/:clubId", bookClubController.getClubById);
router.post("/:clubId/join", bookClubController.joinClub);

module.exports = router;
