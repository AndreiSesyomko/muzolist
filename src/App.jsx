
import './styles/index.css';
import {observer} from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import {Spinner} from "react-bootstrap";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
import {checkAuth} from "./api/user";
import {Context} from "./index";
import {getTracks} from "./api/track";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


const App = observer(() => {
  const [loading, setLoading] = React.useState(true);
  const {user, trackList} = useContext(Context)

  useEffect(() => {
      checkAuth().then((data) => {
          if(data) {
              console.log(data);
              user.setIsAuth(true);
              user.setUser(data);
          }
      }).finally(() => {
          getTracks().then((data) => {
              if(data) {
                  console.log(data);
                  const prev = trackList.tracks;
                  const res = [...prev, ...data]
                  trackList.setTracks(res);
                  console.log(trackList.tracks);
              }
          }).finally(() => {
              setLoading(false);
          })
      })
  }, [])

  if(loading)
  {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Spinner animation="border" variant="primary"/>
    </div>;
  }

  return (
      <BrowserRouter>
        <NavBar/>
        <AppRouter />
        <div style={{height: '60px'}}></div>
        <Footer/>
      </BrowserRouter>
  );
})

export default App;
