import { useState } from "react"
import "./Create.css"

function CreateMeal() {
  const [makeMeal, setMakeMeal] = useState(true)

  function openModal () {
    setMakeMeal(!true)
  }

  function closeModal () {
    setMakeMeal(true)
  }

  

  return (
    <>

<h3 id="txtcenter">Would you like to make your own meal? (s)</h3>

    
      <div className="alreadymade">
      {makeMeal?
       <button type="submit" id="submitt" onClick={openModal}>Create Meal Now!!!</button>
        :   
        <div className="popup" id=" popup">
          <img
            src="https://media.istockphoto.com/id/1384052325/fr/photo/symbole-de-for%C3%AAt-de-coche.webp?b=1&s=170667a&w=0&k=20&c=lMim9mylyQ7Zjop8nMyHN5ppj-9s50HSF-KnrpFmXMk=" alt=""
          />
          <h2>thank you</h2>
          <p>your details have been registered</p>
          <button type="button" id="btn" onClick={closeModal}>ok</button>
        </div>}
       
      
      </div>
    </>
  )
}

export default CreateMeal