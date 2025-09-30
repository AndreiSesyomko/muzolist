
import './styles/index.css';
import {observer} from "mobx-react-lite";
import React from "react";
import {Spinner} from "react-bootstrap";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../src/styles/custom.scss'

const App = observer(() => {
  const [loading, setLoading] = React.useState(false);

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
