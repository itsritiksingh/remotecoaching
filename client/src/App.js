import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router ,Route} from "react-router-dom";
import { Landing } from "./Screen/Landing";
import {VideoPage} from './Screen/videoPage';
import {ProtectedRoute} from './components/protectedRoute';
import Signin from './components/Signin/SignIn'
import SignUp from './components/Signup/SignUp'
import axios from 'axios';

axios.defaults.baseURL = window.location.hostname == "localhost"? "http://localhost:5000": window.location.origin;
axios.defaults.headers.common = {...axios.defaults.headers.common, ...JSON.parse(localStorage.getItem("jwt"))}

function App() {
  return <Router>
    <ProtectedRoute path="/" exact component={Landing} />
    <ProtectedRoute path="/conf" component={VideoPage} />
    <Route path="/signin" exact component={Signin} />
    <Route path="/signup" exact component={SignUp} />
  </Router>;
}

export default App;
