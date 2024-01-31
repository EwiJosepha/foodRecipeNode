function Footer () {
  return(
    <>
    
    <div className="footer">
      <div className="logotext">
        <img src="src/assets/images/Logo 2.png" id="downlogo" />
        <div className="abt">
          <span id="abt">"On the other hand we denounce, with righteous indignation and dislike men who are so beguiled
            and demoralized by the charm of pleasure of the moment"</span>
        </div>
      </div>
      <div className="about">
        <div className="down-sec">
          <h6>Tastebite</h6>

          <span id="abtus">About us</span>
          <span id="abtus">Careers</span>
          <span id="abtus">Contact us</span>
          <span id="abtus">Feedback</span>

        </div>
        <div className="down-sec">
          <h6>Legal</h6>
          <span id="abtus">Terms</span>
          <span id="abtus">Condition</span>
          <span id="abtus">Cookies</span>
          <span id="abtus">Copyright</span>
        </div>
        <div className="down-sec">
          <h6>Follow</h6>
          <span id="abtus">Facebook</span>
          <span id="abtus">Twitter</span>
          <span id="abtus">Instagram</span>
          <span id="abtus">Youtube</span>
        </div>

        <div className="mobilefooter">
          <div className="publici">
            <img src="src/assets/images/Logo 2.png" id="bite2" />
            <div className="spans">
              <span id="abtt">"On the other hand we denounce, with righteous indignation and dislike men who are so
                beguiled and demoralized by the charm of pleasure of the moment"</span>
            </div>

          </div>
          <div className="selectt">
            <select className="opt1">
              <option id="op">Tastebite</option>
            </select>
            <select className="opt2">
              <option>Follow</option>
            </select>
            <select className="opt3">
              <option>Legal</option>
            </select>
          </div>

          <div className="twitt">
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-square-twitter"></i>
            <i className="fa-brands fa-square-youtube"></i>
          </div>

        </div>
      </div>
    </div>

    <hr />
    <div className="flex">
      <footer>
        <span><i className="fa-regular fa-copyright">
            2020 Tastebite-All Rights Reserve</i></span>

      </footer>

      <div className="facebk">
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-square-twitter"></i>
        <i className="fa-brands fa-square-youtube"></i>
      </div>

    </div>
    </>
  )
}
export default Footer