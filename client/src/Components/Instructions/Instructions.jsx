import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Similar from "../Similarities/Similar";
import "./Instruction.css"
import { useParams } from "react-router-dom";

function Instruction() {
  let currentmeal;
  const {id} = useParams()
  console.log(id);
  const [importantNote, setImportanNote] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [measurements, setMeasurements] = useState([])

  const { data } = useQuery({
    queryKey: ["instructtionsbkn"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/mealrouters/${id}`
      );
      setInstructions(res.data.step)
      setImportanNote(res.data.instruction)
      return res.data
    },
  });

console.log(data);
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
        <h4 id="measu"><b>Measurements</b></h4>
        <div class="card">
        <div class="container">
      </div>
         
            return(
              <>
              <p id="measur"></p>
              </>
            ) 
      
          </div>
          <Similar />
          <div className="formm"></div>

          <div className="alreadymade">
            <h3 id="txtcenter">Already made this ?</h3>
            <div className="btnmade">
              <button id="already">Share Your Feedback</button>
              <div id="orangg"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Instruction;
