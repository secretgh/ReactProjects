import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';

const TodoPage = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5250/todos/${id}`)
        .then((res) => res.json())
        .then(setForm)
        .catch(console.error);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:5250/todos/${id}` : 'http://localhost:5250/todos';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(() => navigate('/'))
      .catch(console.error);
  };

  return (
    <>
      <br/>
      <div style={{margin:"auto",width:"700px"}}>
        <h1 style={{margin:"auto", width:"500px", textAlign:"center", marginBottom:"15px"}}>
          {id ? 'Edit' : 'Create'} Todo
        </h1>
        <TodoForm form={form} setForm={setForm} onSubmit={handleSubmit} onBack={()=>{navigate('/')}} />
      </div>
    </>
  );
};

export default TodoPage;