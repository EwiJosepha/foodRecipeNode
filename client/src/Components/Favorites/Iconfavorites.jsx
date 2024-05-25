import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Favorites() {
  const geti = JSON.parse(localStorage.getItem("mealidd"));

  const { data } = useQuery({
    queryKey: ["mealstr"],
    queryFn: async () => {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${geti}`
      );

      return res.data.meals;
    },
  });

  const saveToStorage = (update) => {
    localStorage.setItem("favorites", JSON.stringify(update));
  };

  const toggleFavorites = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const id = data[0].idMeal;

    const prev_exists = favs.find((meal) => meal.idMeal === id);

    if (prev_exists) {
      const update = favs.filter((meal) => meal.idMeal !== id); // removing meal from localstorage
      saveToStorage(update); // saving updates
    } else {
      const update = [...favs, data[0]];
      saveToStorage(update);
    }
  };
  console.log(data, geti);

  return (
    <>
      <div className="wrapper">
        <div className="arrowlogo">
          <div className="arro">
            <i className="fa-solid fa-arrow-trend-up" id="gla"></i>
            <span id="gain">85% will make this gain</span>
          </div>
          <div className="favorit" id="favor">
            <i className="fa-solid fa-arrow-up-from-bracket" id="gla"></i>
            <i
              className="fa-solid fa-bookmark"
              id="glaa"
              onClick={toggleFavorites}
            ></i>
          </div>
        </div>

        <div className="strmeal">
          {data && <h1 id="berry">{data[0].strMeal}</h1>}
        </div>

        <div className="flexstar">
          <div className="smallimage">
            <img
              src="https://media.istockphoto.com/id/182924845/fr/photo/spaghetti-%C3%A0-la-bolognaise-avec-feuilles-de-basilic.webp?b=1&s=170667a&w=0&k=20&c=g60SDvd1ZYj4PScloP5L0LSowPAvE64ANLbFsych864="
              alt="popular Meals"
            />
            <span id="alb">Tricia Albert</span>
          </div>
          <div className="date">
            <div className="messag">
              <i className="fa-regular fa-message"></i>
              <p>Yesterday</p>
            </div>
            <div className="mes">
              <i className="fa-regular fa-calendar-minus"></i>
              <p>456</p>
            </div>
          </div>

          <div className="stars">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Favorites;
