const Task=require('../DBModels/taskModel')

exports.getAddTask=async(req,res)=>{
    try{
        res.render('to-do-list')
    }   catch(e){
        res.status(500).send()
    } 
}

exports.addTask=async(req,res)=>{
    try {
        const task=await Task.create({
            taskName:req.body.taskName,
            taskOwner:req.user._id// we will change this after authentication 
        })
        task.save()
    } catch (err) {
        //400 because in this step the user will enter an invalid data 
        res.status(400).json({
            message:err.message
        })
    }
}
exports.getAllTasks=async(req,res)=>{
    try {
        const tasks=await Task.find({taskOwner:req.user._id}).sort('-createdAt')
        /* res.status(200).json({
            tasks
        })        */
        res.render('to-do-list',{
            tasks,
        })
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}

exports.getTask=async(req,res)=>{
    try {
        const id=req.params.id
        const task=await Task.findById(id)
        if(!task){ //thus means that there is no problem in the server but there is no task with the entered id 
            return res.status(400).json({
                message:'There is no task with this id'
            })
        }
        res.status(200).json({
            task
        })
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}

exports.updateTask=async(req,res)=>{
    try {
        const id =req.params.id
        const updatedTask=await Task.findByIdAndUpdate(id,req.body,{
            new:true,//to update on the document which is in the db
        })
        res.status(200).json({
            updatedTask
        })
    } catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}

exports.deleteTask=async(req,res)=>{
    try{
        const id=req.params.id
        const deletedTask=await Task.findByIdAndDelete(id)
        res.status(204).json()
    }catch (err) {
        res.status(500).json({
            message:err.message
        })
    }
}