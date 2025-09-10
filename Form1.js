const { useState } = require("react");

export default function Form1() {
  const [formData, setFormData] = useState({
    roll: "",
    name: "",
    gender: "",
    city: "",
    phone: "",
  });

  function formSubmit(event) {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <form onSubmit={formSubmit}>
        <label>
          Roll Number:
          <input
            type="text"
            name="roll"
            onChange={handleChange}
            value={formData.roll}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            name="gender"
            onChange={handleChange}
            value={formData.gender}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={formData.city}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <h2>Form Data:</h2>
      <p>Roll Number: {formData.roll}</p>
      <p>Name: {formData.name}</p>
      <p>Gender: {formData.gender}</p>
      <p>City: {formData.city}</p>
      <p>Phone: {formData.phone}</p>
    </>
  );
}
