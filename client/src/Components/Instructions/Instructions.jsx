import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Similar from "../Similarities/Similar";
import CreateMeal from "../CreateMeal/CreateMeal";
import "./Instruction.css";
import { useParams } from "react-router-dom";
import UpdateMealModal from "../UpdateMeal/UpdateMeal";

function Instruction() {
  let currentmeal;
  const { id } = useParams();
  console.log(id);
  const [importantNote, setImportanNote] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  const { data } = useQuery({
    queryKey: ["instructtionsbkn"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/mealrouters/${id}`);
      setInstructions(res.data.step);
      setImportanNote(res.data.instruction);
      setMeasurements(res.data.ingredients);
      return res.data;
    },
  });

  console.log(data);
  console.log(measurements);
  return (
    <>
      <div className="containersflex">
        <div className="twowrapper">
          <h4 id="ingredients">Important Note</h4>
          <div className="ul2">
            <div className="container">
              <ul type="circle" id="display-ingredients">
                {importantNote?.map((importantnote, index) => (
                  <li key={index}>{importantnote.instruction}</li>
                ))}
              </ul>
            </div>
          </div>

          <h4 id="instructions">Instructions</h4>
          <div className="instruc" id="instrucc">
            <ul type="circle" id="display-ingredients">
              {instructions.map((step, index) => (
                <li key={index}>{step.step}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fourimage">
          <h4 id="measu">
            <b>Ingredients</b>
          </h4>
          {measurements?.map((ingr, index) => (
            <ul key={index}>
              <li>{ingr.ingredients}</li>
            </ul>
          ))}
          <div class="card">
            <div class="container"></div>
          </div>

          <Similar />

          <br />
          <br />
          <br />
          <br />
          <br />
          {data && <UpdateMealModal data={data} />}
        </div>
      </div>
      <CreateMeal />
    </>
  );
}

export default Instruction;
