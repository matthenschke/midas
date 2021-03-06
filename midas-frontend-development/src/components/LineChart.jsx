import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class LineChart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData: null
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: false,
    legendPosition:'right',
    stockName:'NULL'
  }

  componentWillMount(){
      this.setState({
        chartData: this.props.chartData
      })
      console.log("%cChart Data","color:blue");
      console.log(this.state.chartData);
  }

  render(){
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            // title:{
            //   display:this.props.displayTitle,
            //   text:'Price of '+this.props.stockName.toUpperCase(),
            //   fontSize:25
            // },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}
export default LineChart;