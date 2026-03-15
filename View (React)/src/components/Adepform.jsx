import React, { useState } from "react";

const AddEmpForm = () => {
  const [formData, setFormData] = useState({
    // employeid:"",
    firstName: "",
    lastName: "",
    contactNo: "",
    eAddress: "",
  });
  const [errors, setFormerrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    alert("Form submitted");
    e.preventDefault();
    const valid = validateForm(formData)
    setFormerrors(valid);
    if (Object.keys(valid).length === 0) {
      console.log("Form data as JSON:", JSON.stringify(formData, null, 2));
      fetch("http://127.0.0.1:5000/auth/add_employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data=== null) {
            alert("Server error occurred");
          } else if (data.response_code === 200) {
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
        firstName: "",
        lastName: "",
        contactNo: "",
        eAddress: "",
      });
    }
  };


  // for Input field validation
  const validateForm = (values) => {
    const error = {};
    // if (!values.employeid) {
    //   error.employeid = "Employee id is required";
    // } else if (values.employeid <= 0) {
    //   error.employeid = "Employee id Should have positive value";
    // }
    if (!values.firstName) {
      error.firstName = "User name is required";
    } else if (values.firstName.length < 4) {
      error.firstName = "User name is Should have more than 4 characters";
    }
    if (!values.lastName) {
      error.lastName = "Last name is required";
    } else if (values.lastName.length < 4) {
      error.lastName = "last name is Should have more than 4 characters";
    }
    if (!values.contactNo) {
      error.contactNo = "Contact Number is required";
    } else if (values.contactNo.length !== 10) {
      error.contactNo = "Contact Number should have 10 digit.";
    }
    if (!values.eAddress) {
      error.eAddress = "Address is required";
    } else if (values.eAddress.length <= 5) {
      error.eAddress = "Address is required have more than 5 characters";
    } else if (values.eAddress.length > 50) {
      error.eAddress = "Adress should not have more than 50 characters";
    }
    return error;
  };

  return (
    <div class="employee-form">
      <h2>Add Employee</h2>
      {/* <form onSubmit={handleSubmit}> */}
      <fieldset>
        {/* <div class="form-group">
          <label htmlFor="employeid">Employee id:</label>
          <input
            id="employeid"
            type="number"
            name="employeid"
            value={formData.employeid}
            onChange={handleChange}
            placeholder="Assigned new Emplyoyee id"
            required
          />
          <p class="text-danger">{errors.employeid}</p>
        </div> */}
        
        <div class="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            minLength={3}
            maxLength={15}
            required
          />
          <p class="text-danger">{errors.firstName}</p>
        </div>
        <div class="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            minLength={3}
            maxLength={15}
            placeholder="Enter last name"
            required
          />
        </div>
        <p class="text-danger">{errors.lastName}</p>
        <div class="form-group">
          <label htmlFor="contactNo">Contact No:</label>
          <input
            id="contactNo"
            type="tel"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            maxLength={15}
            placeholder="Enter phone"
            required
          />
          <p class="text-danger">{errors.contactNo}</p>
        </div>
        <div class="form-group">
          <label htmlFor="eAddress">Address:</label>
          <input
            id="eAddress"
            type="text"
            name="eAddress"
            value={formData.eAddress}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />
        </div>
        <p class="text-danger">{errors.eAddress}</p>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </fieldset>
      {/* </form> */}
    </div>
  );
};

export default AddEmpForm;
