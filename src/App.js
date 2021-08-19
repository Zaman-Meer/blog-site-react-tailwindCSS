import "./App.css";
import React,{useState,useContext} from "react";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import { Context } from "./context/Context";
import Home from "./pages/home/Home";
import Posts from "./pages/posts/Posts";
import Post from "./pages/post/Post"
import Create from "./pages/create/Create";
import Profile from "./pages/profile/Profile";
import TopNavBar from "./components/header/TopNavBar";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Register from './pages/register/Register';
import About from "./pages/about/About";
import EmailConfirmPage from './pages/register/EmailConfirmPage';
import SideNavBar from "./components/header/SideNavBar";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import ResetPassword from "./pages/forgetPassword/ResetPassword";
const  App=()=> {
  const { user} = useContext(Context);
  const [toggleNarBar,SetToggleNaveBar]=useState(false);
  const handleToggleNavBar=()=>{
    SetToggleNaveBar(!toggleNarBar);
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/register/confirm/:code" >
        {user?.accessToken? <Redirect  to="/" /> : <EmailConfirmPage />} 
        </Route>
        <Route exact path="/password-reset/:code" >
        {user?.accessToken? <Redirect  to="/" /> : <ResetPassword />} 
        </Route>
      <div>
      <TopNavBar showSideBar={handleToggleNavBar} />
      <div className="w-full h-12 block" ></div>
      {toggleNarBar&&<div className="block md:hidden"><SideNavBar closeSideBar={handleToggleNavBar}/></div> }
            <div>
        <Route exact path="/login">
        {user?.accessToken?<Redirect  to="/" /> :<Login />}
          
        </Route>
        <Route exact path="/register">
        {user?.accessToken?<Redirect  to="/" /> :<Register />}
          
        </Route>
        <Route exact path="/password-forgot">
        {user?.accessToken?<Redirect  to="/" /> :<ForgetPassword />} 
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/posts/:category">
          <Posts />
        </Route>
        <Route exact path="/posts/author/:id">
          <Posts />
        </Route>

        <Route exact path="/post/:id">
          <Post />
        </Route>
        <Route exact path="/authors/:id">
          <Posts />
        </Route>
        <Route exact path="/create">
        {user?.accessToken? <Create />:<Redirect  to="/" />} 
        </Route>        <Route exact path="/edit/:id">
        {user?.accessToken? <Create />:<Redirect  to="/" />} 
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/profile">
         {user?.accessToken? <Profile />:<Redirect to="/" />}
        </Route>
            </div>
            <Footer />
      </div>
      
      </Switch>  
    </Router>
  );
}

export default App;
