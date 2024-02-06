import React, { useState } from 'react';
import axios from 'axios';

const MyForm = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [instructionformeal, setInstructionformeal] = useState([])
  const [stepsformeal, setStepsformeal] = useState([])
  const [ingredientsformeal, setIngredientsformeal] = useState([])
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

  const ingredient=[
      {
        ingredient: "Onoin",
      },
      {
        ingredient: "cucummer",

      },
      {
        ingredient: "curry",

      },
      {
        ingredient: "leaks",

      },
      {
        ingredient: "sugar",

      },
      {
        ingredient: "cream",

      },

    ]
  



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
        instructiont: instruction.map(item => ({ instruction: item.instruction })),
        step: step.map(item => ({ step: item.step })),
        ingredient: ingredient.map(item => ({ ingredient: item.ingredient }))
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
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({ label: option.label, value: option.value }));
    setInstructionformeal(selectedOptions);
  };

  const handlestepsformealChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({ label: option.label, value: option.value }));
    setStepsformeal(selectedOptions);
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
          <select 
            defaultValue={instructionformeal.map((item) => item.value)}

            onChange={handleinstructionformealChange} style={{ padding: '8px' }}
          >
            {instruction.map((instr) => {
              return <option>{instr.instruction}</option>
            })}
          </select>
        </label>
      </div>

      <div>
        <label style={{ marginBottom: '5px', fontSize: '20px', fontWeight: 400 }}>
          Steps :
          <select
            defaultValue={stepsformeal.map((item) => item.value)} onChange={handlestepsformealChange} style={{ padding: '8px' }}

          >
            {step.map((opt) => {
              return <option>{opt.step}</option>
            })}
            <option></option>
          </select>
        </label>
      </div>

      <div>
        <label style={{ marginBottom: '5px', fontSize: '20px', fontWeight: 400 }}>
          Ingredients:
          <select
            defaultValue={ingredientsformeal.map((item) => item.value)} onChange={(e) => setIngredientsformeal(Array.from(e.target.selectedOptions, (option) => option.value))} style={{ padding: '8px' }}
          >  {ingredient.map((ingr) => {
            return <option>{ingr.ingredient}</option>
          })}
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





// import React, { useState } from "react";
// import { Dropdown } from "react-bootstrap";
// const ingredients = ["Pomme de terre", "Carotte", "Oignon", "Steak"];
// const instructions = ["Couper en dés", "Faire revenir", "Mijoter"];
// const MealForm = () => {
//   const [meal, setMeal] = useState({
//     name: "",
//     imageUrl: "",
//     area: "",
//     category: "",
//     ingredients: [],
//     instructions: [],
//     steps: [],
//   });
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setMeal((prevState) => ({ ...prevState, [name]: value }));
//   };
//   const handleIngredientAdd = () => {
//     const newIngredient = {
//       name: "",
//       quantity: 0,
//       unit: "",
//     };
//     setMeal((prevState) => ({
//       ...prevState,
//       ingredients: [...prevState.ingredients, newIngredient],
//     }));
//   };
//   const handleInstructionAdd = () => {
//     setMeal((prevState) => ({
//       ...prevState,
//       instructions: [...prevState.instructions, ""],
//     }));
//   };
//   const handleStepAdd = () => {
//     setMeal((prevState) => ({
//       ...prevState,
//       steps: [...prevState.steps, ""],
//     }));
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(meal);
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="name">Nom du plat</label>
//         <input
//           type="text"
//           name="name"
//           id="name"
//           value={meal.name}
//           onChange={handleInputChange}
//           className="form-control"
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="imageUrl">URL de l'image</label>
//         <input
//           type="text"
//           name="imageUrl"
//           id="imageUrl"
//           value={meal.imageUrl}
//           onChange={handleInputChange}
//           className="form-control"
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="area">Région</label>
//         <input
//           type="text"
//           name="area"
//           id="area"
//           value={meal.area}
//           onChange={handleInputChange}
//           className="form-control"
//         />
//       </div>
//       <div className="form-group">
//         <label htmlFor="category">Catégorie</label>
//         <input
//           type="text"
//           name="category"
//           id="category"
//           value={meal.category}
//           onChange={handleInputChange}
//           className="form-control"
//         />
//       </div>
//       <h2>Ingrédients</h2>
//       {meal.ingredients.map((ingredient, index) => (
//         <div key={index} className="ingredient-group">
//           <label htmlFor={`ingredient-name-${index}`}>Nom</label>
//           <Dropdown>
//             <Dropdown.Toggle variant="success" id="dropdown-basic">
//               {ingredient.name}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               {ingredients.map((option) => (
//                 <Dropdown.Item
//                   key={option}
//                   onClick={() =>
//                     setMeal((prevState) => ({
//                       ...prevState,
//                       ingredients: prevState.ingredients.map((item, i) =>
//                         i === index ? { ...item, name: option } : item
//                       ),
//                     }))
//                   }
//                 >
//                   {option}
//                 </Dropdown.Item>
//               ))}
//             </Dropdown.Menu>
//           </Dropdown>
//           <label htmlFor={`ingredient-quantity-${index}`}>Quantité</label>
//           <input
//             type="number"
//             name={`ingredient-quantity-${index}`}
//             id={`ingredient-quantity-${index}`}
//             value={ingredient.quantity}
//             onChange={handleInputChange}
//             className="form-control"
//           />
//           <label htmlFor={`ingredient-unit-${index}`}>
//             {" "}
//             unit value={ingredient.unit}index{" "}
//           </label>
//           <input onChange={handleInputChange} className="form-control" />
//         </div>
//       ))}
//       <button className="btn" type="button" onClick={handleIngredientAdd}>
//         Ajouter un ingrédient
//       </button>
//       <h2>Instructions</h2>
//       {meal.instructions.map((instruction, index) => (
//         <div key={index} className="instruction-group">
//           <Dropdown>
//             <Dropdown.Toggle variant="success" id="dropdown-basic">
//               {instruction}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               {instructions.map((option) => (
//                 <Dropdown.Item
//                   key={option}
//                   onClick={() =>
//                     setMeal((prevState) => ({
//                       ...prevState,
//                       instructions: prevState.instructions.map((item, i) =>
//                         i === index ? { ...item, name: option } : item
//                       ),
//                     }))
//                   }
//                 >
//                   {option}
//                 </Dropdown.Item>
//               ))}
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       ))}
//       <button  className="btn" type="button" onClick={handleInstructionAdd}>
//         Ajouter une instruction
//       </button>
//       <h2>Étapes</h2>
//       {meal.steps.map((step, index) => (
//         <div key={index} className="step-group">
//           <input
//             type="text"
//             name={`step-${index}`}
//             id={`step-${index}`}
//             value={step}
//             onChange={handleInputChange}
//             className="form-control"
//           />
//         </div>
//       ))}
//       <button className="btn" type="button" onClick={handleStepAdd}>
//         Ajouter une étape
//       </button>
//       <button className="btn" type="submit">Enregistrer le plat</button>
//     </form>
//   );
// };
// export default MealForm;