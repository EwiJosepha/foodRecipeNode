
import React, { useEffect, useState } from 'react';

import axios from 'axios';

const UpdateMealModal = ({ data }) => {

  const [formData, setFormData] = useState({
    mealName: '',
    mealArea: '',
    mealUrl: '',
    mealId: '',
    // instruction: '',
    // step: '',
    // step: '',
  });

  const [deleteMeal, setDeleteMeal] = useState()

  useEffect(() => {
    // const data = JSON.parse(localStorage.getItem("update"))
    // Set form data with values from the provided meal object
    setFormData({
      mealName: data.mealName || '',
      mealArea: data.mealArea || '',
      mealUrl: data.mealUrl || '',
      mealId: data.mealId || '',
      instruction:data.instruction.map(item => ({ instruction: item.instruction }))|| '', 
      // step: data.step || '',
      // step: data.step || '',

    });
  }, [data]);

  console.log(data);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const mealData = {
        mealName: formData.mealName,
        mealArea: formData.mealArea,
        mealUrl: formData.mealUrl,
        mealId: formData.mealId,
      };


      const updateValues = await axios.post(`http://localhost:3000/mealrouters/${mealData.mealId}/update`, mealData, {

        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(mealData.mealId);

      console.log('Meal updated successfully:', updateValues.data)
      console.log(mealData);

    } catch (error) {
      // Handle error
      console.error('Error updating meal:', error.message);
    }
    console.log('Form submitted:', formData);
    console.log('SQL Query:', data);
  };

  async function deletefunction() {
    const mealId = formData.mealId
    setDeleteMeal(data = {})


    try {
      const deleteVals = await axios.delete(`http://localhost:3000/mealrouters/${mealId}`)
      console.log(data);
      console.log(deleteVals);

    } catch (err) {
      if (err) {
        console.log("not deleted", err.message);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', }}>
      <label htmlFor="mealName"> mealName:</label>
      <input
        type="text"
        id="mealName"
        name="mealName"
        value={formData.mealName}
        onChange={handleChange}
        required
      />
      <label htmlFor="mealArea">mealArea:</label>
      <input
        type="text"
        id="mealArea"
        name="mealArea"
        value={formData.mealArea}
        onChange={handleChange}
        required
      />
      <label htmlFor="mealUrl">mealUrl:</label>
      <input
        type="text"
        id="mealUrl"
        name="mealUrl"
        value={formData.mealUrl}
        onChange={handleChange}
        required
      />
      <label htmlFor="mealId">mealId:</label>
      <input
        type="text"
        id="mealId"
        name="mealId"
        value={formData.mealId}
        onChange={handleChange}
        required
      />
      <label htmlFor=" instruction"> instruction:</label>
      <textarea
        id=" instruction"
        name=" instruction"
        value={formData.instruction}
        onChange={handleChange}
        required
      ></textarea>

      <button type="submit" style={{ background: "orange", border: "none", padding: "8px", borderRadius: "3px", color: "white" }}>Update Meal</button>
      <button type="button" onClick={deletefunction} style={{ background: "red", border: "none", padding: "10px", borderRadius: "3px", color: "white" }}>Delete Meal</button>
    </form>
  );
};

export default UpdateMealModal;

{/* 

<label htmlFor="step">step:</label>
<textarea
  id="step"
  name="step"
  value={formData.step}
  onChange={handleChange}
  required
></textarea> */}