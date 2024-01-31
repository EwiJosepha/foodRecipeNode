function Navbar () {
  return (
    <>
    <div className="sticky">
       <div className="icons">
      <div className="facebk">
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-square-twitter"></i>

      </div>
      <div className="search">
        <i className="fa-solid fa-magnifying-glass"></i>
        <button>Login</button>
      </div>

      <div className="hidden">
        <i className="fa-solid fa-magnifying-glass"></i>
        <img src="" id="bite" />
        <i className="fa-solid fa-bars"></i>

      </div>
    </div>

    <div className="tastebite">
      <img src="src/assets/images/Logo 2.png" />
    </div>

    <div className="menu">
      <span>Home</span>
      <span>RecipePage</span>
      <span>Pages</span>
      <span>Buy</span>
    </div>
    </div>
    </>
  )
}

export default Navbar