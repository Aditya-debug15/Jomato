import { useState, useEffect } from "react";
import { renderMatches } from "react-router-dom";

const Home = (props) => {
  const [showone,setshowone] = useState(false);
  const [showtwo,setshowtwo] = useState(false);
  const [showthree,setshowthree] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('loggedin')!=='1')
    {
      setshowone(true);
      setshowtwo(false);
      setshowthree(false);
    }
    else{
      if(localStorage.getItem('usertype')==='Vendor')
      {
        setshowone(false);
        setshowtwo(true);
        setshowthree(false);
      }
      else
      {
        setshowone(false);
        setshowtwo(false);
        setshowthree(true);
      }
    }
  }, []);

  return (
    <div>
      < div style={{ textAlign: "center" }}> Welcome
      </div >
      {
        showone ?
          <div>
            < div style={{ textAlign: "center" }}>
              Either use <br></br>
              Login OR Register
            </div >
          </div >
          :
          <div></div>
      }
      {
        showtwo ?
          <div>
            < div style={{ textAlign: "center" }}>
              Vendor {localStorage.getItem('email')}
            </div>
          </div>
          :
          <div></div>
      }
      {
        showthree ?
          <div>
            < div style={{ textAlign: "center" }}>
            Buyer {localStorage.getItem('email')}
            </div>
          </div>
          :
          <div></div>
      }
    </div>
  )
};

export default Home;
