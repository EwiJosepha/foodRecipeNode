import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function Relatedcategory(actualll) {
const { data } = useQuery({
    queryKey: ["manycategorys"],
    queryFn: async () => {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${actualll}`
      );

      return res.data.meals
    },
  });
  

    return (
     <>
       {data?.map((item)=>{ 
    
   

    return<div className="wrappercards">
 
    <div className="divcard">
    <img src={item.strMealThumb} />
        
    <div className="text">
          <div className="sta">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>
    <p id="carame">{item.strMeal}</p>

  </div>
  </div>
    </div> 

  } )};
  </>
    )
    
}

// export default relatedcategory
