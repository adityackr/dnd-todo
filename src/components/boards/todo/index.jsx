import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Chip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/system';
import { useState } from 'react';
import TodoForm from '../../shared/todo-form';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const Todo = ({ addTodo, todos, updatedTodos, deleteTodo, heading }) => {
	const [edit, setEdit] = useState(false);
	const [add, setAdd] = useState(false);

	const handleAddButton = () => {
		setAdd(true);
	};

	const handleAddClose = () => {
		setAdd(false);
	};

	const handleTodo = (values) => {
		addTodo(values);
		setAdd(false);
	};

	const handleUpdatedTodos = (todo) => {
		updatedTodos(todo);
		setEdit(!edit);
	};

	return (
		<div>
			<Typography variant="h6" component="h4">
				{heading}
			</Typography>
			<Button
				variant="outlined"
				size="small"
				sx={{ marginTop: 1 }}
				onClick={handleAddButton}
			>
				Add New
			</Button>
			<Modal open={add} onClose={handleAddClose}>
				<Box sx={style}>
					<TodoForm handleTodo={handleTodo} />
				</Box>
			</Modal>
			{todos.map((todo) => (
				<Card key={todo.id} sx={{ my: 2 }}>
					<CardContent>
						<Stack direction="row" spacing={1} alignItems="flex-start">
							<Chip label={todo.priority} color="primary" size="small" />
							<Chip
								icon={<AccessTimeIcon />}
								label={todo.deadline}
								size="small"
							/>
						</Stack>
						<Stack
							justifyContent={'space-between'}
							alignItems={'center'}
							direction="row"
							spacing={2}
							sx={{ marginTop: 1 }}
						>
							<Typography variant="body1" component="body">
								{todo.task}
							</Typography>
							<Stack
								justifyContent={'right'}
								alignItems={'center'}
								direction="row"
								spacing={0.05}
							>
								<Button size="small" onClick={() => setEdit(true)}>
									<EditIcon color="success" />
								</Button>
								<Button size="small" onClick={() => deleteTodo(todo.id)}>
									<DeleteIcon color="error" />
								</Button>
							</Stack>
						</Stack>

						<Modal open={edit} onClose={() => setEdit(false)}>
							<Box sx={style}>
								<TodoForm values={todo} handleTodo={handleUpdatedTodos} />
							</Box>
						</Modal>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default Todo;
