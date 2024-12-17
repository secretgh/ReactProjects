import React, { useState } from 'react';

const FormSubmission = ({data, newID}) => {
  const [formData, setFormData] = useState({
    id: (data && data.hasOwnProperty('id')) ? data.id : newID,
    description: (data && data.hasOwnProperty('description')) ? data.description : '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic, e.g., send data to API
    console.log(formData);
  };

  return (
    <div>
      <h2>Form Submission</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Id:
          <input
            readOnly
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormSubmission;