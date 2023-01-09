import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Modal,
	Stack,
	Typography,
} from '@mui/material';
import TodoForm from '../shared/todo-form';

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

const BoardCard = ({ todo, handleEdit, handleTodo, deleteTodo }) => {
	return (
		<Card key={todo.id}>
			<CardContent>
				<Stack direction="row" spacing={1} alignItems="flex-start">
					<Chip label={todo.priority} color="primary" size="small" />
					<Chip icon={<AccessTimeIcon />} label={todo.deadline} size="small" />
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
						<Button size="small" onClick={() => handleEdit(todo.id)}>
							<EditIcon color="success" />
						</Button>
						<Button size="small" onClick={() => deleteTodo(todo.id)}>
							<DeleteIcon color="error" />
						</Button>
					</Stack>
				</Stack>

				<Modal open={todo.edit} onClose={() => handleEdit(todo.id)}>
					<Box sx={style}>
						<TodoForm values={todo} handleTodo={handleTodo} />
					</Box>
				</Modal>
			</CardContent>
		</Card>
	);
};

export default BoardCard;
