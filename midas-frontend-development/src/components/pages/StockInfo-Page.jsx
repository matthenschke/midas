import React, { Component } from 'react';
import StockInfo from '../StockInfo';
import Simulator from '../Simulator';
import Trade from '../Trade';
import TrendingNews from '../TrendingNews';


class StockInfoPage extends Component {
    constructor(props){
        super(props);
        this.state={};
    }

    render() { 
        console.log("%cTICKER","color: green");
        console.log(this.props.user);
        console.log(this.props.ticker);
        return ( 
            <div className="stockInfo-page container">
                <div className="page-left">
                    <Trade  getUser={(user) => this.props.getUser(user)} 
                            tickerData={this.props} 
                            user={this.props.user}/>
                </div>

                <div className="page-main">
                    <StockInfo  key={this.props.key} {...this.props}  
                                getUser={(user) => this.props.getUserData(user)} 
                                ticker={this.props.ticker} 
                                user={this.props.user}  />

                    <TrendingNews ticker={this.props.ticker} />
                </div>

                <div className="page-right">
                    <Simulator userId={this.props.user.id} />    
                </div>
            </div>
         );
    }
}
 

export default StockInfoPage;