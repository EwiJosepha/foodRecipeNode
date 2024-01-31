import Detailsnav from "../navDetails/Nav";
import Favorites from "../Favorites/Iconfavorites";
import Video from "../Video/Video";
import Instruction from "../Instructions/Instructions"
function Detailspage() {
  return (
    <>
    <div id="details">
  <Detailsnav />
  <Favorites />
  <Video/>
  <Instruction/>
  </div>
    </>
  );
}

export default Detailspage;
