import { useState } from 'react';
import { generate } from 'shortid';
import Todo from './components/boards/todo';

const App = () => {
	const [todos, setTodos] = useState([]);

	const addTodo = (todo) => {
		todo.id = generate();
		setTodos([...todos, todo]);
	};

	const updatedTodo = (updatedTodo) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === updatedTodo.id) return updatedTodo;
			return todo;
		});
		setTodos(updatedTodos);
	};

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	};

	const todoStatus = todos.filter((todo) => todo.status === 'Todo');
	const inProgressStatus = todos.filter(
		(todo) => todo.status === 'In Progress'
	);
	const doneStatus = todos.filter((todo) => todo.status === 'Done');

	return (
		<div>
			<Todo
				addTodo={addTodo}
				todos={todoStatus}
				updatedTodos={updatedTodo}
				deleteTodo={deleteTodo}
				heading={'TODO'}
			/>
			<Todo
				addTodo={addTodo}
				todos={inProgressStatus}
				updatedTodos={updatedTodo}
				deleteTodo={deleteTodo}
				heading={'In Progress'}
			/>
			<Todo
				addTodo={addTodo}
				todos={doneStatus}
				updatedTodos={updatedTodo}
				deleteTodo={deleteTodo}
				heading={'Done'}
			/>
		</div>
	);
};

export default App;
