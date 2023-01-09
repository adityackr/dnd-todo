import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { generate } from 'shortid';
import Todo from './components/boards/todo';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const App = () => {
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem('todos')) || []
	);

	// useEffect(() => {
	// 	const todos = JSON.parse(localStorage.getItem('todos'));
	// 	if (todos) {
	// 		setTodos(todos);
	// 	}
	// }, []);

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

	const handleClose = (id) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, edit: !todo.edit };
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	const todoStatus = todos.filter((todo) => todo.status === 'Todo');
	const inProgressStatus = todos.filter(
		(todo) => todo.status === 'In Progress'
	);
	const doneStatus = todos.filter((todo) => todo.status === 'Done');

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
				<Grid container spacing={2} columns={12}>
					<Grid item xs={4}>
						<Item>
							<Todo
								addTodo={addTodo}
								todos={todoStatus}
								updatedTodos={updatedTodo}
								handleClose={handleClose}
								deleteTodo={deleteTodo}
								heading={'TODO'}
								columnsData={columnsData}
							/>
						</Item>
					</Grid>
					<Grid item xs={4}>
						<Item>
							<Todo
								addTodo={addTodo}
								todos={inProgressStatus}
								updatedTodos={updatedTodo}
								handleClose={handleClose}
								deleteTodo={deleteTodo}
								heading={'In Progress'}
								columnsData={columnsData}
							/>
						</Item>
					</Grid>
					<Grid item xs={4}>
						<Item>
							<Todo
								addTodo={addTodo}
								todos={doneStatus}
								updatedTodos={updatedTodo}
								handleClose={handleClose}
								deleteTodo={deleteTodo}
								heading={'Done'}
								columnsData={columnsData}
							/>
						</Item>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default App;
