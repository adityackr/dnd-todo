import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from '@mui/material';
import React from 'react';
import useForm from '../../../hooks/useForm';

const TodoForm = ({
	values = {
		task: '',
		status: '',
		priority: '',
		deadline: '',
	},
	handleTodo,
}) => {
	const { formState: state, handleChange, handleSubmit } = useForm(values);

	const cb = () => {
		handleTodo(state);
	};

	console.log(state);

	return (
		<form onSubmit={(e) => handleSubmit(e, cb)}>
			<FormControl fullWidth sx={{ m: 1 }} variant="filled">
				<InputLabel htmlFor="task">Task</InputLabel>
				<OutlinedInput
					id="task"
					type="text"
					name="task"
					value={state.task}
					onChange={handleChange}
					required
				/>
			</FormControl>

			<FormControl fullWidth sx={{ m: 1 }}>
				<InputLabel id="status-label">Status</InputLabel>
				<Select
					labelId="status-label"
					id="status"
					name="status"
					value={state.status}
					label="Status"
					onChange={handleChange}
				>
					<MenuItem value={'Todo'}>Todo</MenuItem>
					<MenuItem value={'In Progress'}>In Progress</MenuItem>
					<MenuItem value={'Done'}>Done</MenuItem>
				</Select>
			</FormControl>

			<FormControl fullWidth sx={{ m: 1 }}>
				<InputLabel id="priority-label">Priority</InputLabel>
				<Select
					labelId="priority-label"
					id="priority"
					name="priority"
					value={state.priority}
					label="Priority"
					onChange={handleChange}
				>
					<MenuItem value={'High'}>High</MenuItem>
					<MenuItem value={'Medium'}>Medium</MenuItem>
					<MenuItem value={'Low'}>Low</MenuItem>
				</Select>
			</FormControl>

			<FormControl fullWidth sx={{ m: 1 }} variant="filled">
				<TextField
					id="deadline"
					label="Deadline"
					type="date"
					name="deadline"
					value={state.deadline}
					onChange={handleChange}
					required
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</FormControl>
			<Button sx={{ m: 1 }} type="submit" variant="contained">
				Add
			</Button>
		</form>
	);
};

export default TodoForm;
