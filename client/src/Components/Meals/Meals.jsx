import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Landingimage from "../Landingpage/Landingimage";
import Popularcat from "../PopularCategory/Popularcategory";
import Footer from "../Footer/Footer";
import Form from "../Form/Form";
import Navbar from "../Navbar/Navbar";
import Choosefav from "../Choosefav/Choosefav";
import { useEffect, useState } from "react";

function Meals() {
  const [step, setStep] = useState([]);
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["mealbackend"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:3000/mealrouters");
        // Assuming the response.data is the actual data you want

        setStep(response.data[0].step);

        const data = response.data;
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  console.log(data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Sorry an error occured</h1>;
  }

  return (
    <>
      {/* <Navbar />
      <Landingimage />
      <Popularcat />
      <Choosefav/> */}

      <div className="latest" id="latestt">
        <h1 id="recipe">All Meals</h1>
        <div className="latestrecipe" id="latestrecipee">
          {data.slice(1,8).map((meals) => {
            return (
              <>
                <div
                  onClick={() => {
                    navigate("/details");
                    JSON.stringify(
                      localStorage.setItem("mealidd", meals.mealId)
                    );
                    console.log(meals.idMeal);
                  }}
                  className="bestmeal"
                  id="bestmeall"
                >
                  <img src={meals.mealUrl} />

                  <div className="area">
                    <h5 id="popcatt">{meals.mealName}</h5>
                    <h5 id="area">{meals.mealArea}</h5>
                    {/* <h2>Steps:</h2>
                    <ul>
                      {step.map((step, index) => (
                        <li key={index}>{step.step}</li>
                      ))}
                    </ul> */}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {/* 
      <Form />
      <Footer /> */}
    </>
  );
}

export default Meals;
