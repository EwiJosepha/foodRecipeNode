import React, { useState } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [instructionformeal, setInstructionformeal] = useState([])
  const [stepsformeal, setStepsformeal] = useState([])
  // const [ingredientsformeal, setIngredientsformeal] = useState([])
  const [selectstep, setSelectstep] = useState([])
  const [selectinstruction, setSelectinstruction] = useState([])
  // npm install react-scripts@latest

  const step = [

    {
      step: "Boil water and add salt",
    },
    {
      step: "add your macaroni or spaghetti",

    },
    {
      step: "add spices",
    },
    {
      step: "use cold water",
    },
    {
      step: "add  sugar and Milk",
    },

  ]


  const instruction = [
    {
      instruction: "follow meal steps carefully",
    },
    {
      instruction: "remember to add salt or cubes as covenient",

    },

  ]

  // const ingredient=[
  //     {
  //       ingredient: "Onoin",
  //     },
  //     {
  //       ingredient: "cucummer",

  //     },
  //     {
  //       ingredient: "curry",

  //     },
  //     {
  //       ingredient: "leaks",

  //     },
  //     {
  //       ingredient: "sugar",

  //     },
  //     {
  //       ingredient: "cream",

  //     },

  //   ]




  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      instruction,
      step
    });
    try {
      const mealData = {
        mealName: input1,
        mealArea: input2,
        mealUrl: input3,
        instruction: selectinstruction,
        step: selectstep,
        // ingredient: ingredient.map(item => ({ ingredient: item.ingredient }))
      };
      const response = await axios.post("http://localhost:3000/mealrouters", mealData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle successful response
      console.log('Meal created successfully:', response.data);
    } catch (error) {
      // Handle error
      console.error('Error creating meal:', error.message);
    }
  };



  const handleinstructionformealChange = (e) => {
    const val = e.target.value
    const valselect = { instruction: val }
    setSelectinstruction((prevInstructions) => [...prevInstructions, valselect]);

  };

  const handlestepsformealChange = (e) => {
    const val = e.target.value
    const valselect = { step: val }
    setSelectstep((prevstep) => [...prevstep, valselect]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        maxWidth: '300px', 
        height: '400px'
      }}
    >
      <div >
        <label style={{ marginBottom: '2px', fontSize: '25px', fontWeight: 400 }}><br />
          mealName:
          <input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            style={{ padding: '8px' }}
          />
        </label>
      </div>

      <div >
        <label style={{ marginBottom: '5px', fontSize: '20px', fontWeight: 400 }}>
          mealArea:
          <input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </label>
        <label style={{ marginBottom: '5px', fontSize: '20px', fontWeight: 400 }}>
          mealUrl:
          <input
            type="text"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </label>
      </div>

      <div >
        <label style={{ marginBottom: '5px', fontSize: '20px', fontWeight: 400 }}>
          Instructions:
          <select value={selectinstruction} onChange={handleinstructionformealChange} style={{ padding: '8px' }}
          >
            {instruction.map((instr, index) => {
              return <option key={index} value={instr.instruction}>{instr.instruction}</option>
            })}
          </select>
        </label>
      </div>

      <div>
        <label style={{ marginBottom: '5px', fontSize: '20px', fontWeight: 400 }}>
          Steps :
          <select value={selectstep}
            onChange={handlestepsformealChange}
           style={{ padding: '8px' }}

          >
            {step.map((opt, index) => {
              return <option key={index} value={opt.step}>{opt.step}</option>
            })}
          </select>
        </label>
      </div>

      <div>
        <label style={{ marginBottom: '5px', fontSize: '20px', fontWeight: 400 }}>
          Ingredients:
          {/* <select
            defaultValue={ingredientsformeal.map((item) => item.value)} onChange={(e) => setIngredientsformeal(Array.from(e.target.selectedOptions, (option) => option.value))} style={{ padding: '8px' }}
          >  {ingredient.map((ingr) => {
            return <option>{ingr.ingredient}</option>
          })}
          </select> */}
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
