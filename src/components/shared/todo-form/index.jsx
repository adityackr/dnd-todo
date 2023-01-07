import React from 'react';
import useForm from '../../../hooks/useForm';

const TodoForm = ({
	values = {
		task: '',
		status: 'Todo',
		priority: 'High',
		deadline: '',
	},
	handleTodo,
}) => {
	const {
		formState: state,
		handleChange,
		handleSubmit,
	} = useForm({ ...values });

	const cb = () => {
		handleTodo(state);
	};

	return (
		<form onSubmit={(e) => handleSubmit(e, cb)}>
			<div>
				<label htmlFor="task">Task</label>
				<input
					type="text"
					name="task"
					id="task"
					value={state.task}
					onChange={handleChange}
					required
				/>
			</div>
			<div>
				<label htmlFor="status">Status</label>
				<select
					defaultValue={'selectStatus'}
					name="status"
					id="status"
					value={state.status}
					onChange={handleChange}
					required
				>
					<option value="selectStatus" disabled>
						Select Status
					</option>
					<option value="Todo">Todo</option>
					<option value="In Progress">In Progress</option>
					<option value="Done">Done</option>
				</select>
			</div>
			<div>
				<label htmlFor="priority">Priority</label>
				<select
					defaultValue={'selectPriority'}
					name="priority"
					id="priority"
					value={state.priority}
					onChange={handleChange}
					required
				>
					<option value="selectPriority" disabled>
						Select Priority
					</option>
					<option value="High">High</option>
					<option value="Medium">Medium</option>
					<option value="Low">Low</option>
				</select>
			</div>
			<div>
				<label htmlFor="deadline">Deadline</label>
				<input
					type="date"
					id="deadline"
					name="deadline"
					value={state.deadline}
					onChange={handleChange}
					required
				/>
			</div>
			<button type="submit">Add</button>
		</form>
	);
};

export default TodoForm;
