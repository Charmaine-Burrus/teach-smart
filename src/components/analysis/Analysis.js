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
          chartData1:{},
          chartData2:{},
          chartData3:{},
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
       chartData1:{
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
       },

       chartData2:{
        labels: ['1st Hr', '2nd Hr', '4th Hr', '7th Hr', '8th Hr'],
        datasets:[
          {
            label:'Average Score',
            data:[
              70,
              82,
              78,
              89,
              85
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
      },

      chartData3:{
        labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        datasets:[
          {
            label:'Percentage of Scores',
            data:[
              71,
              85,
              92,
              63,
              51, 98, 57, 63, 88, 92, 95, 61, 75, 77, 91, 53, 68, 71, 93, 98
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)'
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
              <PieChart chartData={this.state.chartData1} title="Scores by Letter Grade" legendPosition="left"/>
            </div>
            <div className="col-md-6 center">
              <BarGraph chartData={this.state.chartData2} title="Average Score by Hour" legendPosition="right" yAxisMin="50" yAxisMax="100"/>
            </div>
          </div>

          <div className="row center padding">
            <div className="col-md-6 center">
              <BarGraph chartData={this.state.chartData3} title="Overall Scores" legendPosition="bottom"/>
              <div className="container-fluid analysis-teacher-input">
                <h4>Results:</h4>
                <p>Highest Scoring Class: 4th Hr</p>
                <p>Top-Scoring Students: Fatima, Avion, Melissa</p>
                <p>Average: 79%</p>
                <p>Highest Score: 98%</p>
                <p>Lowest Score: 51%</p>
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