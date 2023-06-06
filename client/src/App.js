import { useEffect, useState } from 'react';
import './index.css';
const api_base = 'http://localhost:3001';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    fetch(api_base + '/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error: ', err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(api_base + '/todo/complete/' + id).then((res) => res.json());

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          return { ...todo, complete: data.complete };
        }
        return todo;
      })
    );
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    const data = await fetch(api_base + '/todo/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([data, ...todos]);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    const response = await fetch(api_base + '/todo/delete/' + id, { method: 'DELETE' });
    if (response.ok) {
      setTodos((todos) => todos.filter((todo) => todo._id !== id));
    } else {
      console.error('Error deleting todo');
    }
  };

  const todoItems = todos.filter((todo) => !todo.complete);
  const completedItems = todos.filter((todo) => todo.complete);

  return (
    <div className="App">
      <div className="title-container">
        <h1>Todo</h1>
        <h4>Your tasks</h4>
      </div>
      
      <div className="content-container">
        <h5>Todo</h5>
        
        <div className="todos">
          {todoItems.length > 0 ? (
            todoItems.map((todo) => (
              <div
                className={'todo' + (todo.complete ? ' is-complete' : '')}
                key={todo._id}
                onClick={() => completeTodo(todo._id)}
              >
                <div className="checkbox" style={todo.complete ? { backgroundImage: "url('/tick.png')" } : {}}></div>
                <div className="text">{todo.text}</div>
                <div className="delete-todo" onClick={(e) => { e.stopPropagation(); deleteTodo(todo._id); }} style={{ backgroundImage: "url('/bin.png')" }}>
                </div>
              </div>
            ))
          ) : (
            <p> </p>
          )}

          <h5>Completed</h5>
          {completedItems.length > 0 ? (
            completedItems.map((todo) => (
              <div
                className={'todo' + (todo.complete ? ' is-complete' : '')}
                key={todo._id}
                onClick={() => completeTodo(todo._id)}
              >
                <div className="checkbox" style={todo.complete ? { backgroundImage: "url('/tick.png')" } : {}}></div>
                <div className="text">{todo.text}</div>
                <div className="delete-todo" onClick={(e) => { e.stopPropagation(); deleteTodo(todo._id); }} style={{ backgroundImage: "url('/bin.png')" }}>
                </div>
              </div>
            ))
          ) : (
            <p> </p>
          )}
        </div>

        <div className="input-form-container">
          <form onSubmit={addTodo} className="input-form">
            <input
              type="text"
              className="add-todo-input"
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
