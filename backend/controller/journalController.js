import Journal from "../models/Journal.js";

export async function getAllJournals(_, res){
    try {
        const journal = await Journal.find().sort({createdAt: -1});
        res.status(200).json(journal);
    } catch (error) {
        console.error("Error in getAllJournals Controller", error);
        res.status(500).json({message: "Internel Server Error"});
    }
};

export async function createJournal(req, res){
    try {
        const {title, content} = req.body;
        const journal = new Journal({title:title, content:content});
        const savedJournal = await journal.save()
        res.status(201).json(savedJournal);
    } catch (error) {
        console.error("Error in createJournal Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export async function updateJournal(req, res){
    try {
        const {title, content} = req.body;
        const updatedJournal = await Journal.findByIdAndUpdate(req.params.id, {title:title, content:content}, {new:true});
        if(!updatedJournal) return res.status(404).json({message:"Journal Entry Not Found"});
        res.status(200).json(updatedJournal);
    } catch (error) {
        console.error("Error in updateJournal Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export async function deleteJournal(req, res){
    try {
        const deletedJournal = await Journal.findByIdAndDelete(req.params.id);
        if(!deletedJournal) return res.status(404).json({message:"Journal Entry Not Found"});
        res.status(200).json(deletedJournal);
    } catch (error) {
        console.error("Error in deleteJournal Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export async function getJournalById(req, res){
    try {
        const journal = await Journal.getJournalById(req.params.id);
        if(!journal) return res.status(404).json({message:"Journal Entry Not Found"});
        res.status(200).json(journal);
    } catch (error) {
        console.error("Error in getJournalById Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};