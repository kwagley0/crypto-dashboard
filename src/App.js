import { BrowserRouter,Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core';
import Alert from "./components/Alert";
import {Helmet} from "react-helmet";

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "rgba(48,52,64,255)",
      color: "#white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Crypto Dashboard</title>
          <meta name="description" content="Crypto Dashboard" />
        </Helmet>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
      <Alert />
    </BrowserRouter>
  );  
}
 
    
export default App;
