import React, { useState } from 'react';

const usersignup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data as JSON:', JSON.stringify(formData, null, 2));
    // Replace with your Flask endpoint
    fetch('http://127.0.0.1:5000/auth/user_signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {if (data.success) {
        alert(data.message); 
    }})
    .catch(error => console.error('Error:', error));
    setFormData({                  // 3️⃣ CLEAR form
        username: '',
        password: '',
      });
  };

  return (
    <div class="user-form">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div class="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              id="username"
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              placeholder="Enter username" 
              required 
            />
          </div>
          <div class="form-group">
            <label htmlFor="eAddress">Password:</label>
            <input 
              id="password"
              type="text" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="*********" 
              required 
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default usersignup;
