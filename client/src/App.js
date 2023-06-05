function App() {
  return (
    <div className="App">
      <h1> welcome </h1>
      <h2> test </h2>
      <div className="todos">
				<div className="todo">
					<div className="checkbox"></div>

          <div className="text"> task1 </div>

          <div className="delete-todo">x</div>
			  </div>

        <div className="todo is-complete">
          <div className="checkbox"></div>

          <div className="text"> task2 </div>

          <div className="delete-todo">x</div>
        </div>
      </div>
    </div>
  );
}

export default App;
