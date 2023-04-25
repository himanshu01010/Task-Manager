import loadingImg from "../assets/loader.gif";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {URL} from '../App'

const TaskList = () => {

    const [tasks, setTasks] = useState([]);

    const [completedTasks, setCompletedTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false)
    const [taskId, setTaskId] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        completed: false
    })

    const {name} = formData;

    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    };

    const getTasks = async ()=>{
        setIsLoading(true)
        try{
            const {data} = await axios.get(`http://localhost:5000/api/tasks`);
            setTasks(data);
            setIsLoading(false);
        }
        catch(error){
            toast.error(error.message); 
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        getTasks()
    },[])



    const createTask = async(e)=>{
        e.preventDefault()
        if(name===""){
            return toast.error("input field can not be empty");
        }
        try {
            await axios.post(`http://localhost:5000/api/tasks`, formData)
            toast.success('task added successfully');
            setFormData({...formData, name:""});
            getTasks()
        } catch (error) {
            return toast.error(error.message)
        }
    }

    const deleteTask = async(id)=>{
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`)
            getTasks()
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const getSingleTask = async(task)=>{
        setIsEditing(true)
        setFormData({
            name: task.name,
            completed: false
        })
        setTaskId(task._id)
        
    }

    const updateTask = async(e)=>{
        e.preventDefault()
        if(name === ""){
            toast.error("The name can not be empty")
        }
        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}`, formData)
            setIsEditing(false)
            setFormData({...formData,name:""})
            getTasks()
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const completed = async(task)=>{
        const temp = {
            name: task.name,
            completed: true,
        }
        try {
            await axios.put(`http://localhost:5000/api/tasks/${task._id}`,temp)
            getTasks()

        } catch (error) {
            toast.error(error.message)
        }
    }




    return (
        <div>
            <h2>Task Manager</h2>
            <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} updateTask={updateTask} isEditing={isEditing}/>
            <div className="--flex-between --pb">
                <p><b>Total Tasks:</b> {tasks.length}</p>
                <p><b>Completed Tasks:</b> {completedTasks.length}</p>
            </div>
            <hr></hr>
            {isLoading && (
                <div className="--flex-center">
                    <img src={loadingImg} alt="loading"/>
                </div>
            )}
            {!isLoading && tasks.length === 0 ? (
                <p className="--py">No task added. please add a task</p>
            ) : (
                tasks.map((task, index) => (
                    <Task key={task._id} task={task} index={index} deleteTask={deleteTask} getSingleTask={getSingleTask} completed={completed}/>
                ))
            )}
        </div>
    )
};

export default TaskList;
