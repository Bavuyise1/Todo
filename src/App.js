import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
import './App.css';
import './components/CSS/style.css'
import { useState, useEffect } from 'react';


function App() {
 const [isCompleteScreen, setIsCompleteScreen] = useState(false)
 const [allTodos, setAllTodos] = useState([])
 const [newTitle, setNewTitle] =useState("")
 const [completedTodos, setCompletedTodos] = useState([]);
 const [newDescription, setNewDescription] = useState("")

 const handleNewTitle = (e) => {
  setNewTitle(e.target.value);

 };

 const handleNewDescription = (e) => {
  setNewDescription(e.target.value);

 };

 const handleAddTodo = () =>{
  let newTodoItem ={
    title: newTitle,
    description:newDescription,
  }

  let updatedTodoarr = [...allTodos];
  updatedTodoarr.push(newTodoItem);
  setAllTodos(updatedTodoarr);
  localStorage.setItem('todolist', JSON.stringify(updatedTodoarr))
 }

 

//  delete functionality
const handleDeleteTodo = (index) => {
  let updatedTodoarr = [...allTodos];
  updatedTodoarr.splice(index, 1);
  setAllTodos(updatedTodoarr);
  localStorage.setItem('todolist', JSON.stringify(updatedTodoarr))
}

// complete fuctionionality
const handleCompletedTodo = (index) => {
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth() + 1;
  let yyy = now.getFullYear();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let completedOn = 
  `${dd}/${mm}/${yyy} ${hour}:${minute}: ${second}`

  // create a new task object of the task selected in 
 let filteredItem = {
  ...allTodos[index],
  completedOn: completedOn
 };
 
 let updatedCompletedArr = [...completedTodos];
 updatedCompletedArr.push(filteredItem);
 setCompletedTodos(updatedCompletedArr);
 handleDeleteTodo(index);
 localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))
};

useEffect(()=>{
  let savedTodo =JSON.parse(localStorage.getItem('todolist'));
  if (savedTodo){
    setAllTodos(savedTodo);
  }
  // fetch completed task from local strorage
  let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'))
  if (savedCompletedTodos){
    setCompletedTodos(savedCompletedTodos);
  }
}, []);

const handleDeleteCompletedTodo = (index) => {
  let updatedCompletedArr = [...completedTodos];
  updatedCompletedArr.splice(index, 1);
  setCompletedTodos(updatedCompletedArr);
  localStorage.getItem('completedTodos', JSON.stringify(updatedCompletedArr))
};

  return (
    <>
<h1>My Todos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' name='title' value={newTitle} onChange={handleNewTitle} placeholder="What is the  task title?" />
          </div>

          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' name='title' value={newDescription} onChange={handleNewDescription} placeholder="What's the task description?" />
          </div>

          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'  >Add</button>
          </div>
        </div>


      <div className='btn-area'>
        <button className ={`secondaryBtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
        <button className ={`secondaryBtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
      </div>

      {isCompleteScreen  === false && allTodos.map((item, index)=> {
        return (
          <div className='todo-list' key={index} >  
          <div className='todo-list-item'>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          </div>
          <div className='icons'>
           < AiOutlineDelete className='icon' title='delete' onClick={() => handleDeleteTodo(index)} />
           < BsCheckLg className='check-icon' onClick={() => handleCompletedTodo(index,false)}/>
          </div>
            </div>
             )
        })}

        {isCompleteScreen  === true && completedTodos.map((item, index)=> {
        return (
          <div className='todo-list' key={index} >  
          <div className='todo-list-item'>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><small>completed on:{item.completedOn}</small></p>
          </div>
          <div className='icons'>
           < AiOutlineDelete className='icon' title='delete' onClick={() => handleDeleteCompletedTodo(index,true)} />
           
          </div>
            </div>
             )
        })}
      
  

 
          
        
    
   
      </div>
 
    </>
  );
}

export default App;
