import express from "express";
import {getAllJournals, createJournal, updateJournal, deleteJournal, getJournalById} from "../controller/journalController.js"

const router = express.Router();

router.get("/", getAllJournals);
router.get("/:id", getJournalById);
router.post("/", createJournal);
router.put("/:id", updateJournal);
router.delete("/:id", deleteJournal);

export default router