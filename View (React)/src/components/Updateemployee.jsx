import { useState } from "react";

function Updateemployee() {
  const [formData, setFormData] = useState({
    e_id: "",
    firstName: "",
    lastName: "",
    eAddress: "",
    contactNo: "",
  });
  const [placeholderData, setPlaceholderData] = useState({
    e_id: "",
    firstName: "",
    lastName: "",
    eAddress: "",
    contactNo: "",
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const [errors, setFormerrors] = useState({});

    const search_handle = (e) => {
      alert("Searching for employee with Employee id :" + formData.e_id);
    e.preventDefault();
      fetch(`http://localhost:5000/auth/employee/${formData.e_id}`, {
        method: "GET"})
          .then((response) =>   response.json())
          .then((data) => {
            if (data.success) {
            setPlaceholderData({
              e_id: data.data.e_id,
              firstName: data.data.first_name,
              lastName: data.data.last_name,
              eAddress: data.data.address,
              contactNo: data.data.contact_no,
            });
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    };

    const Updatehandel = (e) => {
      e.preventDefault();
      console.log("Updated employee data:", formData);
      fetch(`http://localhost:5000/auth/updateemployee/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Employee updated successfully!");
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.error("Error updating employee data:", error);
        });
    };

  return (
    <>
      <div id="Updateemployee" className="Updateemployee">
        <fieldset>
          <legend>Personal information:</legend>
          <label>Search:</label>
          <input
            type="text"
            name="e_id"   
            value={formData.e_id}
            onChange={handleChange}
            placeholder="Enter Employee ID"
            required
          />
          <button type="submit" onClick={search_handle}>
            Search Employee
          </button>
            <legend>Found employee data: </legend>
            <label htmlFor="e_id">Employee id:</label>
            <input
              type= "number"
              id="e_id"
              value={formData.e_id}
              onChange={handleChange}
              placeholder={formData.e_id}
              readOnly
            />
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={placeholderData.firstName}
              minLength={3}
              maxLength={15}
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                minLength={3}
                maxLength={15}
                placeholder={placeholderData.lastName}
            />
            <label htmlFor="eAddress">Address:</label>
            <input
              id="eAddress"
              type="text"
              name="eAddress"
              value={formData.eAddress}
              onChange={handleChange}
              placeholder={placeholderData.eAddress}
            />
            <label htmlFor="contactNo">Contact No:</label>
            <input
              id="contactNo"
              type="tel"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              maxLength={15}
              placeholder={placeholderData.contactNo}
            />
            <button type="submit" onClick={Updatehandel}>Update Employee</button>
        </fieldset>
      </div>
    </>
  );
}

export default Updateemployee;
