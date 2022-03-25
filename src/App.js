import React, { useRef, useState } from 'react'

function App() {
  const [todos, setTodos] = useState([{id:0, completed:true, title:'initdata'}])
  const input = useRef(null)
  
  //FUNCTION DU BOUTON AOUTER
  const handleSubmit = e => {
    e.preventDefault()
    setTodos([...todos, {id: todos.length>0? todos[todos.length-1].id+1:0, completed:false, title:input.current.value}])
    input.current.value=''
    input.current.focus()
  }

  //FUNCTION TOGGLE
  const onToggle = (todoItem) => setTodos(todos.map(todo => {
    if (todo.id===todoItem.id) {
      return {...todo, completed: !todo.completed}
    }
    else {
      return todo
    }}))

  //FUNCTION DU BOUTON DELETE
  const onDelete = (todoItem) => setTodos(todos.filter(todo => todo.id !== todoItem.id))

  //COMPONENT
  const TodoItem = ({todo, onToggle, onDelete}) => {
    return <li>
      <label htmlFor="">
        <input type="checkbox" checked={todo.completed} onChange={()=> onToggle(todo)}/>
        {todo.title}
        <button onClick={()=> onDelete(todo)}>x</button>
      </label>
    </li>
  }

  //RENDER
  return <div>
    <ul>
    {todos.map(todo => <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} key={todo.id}/>)}
    </ul>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Tâche" ref={input}/>
      <button>Ajouter</button>
    </form>
  </div>
}

export default App
