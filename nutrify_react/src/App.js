import logo from './logo.svg';
import './App.css';
import {Route,Switch} from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Update from './components/Update';
import Display from './components/Display';
import AdminListUsers from './components/AdminListUsers';
import AdminListMeals from './components/AdminListMeals';
import Addmeal from './components/Addmeal';
import AdminLogin from './components/AdminLogin';
function App() {
  return (
    <>
 
    <Switch>
     <Route exact path = "/" component = {Login} />
     <Route exact path = "/header" component = {Header} />
     <Route exact path = "/signup" component = {Signup} />
     <Route exact path = "/addmeal" component = {Addmeal} />
     <Route exact path = "/update:id" component = {Update} />
     <Route exact path = "/display:id" component = {Display} />
     <Route exact path = "/adminlogin" component = {AdminLogin} />
     <Route exact path = "/adminlistusers" component={AdminListUsers} />
     <Route exact path = "/adminlistmeals:name" component={AdminListMeals} />
     </Switch>
    </>
  );
}

export default App;
