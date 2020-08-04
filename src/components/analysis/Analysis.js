import React, { Component } from 'react';
import BarGraph from './charts/BarGraph';
import {Button, Form} from 'react-bootstrap';
import style from './analysis.css';
import PieChart from './charts/PieChart';

class Analysis extends Component {
    constructor(){
        super();
        this.state = {
          assignments: [],
          assignmentSelected : '',
          chartData:{},
          chartReady: false
        }
      }

    componentWillMount(){
       //getAssignmentsForUser and set states.assignments
    }

    handleChange = (event) => {
      const value = event.target.value;
      this.setState({assignmentSelected: value});
      console.log(this.state.assignmentSelected);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      //call backend to get chartData for assessment w/ this name
      //can't get chartData until they select an assessment 
      this.getChartData();
      //after response.. populate chartReady to render chartBelow
      this.setState({chartReady: true});
    }

    getChartData(){
     // Ajax calls here
     this.setState({
       chartData:{
         labels: ['A', 'B', 'C', 'D', 'F'],
         datasets:[
           {
             label:'Percentage of Scores',
             data:[
               15,
               30,
               25,
               20,
               10
             ],
             backgroundColor:[
               'rgba(255, 99, 132, 0.6)',
               'rgba(54, 162, 235, 0.6)',
               'rgba(255, 206, 86, 0.6)',
               'rgba(75, 192, 192, 0.6)',
               'rgba(153, 102, 255, 0.6)',
               'rgba(255, 159, 64, 0.6)',
               'rgba(255, 99, 132, 0.6)'
             ]
           }
         ]
       }
     });
    }

    render() {

      const chartReady = this.state.chartReady;
      let results;
      if (chartReady) {
        results = 
        <div>
          <div className="row center padding">
            <div className="col-md-6 center">
              <PieChart chartData={this.state.chartData} title="Scores by Letter Grade" legendPosition="left"/>
            </div>
            <div className="col-md-6 center">
              <BarGraph chartData={this.state.chartData} title="Average Score by Hour" legendPosition="right"/>
            </div>
          </div>

          <div className="row center padding">
            <div className="col-md-6 center">
              <BarGraph chartData={this.state.chartData} title="Overall Scores" legendPosition="bottom"/>
              <div className="container-fluid analysis-teacher-input">
                <h4>Results</h4>
                <p>Blah</p>
                <p>Blah</p>
                <p>Blah</p>
                <p>Blah</p>
                <p>Blah</p><p>Blah</p>
              </div>
            </div>
          </div>
        </div>;
      } else {
        results = 
        <div>
          <h3 className="padding">Assignment Results:</h3>
        </div>;
      }

        return (
            <div className="analysis">
                
                <div className="container-fluid analysis-teacher-input padding">
                  <h3 className="thick-text-white">Assignment Analysis</h3>
                  <Form>
                    <div className="padding">
                      <select className="form-control" value={this.state.assignmentSelected} onChange={this.handleChange}>
                      <option value="" disabled>Choose from your Assignments</option>
                      {/* TODO: get rid of this */}
                      <option value={localStorage.getItem("assignmentFromDatabase")}>{localStorage.getItem("assignmentFromDatabase")}</option>
                      {/* {this.state.courses.map((course, index) =>
                      <option key={index} value={course.id}>{course.name}</option>
                      )} */}
                    </select>
                    </div>
                    <div className="padding">
                      <Button variant="primary" onClick={(e) => this.handleSubmit(e)}> Add</Button>
                    </div>
                  </Form>
                </div>

                <div className="container-fluid padding">
                    
                    {results}
                    
                </div> 
            </div>
        );
    }
}

export default Analysis;