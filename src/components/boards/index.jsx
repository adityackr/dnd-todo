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
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
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

const Boards = ({
	addTodo,
	updatedTodos,
	deleteTodo,
	handleEdit,
	columnsData,
}) => {
	const [add, setAdd] = useState(false);
	const [columns, setColumns] = useState({});

	const handleAddButton = () => {
		setAdd(true);
	};

	const handleAddClose = () => {
		setAdd(false);
	};

	const handleTodo = (values) => {
		addTodo(values);
		setAdd(false);
		Object.entries(columns).map(([columnId, column]) => {
			console.log(columnId, column);
			if (columnId === values.status) {
				setColumns((prev) => ({
					...prev,
					[columnId]: {
						...prev[columnId],
						items: [...prev[columnId].items, values],
					},
				}));
			}
		});
	};

	const handleUpdatedTodos = (todo) => {
		updatedTodos(todo);
	};

	const handleDragEnd = ({ destination, source }) => {
		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId];
			const sourceItems = [...sourceColumn.items];
			const [removed] = sourceItems.splice(source.index, 1);
			updatedTodos({ ...removed, status: destination.droppableId });
		} else {
			const column = columns[source.droppableId];
			const copiedItems = [...column.items];
			const [removed] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]: {
					...column,
					items: copiedItems,
				},
			});
		}
	};

	useEffect(() => {
		setColumns(columnsData);
	}, [columnsData]);

	return (
		<div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
			<DragDropContext onDragEnd={handleDragEnd}>
				{Object.entries(columns).map(([columnId, column], index) => {
					return (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
							key={columnId}
						>
							<Typography variant="h6" component="h4">
								{column.name}
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
							<div style={{ margin: 8 }}>
								<Droppable droppableId={columnId} key={columnId}>
									{(provided, snapshot) => {
										return (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												style={{
													background: snapshot.isDraggingOver
														? 'lightblue'
														: 'lightgrey',
													padding: 2,
													width: 350,
													minHeight: 500,
												}}
											>
												{column.items.map((todo, index) => {
													return (
														<Draggable
															key={todo.id}
															draggableId={todo.id}
															index={index}
														>
															{(provided, snapshot) => {
																return (
																	<div
																		ref={provided.innerRef}
																		{...provided.draggableProps}
																		{...provided.dragHandleProps}
																		style={{
																			userSelect: 'none',
																			margin: '0 0 8px 0',
																			minHeight: '50px',
																			backgroundColor: snapshot.isDragging
																				? '#263B4A'
																				: '#456C86',
																			color: 'white',
																			...provided.draggableProps.style,
																		}}
																	>
																		<Card key={todo.id}>
																			<CardContent>
																				<Stack
																					direction="row"
																					spacing={1}
																					alignItems="flex-start"
																				>
																					<Chip
																						label={todo.priority}
																						color="primary"
																						size="small"
																					/>
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
																					<Typography
																						variant="body1"
																						component="body"
																					>
																						{todo.task}
																					</Typography>
																					<Stack
																						justifyContent={'right'}
																						alignItems={'center'}
																						direction="row"
																						spacing={0.05}
																					>
																						<Button
																							size="small"
																							onClick={() =>
																								handleEdit(todo.id)
																							}
																						>
																							<EditIcon color="success" />
																						</Button>
																						<Button
																							size="small"
																							onClick={() =>
																								deleteTodo(todo.id)
																							}
																						>
																							<DeleteIcon color="error" />
																						</Button>
																					</Stack>
																				</Stack>

																				<Modal
																					open={todo.edit}
																					onClose={() => handleEdit(todo.id)}
																				>
																					<Box sx={style}>
																						<TodoForm
																							values={todo}
																							handleTodo={handleUpdatedTodos}
																						/>
																					</Box>
																				</Modal>
																			</CardContent>
																		</Card>
																	</div>
																);
															}}
														</Draggable>
													);
												})}
												{provided.placeholder}
											</div>
										);
									}}
								</Droppable>
							</div>
						</div>
					);
				})}
			</DragDropContext>
		</div>
	);
};

export default Boards;
