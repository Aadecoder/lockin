import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    content: {
        type:String,
        reqired:true
    }
},{timestamps: true}
)

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;