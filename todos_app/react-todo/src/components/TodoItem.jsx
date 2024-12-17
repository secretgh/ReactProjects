import React from 'react';
import Button from 'react-bootstrap/esm/Button';

const TodoItem = ({ todo, onDelete, onEdit }) => (
  <tr>
    <td onClick={() => onEdit(todo.id)} style={{margin:"auto", width:"500px", textAlign:"center", color:"black"}}>
        <label>{todo.description}</label>
    </td>
    <td style={{boxShadow:"none"}}>
        <Button variant='outline-danger' onClick={() => onDelete(todo.id)}>Delete</Button>
    </td>
  </tr>
);

export default TodoItem;