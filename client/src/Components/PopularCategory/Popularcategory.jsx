import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Popularcat() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popularcategories"],
    queryFn: async () => {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"

      );
      return res.data
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
     
        <div className="popularcategory" id="popularcategoryy">
          <h1 id="popcat">Popular Category</h1>
          <div className="categoryimages" id="categoryimagess">
          {data?.categories.slice(0, 12).map((meal) => (
            <div key={meal.idMeal} className="imagetitle">
              <img src={meal.strCategoryThumb} alt="popular Meals" />

              <h5 id="popcatt">{meal.strCategory
}</h5>
            </div>
              ))}
          </div>
        </div>
    
    </>
  );
}

export default Popularcat;
