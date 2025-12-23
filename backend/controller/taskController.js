import Task from '../models/Task.js'

export async function getAllTasks(_, res){
    try {
        const tasks = await Task.find().sort({createdAt: -1});
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error in getAllTasks Controller", error);
        res.status(500).json({message: "Internel Server Error"});
    }
};

export async function createTask(req, res){
    try {
        const {title, completed} = req.body;
        const task = new Task({title:title, completed:completed});
        const savedTask = await task.save()
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error in createTask Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export async function updateTask(req, res){
    try {
        const {title, completed} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, {title:title, completed:completed}, {new:true});
        if(!updatedTask) return res.status(404).json({message:"Task Not Found"});
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error in updatedTask Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};


export async function deleteTask(req, res){
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask) return res.status(404).json({message:"Task Not Found"});
        res.status(200).json(deletedTask);
    } catch (error) {
        console.error("Error in deleteTask Controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};
