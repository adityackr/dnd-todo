import { useState } from 'react';
import TodoForm from '../../shared/todo-form';

const Todo = ({ addTodo, todos, updatedTodos, deleteTodo, heading }) => {
	const [edit, setEdit] = useState(false);
	const [add, setAdd] = useState(false);

	const handleAddButton = () => {
		setAdd(true);
	};

	const handleTodo = (values) => {
		addTodo(values);
		setAdd(false);
	};

	return (
		<div>
			<h3>{heading}</h3>
			<button onClick={handleAddButton}>Add New</button>
			{add && <TodoForm handleTodo={handleTodo} />}
			{todos.map((todo) => (
				<div key={todo.id}>
					<h4>
						{todo.task} <small>{todo.priority}</small>{' '}
						<small>{todo.deadline}</small>
					</h4>
					<button onClick={() => setEdit(true)}>Edit</button>
					<button onClick={() => deleteTodo(todo.id)}>Delete</button>
					{edit && <TodoForm values={todo} handleTodo={updatedTodos} />}
				</div>
			))}
		</div>
	);
};

export default Todo;
