import React, { Component } from 'react';
import './index.css';
import DateSelector from './components/DateSelector'
import Chart from './components/Chart'
import AbortController from "abort-controller"


class App extends Component {

  constructor(){

    super()
    this.tags = [];
    this.apiData = [];
    this.state = {
      data:[],
      tagId: '',
      startTime:'',
      endTime:'',
      Dates : ['11/15/2018','11/16/2018','11/17/2018','11/18/2018','11/19/2018','11/20/2018','11/21/2018','11/22/2018','11/23/2018','11/24/2018','11/25/2018','11/26/2018',
              '11/27/2018','11/28/2018','11/29/2018','11/30/2018','12/01/2018','12/02/2018','12/03/2018','12/04/2018','12/05/2018']
    }
    this.collectTagData = this.collectTagData.bind(this);
  }

componentDidMount(){
    fetch('http://cs-mock-timeseries-api.azurewebsites.net/Api/tag')
    .then(results => {
      return results.json();
    }).then(data => {
      data.map((arr) => {
        this.tags.push(arr);
    })
    this.setState({data:this.tags});
  })

}

collectTagData(tagId,startTS,endTS){
  this.apiData = [];
  const controller = new window.AbortController();
  const signal = controller.signal;
  window.fetch = window.fetch.bind(window)
  console.log('http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint/'+tagId+'?startTS='+startTS+'&endTS='+endTS);
  //http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint/tag1?startTS=11/15/2018&endTS=12/18/2018
  fetch('http://cs-mock-timeseries-api.azurewebsites.net/api/DataPoint/'+tagId+'?startTS='+startTS+'&endTS='+endTS,{
    signal,
    headers: {
    'Content-Type': 'application/json'
  }
})
  .then(results => {
    return results.json();
  }).then(data => {
    data.map((arr) => {
      this.apiData.push(arr);
  })
  this.setState({data:this.apiData});
  })
  console.log(this.apiData);
}


componentWillUnmount(){
  controller.abort()
}
  render() {
    return (
      <div className="app">
        <DateSelector dates = {this.state.Dates} tags = {this.tags} searchAPI = {this.collectTagData} chartResults = {this.state.data}/>

      </div>
    );
  }
}

export default App;
