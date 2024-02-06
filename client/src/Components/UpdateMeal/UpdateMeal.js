
import React, { useEffect, useState } from 'react';
import Meals from '../Meals/Meals';

const UpdateMealModal = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
   mealName: '',
    mealArea: '',
    mealUrl: '',
    instruction: '',
    step: '',
  });


  useEffect(() => {
    // Retrieve values from local storage and set initial form data
    const storedFormData = JSON.parse(localStorage.getItem('update')) || {};
    setFormData(storedFormData);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save updated form data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
    // Close the modal or perform any additional actions
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label>
                Input 1:
                <input type="text" name="input1" value={formData.input1} onChange={handleChange} />
              </label>

              <label>
                Input 2:
                <input type="text" name="input2" value={formData.input2} onChange={handleChange} />
              </label>

              <label>
                Input 3:
                <input type="text" name="input3" value={formData.input3} onChange={handleChange} />
              </label>

              <label>
                Textarea 1:
                <textarea name="textarea1" value={formData.textarea1} onChange={handleChange} />
              </label>

              <label>
                Textarea 2:
                <textarea name="textarea2" value={formData.textarea2} onChange={handleChange} />
              </label>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateMealModal;