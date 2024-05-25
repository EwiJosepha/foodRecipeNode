import { useState } from "react"
import MyForm from "../Inputs/Dropdowns"
import "./Create.css"
import Footer from "../Footer/Footer"

function CreateMeal() {
  const [makeMeal, setMakeMeal] = useState(true)

  function openModal() {
    setMakeMeal(!true)
  }

  function closeModal() {
    setMakeMeal(true)
  }



  return (
    <>

      <br />
      <h3 id="txtcenter" style={{ fontWeight: "600" }}>Would you like to make your own meal? (s)</h3><br />
<span>Fill the form correctly  before you click on submit to create meal</span><br/>

      <div className="alreadymade">
        {makeMeal ?
          <button type="submit" id="submitt" onClick={openModal}>Create Meal Now!!!</button>
          :
          <div className="popup" id=" popup">
            <img
              src="https://media.istockphoto.com/id/1384052325/fr/photo/symbole-de-for%C3%AAt-de-coche.webp?b=1&s=170667a&w=0&k=20&c=lMim9mylyQ7Zjop8nMyHN5ppj-9s50HSF-KnrpFmXMk=" alt=""
            />
            <MyForm />
            < br />
           
       
            <button type="button" id="btn" onClick={closeModal}>close Modal</button><br />
          </div>}


      </div>
      <Footer />
    </>
  )
}

export default CreateMeal