
import React, { useState } from 'react';

const UpdateMealModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    dropdown1: '',
    dropdown2: '',
    dropdown3: '',
    input1: '',
    input2: '',
    input3: '',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateMeal = () => {
    // Implement your update logic here
    console.log('Updating meal with data:', formData);

    // Close the modal after updating
    handleCloseModal();
  };

  return (
    <div>
      {isModalOpen ?
      

     
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}></span>

            {/* Your form with three dropdowns and three inputs */}
            <form>
              <label>
                Dropdown 1:
                <select name="dropdown1" value={formData.dropdown1} onChange={handleInputChange}>
                  {/* Dropdown 1 options */}
                </select>
              </label>

              <label>
                Dropdown 2:
                <select name="dropdown2" value={formData.dropdown2} onChange={handleInputChange}>
                  {/* Dropdown 2 options */}
                </select>
              </label>

              <label>
                Dropdown 3:
                <select name="dropdown3" value={formData.dropdown3} onChange={handleInputChange}>
                  {/* Dropdown 3 options */}
                </select>
              </label>

              <label>
                Input 1:
                <input type="text" name="input1" value={formData.input1} onChange={handleInputChange} />
              </label>

              <label>
                Input 2:
                <input type="text" name="input2" value={formData.input2} onChange={handleInputChange} />
              </label>

              <label>
                Input 3:
                <input type="text" name="input3" value={formData.input3} onChange={handleInputChange} />
              </label>

              <button type="button" onClick={handleUpdateMeal}>Update</button>
            </form>
          </div>
        </div>:
        <button onClick={handleOpenModal}>Update Meal</button>
      }
    </div>
  );
};

export default UpdateMealModal;