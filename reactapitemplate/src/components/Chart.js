import React, {Component} from 'react'
import {XYPlot, XAxis, YAxis, VerticalGridLines,HorizontalGridLines, LineSeries} from 'react-vis'

function Chart(props){


    const dataArr = props.data.map((d,index) => {
      //console.log(index);
        console.log((new Date(Date.parse(d.observationTS)).getHours()) +":" + (new Date(Date.parse(d.observationTS)).getMinutes()) + ":" + (new Date(Date.parse(d.observationTS)).getSeconds()))
      if (d.value == 'On' || d.value == 'true')
      {
        return {x: ((new Date(Date.parse(d.observationTS)).getHours()) +":"
        + (new Date(Date.parse(d.observationTS)).getMinutes()) + ":"
        + (new Date(Date.parse(d.observationTS)).getSeconds())),
        y:1 }
      }
      else if( d.value == 'Off' || d.value == 'false')
      {
        return {x: ((new Date(Date.parse(d.observationTS)).getHours()) +":"
        + (new Date(Date.parse(d.observationTS)).getMinutes()) + ":"
        + (new Date(Date.parse(d.observationTS)).getSeconds())), y:0 }
      }
      else {
        return {x: ((new Date(Date.parse(d.observationTS)).getHours()) +":"
        + (new Date(Date.parse(d.observationTS)).getMinutes()) + ":"
        + (new Date(Date.parse(d.observationTS)).getSeconds())), y: d.value }
      }
    });
    var shortened = [];
    for(var i = 1; i <= dataArr.length-1; i++)
    {

      if(Math.round(dataArr[i].y) != Math.round(dataArr[i-1].y))
        shortened.push(dataArr[i]);
    }
    console.log(shortened);
    if(dataArr.length > 5)
    {
      return(
        <div className="chart">
          <XYPlot
            xType="ordinal"
            width ={dataArr.length}
            height={500}>
            <VerticalGridLines />
            <HorizontalGridLines/>
            <XAxis title="Time"/>
            <YAxis title="Value"/>
            <LineSeries
              data={shortened}
              style={{stroke: 'red', strokeWidth:3}} />
            </XYPlot>
        </div>
      )
    }
    else{
      return(
        <div className="chart">
          <p>No Data to be displayed</p>
        </div>
      )

    }

    function changeTime(x)
    {
      var hour = x.getHours();
      var minute = x.getMinutes();
      var str = "" + hour + ":" + minute
      return str;
    }

}


/*class Chart extends Component{

  constructor(){
    super()
    this.state = {
      data : []
    }
    this.dataArr = [];

  }
  componentWillMount(){
    console.log(this.props.data);
  }
  componentDidMount(){
    console.log("Chart Component did mount");
    console.log(this.props.data);
    this.dataArr = this.props.data.map((d) => {
      return  {x: d.observationTS, y:d.value }
    });
    this.setState({data:this.dataArr});
    console.log(this.dataArr);
  }

  render(){
    if(this.state.data.length > 1)
    {
      return(
        <div className="chart">
          <XYPlot
            xType="ordinal"
            width ={500}
            height={500} />
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Time"/>
            <YAxis title="Value"/>
            <LineSeries
              data={this.dataArr}
              style={{stroke: 'red', strokeWidth:3}} />
        </div>
      )
    }
    else{
      return(
        <div className="chart">
          <p>No Data to be displayed</p>
        </div>
      )
    }
  }
}*/

export default Chart
