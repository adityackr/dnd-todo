import { useState } from 'react';
import { generate } from 'shortid';
import Todo from './components/boards/todo';

const App = () => {
	const [todos, setTodos] = useState([]);

	const addTodo = (todo) => {
		todo.id = generate();
		setTodos([...todos, todo]);
	};

	console.log(todos);

	return (
		<div>
			<Todo addTodo={addTodo} todos={todos} />
		</div>
	);
};

export default App;
