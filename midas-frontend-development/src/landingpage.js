import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import ProfilePage from "./components/Profile-Page";
import News from "./components/News";
import Navbar from "./components/CustomNavbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Signout from "./components/Signout";
import Login from "./components/Login";
import StockInfo from './components/StockInfo';
import Leaderboards from './components/Leaderboards';
import getStockInfo from './helpers/interactions/iex_interactions';
import './styles/style.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      searchedTicker: null,
      isLoading: true,
      stockData: null
    }
  }

  componentWillMount(){
    //check if user is already logged in session
    fetch("/api/auth")
      .then(response => {
          console.log(response);
          return response.json();
      })
      .then(data => {
          this.setState({user: data, isLoading: false});
          console.log("hi pat")
          console.log(data);
      })
      .catch(error => {
        setTimeout(() => {
          this.setState({isLoading: false})
        }, 3000)
        
          console.log(error);
      })
  }

  getUserData(user){
    this.setState({user: user});
  }

  getSearchedTicker(ticker){
    this.setState({searchedTicker: ticker});
  }

  async getStockData(ticker){
    let stockData = getStockInfo(ticker);
    this.setState({stockData: stockData});
  }

  resetUserData(){
    this.setState({user: null});
  }

  reset(){
    this.forceUpdate()
  }

  render(){
    console.log(this.state.user);
    return (
      
      <Router>
         
         { this.state.isLoading ? (
           <div>
              <div className="loader"></div>
              <p className="welcome-headline">Welcome to Midas</p>

           </div>
            
         ) : (
              
             <div>
                <Navbar user={this.state.user} forceUpdate={() => this.forceUpdate} getTicker={(ticker) => this.getSearchedTicker(ticker)}/>
                <Route exact path="/" render={() => <Home user={this.state.user} getUser={(user) => this.getUserData(user)} />} />
                {/* For the following view to render properly, pass key={props.location.key} to make the component re-render since the location changes if the user looks up a new stock*/}
                <Route path="/stocks/:ticker" render={(props) => <div class="container stockInfo-page">
                  <div className="page-left">
                    <StockInfo key={props.location.key} {...props} reset={() => this.reset()} getUser={(user) => this.getUserData(user)} ticker={this.state.searchedTicker} user={this.state.user} getUser={(user) => this.getUserData(user)} />
                  </div>
                  <div className="page-right"></div>
                </div>} />
                <Route path="/profile" render={() => <ProfilePage user={this.state.user} />} />
                <Route path="/signup" render={() => <Signup getUser={(user) => this.getUserData(user)}/>} />
                <Route path="/login" render={() => <Login getUser={(user) => this.getUserData(user)} />} />
                <Route path="/signout" render={() => <Signout resetUser={() => this.resetUserData()} />} />
                <Route path="/leaderboards" render={() => <Leaderboards />} />
                {/* <Footer /> */}
             </div>
         ) }
         
       
      </Router>
    );
  }
}


export default App;