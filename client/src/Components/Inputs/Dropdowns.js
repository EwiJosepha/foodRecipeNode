import React, { useState } from 'react';

const MyForm = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [dropdown1, setDropdown1] = useState('');
  const [dropdown2, setDropdown2] = useState('');
  const [dropdown3, setDropdown3] = useState(''); 
  // npm install react-scripts@latest


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      input1,
      input2,
      dropdown1,
      dropdown2,
      dropdown3,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        maxWidth: '300px', // Adjust the max width as needed
        // margin: 'auto',
        height: '400px'
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginBottom: '5px', fontSize: '25px', fontWeight: 600}}><br />
          mealName:
          <input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            style={{padding: '8px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginBottom: '5px',  fontSize: '25px', fontWeight: 600 }}>
          mealArea:
          <input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            style={{ padding: '8px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginBottom: '5px',  fontSize: '25px', fontWeight: 600 }}>
          Dropdown 1:
          <select
            value={dropdown1}
            onChange={(e) => setDropdown1(e.target.value)}
            style={{ padding: '8px' }}
          >
            {/* Options for dropdown 1 */}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginBottom: '5px',  fontSize: '25px', fontWeight: 600 }}>
          Dropdown 2:
          <select
            value={dropdown2}
            onChange={(e) => setDropdown2(e.target.value)}
            style={{ padding: '8px' }}
          >
            {/* Options for dropdown 2 */}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ marginBottom: '5px',  fontSize: '25px', fontWeight: 600 }}>
          Dropdown 3:
          <select
            value={dropdown3}
            onChange={(e) => setDropdown3(e.target.value)}
            style={{ padding: '8px' }}
          >
            {/* Options for dropdown 3 */}
          </select>
        </label>
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '15px',
          textAlign: 'center',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default MyForm;