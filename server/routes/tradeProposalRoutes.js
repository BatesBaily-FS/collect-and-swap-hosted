const express = require("express");
const router = express.Router();
const tradeProposalController = require("../controllers/tradePropController");
const { requireAuth } = require("../middleware/auth");

router.post("/", tradeProposalController.createProposal);
router.get("/", tradeProposalController.getAllProposals);
router.get("/:id", tradeProposalController.getProposalById);
router.put("/update/:id", tradeProposalController.updatedProposalById);
router.delete("/delete/:id", tradeProposalController.deleteProposal);

module.exports = router;
