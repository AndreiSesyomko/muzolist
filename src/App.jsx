
import './index.css';
import {observer} from "mobx-react-lite";
import React from "react";
import {Spinner} from "react-bootstrap";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const App = observer(() => {
  const [loading, setLoading] = React.useState(true);

  if(loading)
  {
    return <Spinner animation="grow" variant="primary" />;
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
