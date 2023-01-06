import { useState } from 'react';
import TodoForm from '../../shared/todo-form';

const Todo = ({ addTodo, todos, updatedTodo }) => {
	const [edit, setEdit] = useState(false);
	const [add, setAdd] = useState(false);

	const handleAddButton = () => {
		setAdd(true);
	};

	const handleTodo = (values) => {
		addTodo(values);
	};

	const handleEdit = () => {
		setEdit(true);
	};

	const filteredTodos = todos.filter((todo) => todo.status === 'Todo');

	return (
		<div>
			<h3>TODO</h3>
			<button onClick={handleAddButton}>Add New</button>
			{add && <TodoForm handleTodo={handleTodo} />}
			{filteredTodos.map((todo) => (
				<div key={todo.id}>
					<h4>{todo.task}</h4>
					<button onClick={handleEdit}>Edit</button>
					{console.log(todo)}
					{edit && <TodoForm values={{ ...todo }} handleTodo={updatedTodo} />}
				</div>
			))}
		</div>
	);
};

export default Todo;
