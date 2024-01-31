import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import { Relatedcategory } from "./Manysimilarities";

function Similar () {
  const getsimilar= JSON.parse(localStorage.getItem("mealidd"));
  
  const { data } = useQuery({
    queryKey: ["similar"],
    queryFn: async () => {
      const meall = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getsimilar}`
      ).then((response)=>response.data)
      const mealCategory = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meall.meals[0].strCategory}`)
      return {
        meall, mealCategory: mealCategory.data
      }
    },
  });

  useEffect(()=>{
    // console.log(similarmeals);

  },[])

  // const similarmeals =  relatedcategory(data)
 console.log(data);
  return (
    <>  <div className="embodysimilar">
    <h2 id="simimeals">Similar Meals</h2>
         {data?.mealCategory.meals.slice(0,4).map((item)=>{ 
    
    return <div className="divcard">
    <img src={item.strMealThumb} />
        
    <div className="text">
          <div className="sta">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
    <span id="carame">{item.strMeal}</span>

  </div>
  </div>
  } )}
  </div>
    </>
  )
}

export default Similar