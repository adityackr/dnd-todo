import { Box, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { generate } from 'shortid';
import Boards from './components/boards';

const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const todos = JSON.parse(localStorage.getItem('todos'));
		if (todos) {
			setTodos(todos);
		}
	}, []);

	const addTodo = (todo) => {
		todo.id = generate();
		setTodos([...todos, todo]);
	};

	const updatedTodo = (upTodo) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === upTodo.id) {
				return { ...upTodo, edit: false };
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const deleteTodo = (id) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	};

	const handleEdit = (id) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, edit: !todo.edit };
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const columnsData = {
		Todo: {
			name: 'Todo',
			items: todos.filter((todo) => todo.status === 'Todo'),
		},
		'In Progress': {
			name: 'In Progress',
			items: todos.filter((todo) => todo.status === 'In Progress'),
		},
		Done: {
			name: 'Done',
			items: todos.filter((todo) => todo.status === 'Done'),
		},
	};

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	return (
		<Container maxWidth="lg" sx={{ marginTop: 5 }}>
			<Box sx={{ flexGrow: 1 }}>
				<Boards
					addTodo={addTodo}
					columnsData={columnsData}
					deleteTodo={deleteTodo}
					handleEdit={handleEdit}
					updatedTodos={updatedTodo}
				/>
			</Box>
		</Container>
	);
};

export default App;
