import React from 'react';
import './App.css';
import Logo from './components/Logo';
import { ModifyingAction, Task } from './types';
import AddTaskButton from './components/AddTaskButton';
import RemoveTaskButton from './components/RemoveTaskButton';
import ModifyTaskButton from './components/ModifyTaskButton';


function generateRandomId(): number {
  // Generate a random number between 0 and 9999999999
  return Math.floor(Math.random() * 10000000000);
}
const sampleTasks: Task[] = [
  {
    id: generateRandomId(),
    description: "Water Plants",
    modifying: false,
    // duration: 2,
    // startTime: '13:15',
    // endTime: '16:15',
    // isBlocked: false,
    status: true,
  },
  {
    id: generateRandomId(),
    description: "Feed Cats",
    modifying: false,
    // duration: 2,
    // startTime: '16:15',
    // endTime: '17:15',
    // isBlocked: false,
    status: false,
  },
]


function App() {
  const [tasks, setTasks] = React.useState<Task[]>(sampleTasks)
  const [addTask, setAddTask] = React.useState<boolean>(false)
  const [newTaskDescription, setNewTaskDescription] = React.useState<string>('')
  const [modifyingTaskDescription, setModifiedTaskDescription] = React.useState<string>('')

  function submitTask() {
    const newTasksArray: Task[] =
      tasks.concat({
        id: generateRandomId(),
        description: newTaskDescription,
        modifying: false,
        status: false
      })
    setTasks(newTasksArray);
    setAddTask(false);
    setNewTaskDescription('')
  }

  function removeTask(id: number) {
    const newTasks: Task[] = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  function modifyTask(id: number, action: ModifyingAction) {
    const index = tasks.findIndex(task => task.id === id);
    const isActionModifying: boolean = action === 'Modify'

    if (index === -1) return null;

    // Use array destructuring to create a new object with the modified property
    const modifiedObject = {
      ...tasks[index], // Spread the properties of the object
      modifying: isActionModifying, // Set the specified property to the new value,
      description: isActionModifying ? tasks[index].description : modifyingTaskDescription
    };

    // Update the object in the array at the found index
    const newArray = [
      ...tasks.slice(0, index), // Elements before the found index
      modifiedObject, // Modified object
      ...tasks.slice(index + 1) // Elements after the found index
    ];

    setTasks(newArray);
    setModifiedTaskDescription(isActionModifying ? tasks[index].description : '')

  }

  return (
    <div className="App__Wrapper">
      <Logo />
      <div className='Tasks__Wrapper'>
        {tasks.map((task) => (
          <div className="TaskItem__Wrapper inline-center">
            {task.modifying ? (
              <div className='inline-center'>
                <input value={modifyingTaskDescription} onChange={(e) => setModifiedTaskDescription(e.target.value)} />
                <div className="TaskItem__ButtonGroups__Wrapper inline-center">
                  <ModifyTaskButton taskId={task.id} modifyTask={modifyTask} modifying={task.modifying} />
                  <RemoveTaskButton taskId={task.id} removeTask={removeTask} />
                </div>
              </div>
            ) : (
              <div className='inline-center'>
                <p>{task.description}</p>
                <div className="TaskItem__ButtonGroups__Wrapper inline-center">
                  <ModifyTaskButton taskId={task.id} modifyTask={modifyTask} modifying={task.modifying} />
                  <RemoveTaskButton taskId={task.id} removeTask={removeTask} />
                </div>
              </div>)}


          </div>
        )
        )}
      </div>
      {addTask ? null : <AddTaskButton addTaskStatus={addTask} setAddTaskStatus={setAddTask} />}

      {addTask ? (
        <div className='AddTask__Form__Wrapper inline-center'>
          <input placeholder={"Write your new task here..."} onChange={(e) => setNewTaskDescription(e.target.value)} value={newTaskDescription}></input>
          <button onClick={submitTask}>Submit Task</button>
        </div>
      ) : null}
    </div>
  );
}


export default App;
