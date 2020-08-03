import React, { Component } from 'react';
import BarGraph from './charts/BarGraph';

class Analysis extends Component {
    constructor(){
        super();
        this.state = {
          chartData:{}
        }
      }

      componentWillMount(){
         this.getChartData();
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
            <div>
                <h3>Analysis Page coming soon</h3>
                <p>This is where I'll put teacher input</p>
                <div>
                    <p>Here I populate results.. this div only appears if assessment is not null</p>
                    <p>Could have tables... https://react-bootstrap.github.io/components/table/</p>
                    <BarGraph chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom"/>
                </div> 
            </div>
        );
    }
}

export default Analysis;