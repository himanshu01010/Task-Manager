const New = require('../model/mongoose');

const getD = async(req,res)=>{
    try {
        const task = await New.find();
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({err : error.message})
    }
}

const postD = async(req,res)=>{
    try {
        const task = await New.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({err:error.message});
        
    }
}

const deleteD = async(req,res)=>{
    try {
        const {id} = req.params;
        const task = await New.findByIdAndDelete(id);
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

const putD = async(req,res)=>{
    try {
        const {id} = req.params;
        const task = await New.findByIdAndUpdate(
            {
                _id:id
            },
            req.body,
            {
                new:true,
                runValidators: true
            }

        )
        if(!task){
            res.status(404).json(`the task is not found ${id}`)
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({err:error.message})
        
    }
}

const getDo = async(req,res)=>{
    try {
        const {id} = req.params;
        // console.log(id);
        const task = await New.findById(id);
        // console.log(task);
        if(!task){
            res.status(404).json(`the page is not found ${id}`);
        }
        res.status(200).json(task)
        } catch (error) {
            res.status(500).json({err: error.message});
        }
}


module.exports = {getD, postD, deleteD,putD,getDo};