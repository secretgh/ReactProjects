import React from 'react';
import TodoItem from './TodoItem';
import Table from 'react-bootstrap/Table';

const TodoList = ({ todos, onDelete, onEdit }) => (
    <Table bordered hover >
        <tbody>
            {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </tbody>
    </Table>
);

export default TodoList;