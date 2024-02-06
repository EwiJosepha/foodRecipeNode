
import React, { useEffect, useState } from 'react';
import Meals from '../Meals/Meals';

const UpdateMealModal = () => {

  const [formData, setFormData] = useState({
    mealName: '',
    mealArea: '',
    mealUrl: '',
    instruction: '',
    step: '',
    step: '',
  });

  useEffect(() => {
    const updatedmeal = JSON.parse(localStorage.getItem("update"))
    // Set form data with values from the provided meal object
    setFormData({
      mealName: updatedmeal.mealName || '',
      mealArea: updatedmeal.mealArea || '',
      mealUrl: updatedmeal.mealUrl || '',
      instruction: JSON.stringify(updatedmeal.instruction) || '', // Add other fields as needed
      step: updatedmeal.step || '',
      step: updatedmeal.step || '',

    });
  }, []);

  console.log(formData.instruction);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your update logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <label htmlFor=" mealName"> mealName:</label>
      <input
        type="text"
        id="mealName"
        name="mealName"
        value={formData.mealName}
        onChange={handleChange}
        required
      />
      <label htmlFor="  mealArea"> mealArea:</label>
      <input
        type="text"
        id="  mealArea"
        name="mealArea"
        value={formData.mealArea}
        onChange={handleChange}
        required
      />
      <label htmlFor=" mealUrl"> mealUrl:</label>
      <input
        type="text"
        id=" mealUrl"
        name=" mealName"
        value={formData.mealUrl}
        onChange={handleChange}
        required
      />


      <label htmlFor=" instruction"> instruction:</label>
      <textarea
        id=" instruction"
        name=" instruction"
        value={JSON.stringify(formData.instruction, null, 2)}
        onChange={handleChange}
        required
      ></textarea>

      <label htmlFor="step">step:</label>
      <textarea
        id="step"
        name="step"
        value={formData.step}
        onChange={handleChange}
        required
      ></textarea>

      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateMealModal;