const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/:auth0Id", userController.getUserByAuth0Id);
router.put("/update/:auth0Id", userController.updateUser);
router.delete("/delete/:auth0Id", userController.deleteUser);

module.exports = router;
