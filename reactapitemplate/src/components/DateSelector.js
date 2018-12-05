import React, {Component} from 'react'
import Chart from './Chart'

class DateSelector extends Component{

constructor(){
  super()
  this.DateArr = [];
  this.tags = [];
  this.startTS = '';
  this.endTS = '';
  this.tagId = '';
  this.state = {
    startTS : '',
    endTS : '',
    tagId : ''
  }
  this.handleChangeStartTS = this.handleChangeStartTS.bind(this);
  this.handleChangeEndTS = this.handleChangeEndTS.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChangeTag = this.handleChangeTag.bind(this);
}

componentDidMount(){
  this.DateArr = this.props.dates
  this.tags = this.props.tags
}

handleChangeTag(e){
  this.tagId = e.target.value;
  this.setState({tagId:this.tagId})
  //console.log(this.tagId);
}

handleChangeStartTS(e){
  this.startTS = e.target.value;
  this.setState({startTS:this.startTS})
  //console.log(this.startTS);
}

handleChangeEndTS(e){
  this.endTS = e.target.value;
  this.setState({endTS:this.endTS})
  //console.log(this.endTS);
}

handleSubmit(e){
  e.preventDefault()
  console.log(this.state.tagId,this.state.startTS,this.state.endTS);
  console.log(this.state.startTS);
  console.log(this.state.endTS);
  this.props.searchAPI(this.tagId,this.startTS,this.endTS)
  /*this.setState({
    startTS:'',
    endTS:'',
    tagId:''
  })*/
}


render(){

  return(

    <div className="grid-container">
      <div className="tags">
        <select className="form-control"
            onChange={this.handleChangeTag} >
            <option value="">
                Select one...
            </option>
            {this.tags.map(obj => ( //this is how we can build a dynamic options for select
                <option key={obj.tagId} value={obj.tagId}>
                    {obj.label}
                </option>
            ))}
        </select>
      </div>
      <div className = "STS">
        <select className="StartTS"
          onChange={this.handleChangeStartTS} >
            <option value="">
                Select one...
            </option>
            {this.DateArr.map((start,index) => ( //this is how we can build a dynamic options for select
                <option key={index} value={start}>
                    {start}
                </option>
            ))}
        </select>
      </div>
      <div className="ETS">
        <select className="EndTS"
          onChange={this.handleChangeEndTS} >
            <option value="">
                Select one...
            </option>
            {this.DateArr.map((end,index) => ( //this is how we can build a dynamic options for select
                <option key={index} value={end}>
                    {end}
                </option>
            ))}
        </select>
      </div>
      <div className="btn-search">
        <button type="submit" onClick={this.handleSubmit}>Search</button>
      </div>

      <Chart data = {this.props.chartResults} />
    </div>

  )
}


}

export default DateSelector
