import React, { useState } from "react";

const Findemployee = () => {
  const [formData, setFormData] = useState({
    search: "",
    limit: "",
  });
    const [employ, setEmploy] = useState({e_id:"",firstName:"",lastName:"",contactNo:"",eAddress:""});
  


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const renderTable = (tableData) => {
    if (!tableData.length) return <p>No employees found</p>;
    
    

    const columns = {E_id: "e_id",
      FirstName: "first_name",
      LastName: "last_name",
      ContactNo: "contact_no",
      EAddress: "address",
      Updated: "updated"};  

    return (
      <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            {Object.keys(columns).map(col => (
              <th key={col} style={{ padding: '12px 8px', border: '1px solid #ddd' }}>
                {col.replace(/\b\w/g, l => l.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              {Object.values(columns).map(col => (
                <td key={col} style={{ padding: '12px 8px', border: '1px solid #ddd' }}>
                  {row[col] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };



  const handleSubmit = (e) => {
    alert("Form submitted");
    e.preventDefault();
      fetch(`http://127.0.0.1:5000/auth/allemployee/${formData.search}/${formData.limit}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data=== null) {
            alert("Server error occurred");
          } else if (data.response_code === 200) {
            setEmploy(data.data);

            alert(data.message);
          } else if (data.response_code === 400) {
            alert(data.message);
          } else if (data.response_code === 500) {
            alert(data.message);
          }
        })
        .catch((error) => console.error("Error:", error));
      setFormData({
        // employeid:"",
        search: "",
        limit: "",
      });
    }
  



  return (
    <div class="find-employee-form">
      <h2>Find Employee:</h2>
      <fieldset>
        <div class="form-group">
          <label htmlFor="search">Enter ID, name, Address, Number:</label>
          <input
            id="search"
            type="search"
            name="search"
            value={formData.search}
            onChange={handleChange}
            placeholder="Enter search Input"
            required
          />
        </div><br/>
        <div class="form-group">
          <label htmlFor="limit">Limit :</label>
          <select id="limit" name="limit" value={formData.limit} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div><br/>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          findemployee
        </button>
      </fieldset>
      <hr/> 
      <div>
        <h2>Employee List:</h2>
        <div id="table-container"></div>
        <p>data: {JSON.stringify(employ)}</p>
      </div>

      <div id="employee_table">
        {renderTable(employ)}
      </div>





    </div>


  );
};

export default Findemployee;
