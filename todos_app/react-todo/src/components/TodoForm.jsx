import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const TodoForm = ({ form, setForm, onSubmit, onBack }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, ['description']: value }));
    console.log(form.description + ", "+value);
  };

  return (
    <div style={{margin: "auto", width:"500px"}}>
      <Form onSubmit={onSubmit}>
        <Form.Group style={{margin: "auto", width:"400px"}}>
          <Form.Label>Task Description</Form.Label>
          <Form.Control style={{width: '400px'}} as="textarea" onChange={handleChange} defaultValue={form.description}></Form.Control>
        </Form.Group>
        <Form.Group style={{margin: "auto", width: "contain"}}>
          <Button style={{margin:"5px"}} type="submit">Save</Button>
          <Button style={{margin:"5px"}} onClick={onBack}>Back</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TodoForm;