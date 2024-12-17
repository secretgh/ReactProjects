import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion'

const Home = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5250/todos')
      .then((res) => res.json())
      .then(setTodos)
      .catch(console.error);
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5250/todos/${id}`, { method: 'DELETE' })
      .then(() => setTodos((prev) => prev.filter((todo) => todo.id !== id)))
      .catch(console.error);
  };

  return (
    <>
      <br/>
      <div style={{margin:"auto",width:"700px"}}>
        <h1 style={{margin:"auto", width:"500px", textAlign:"center", marginBottom:"15px"}}>
          Home
        </h1>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              Task List
            </Accordion.Header>
            <Accordion.Body>
              <div style={{margin: "auto", width:"500px", height: "auto"}}>
                <TodoList todos={todos} onDelete={handleDelete} onEdit={(id) => navigate(`/todo/${id}`)} />
                <Button variant='outline-success' onClick={() => navigate('/todo')}>Add Todo</Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
          
      </div>
    </>
  );
};

export default Home;