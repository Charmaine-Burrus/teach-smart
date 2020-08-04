import React, { Component } from 'react';
import BarGraph from './charts/BarGraph';
import {Button, Form} from 'react-bootstrap';
import style from './analysis.css';

class Analysis extends Component {
    constructor(){
        super();
        this.state = {
          assignments: [],
          assignmentSelected : '',
          chartData:{}
        }
      }

      componentWillMount(){
         this.getChartData();
         //getAssessmentsForUser
       }

       getChartData(){
        // Ajax calls here
        this.setState({
          chartData:{
            labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
            datasets:[
              {
                label:'Population',
                data:[
                  617594,
                  181045,
                  153060,
                  106519,
                  105162,
                  95072
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
        return (
            <div className="analysis">
                
                <div className="container-fluid analysis-teacher-input padding">
                  <h3 className="thick-text-white">Assignment Analysis</h3>
                  <Form>
                    <div className="padding">
                      <select className="form-control" value={this.state.assignmentSelected} onChange={this.handleChange}>
                      <option value="" disabled>Choose from your Assignments</option>
                      {/* TODO: get rid of this */}
                      <option value="">{localStorage.getItem("assignmentFromDatabase")}</option>
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
                    <h3 className="padding">Here I populate results.. this div only appears if assessment is not null</h3>
                    
                    <div className="row center padding">
                        <div className="col-md-6 center">
                          <BarGraph chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>
                        </div>
                        <div className="col-md-6 center">
                          <BarGraph chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>
                        </div>
                    </div>

                    <div className="row center padding">
                        <div className="col-md-6 center">
                          <BarGraph chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>
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
                    
                </div> 
            </div>
        );
    }
}

export default Analysis;