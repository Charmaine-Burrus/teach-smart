import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class BarGraph extends Component {

    constructor(props){
		super(props);
		this.state = {
			chartData: props.chartData
		}
    }
    
    //setting default values for props (they can still be passed in & override these)
	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'right',
		title: 'The Lastest Graph',
	}	

    render() {
        return (
            <div className="bar-graph center">
				<Bar
				  data={this.state.chartData}
				  options={{
					scales: {
						yAxes: [{
							ticks: {
								// beginAtZero: true
								min: 30, 
								max: 100
							}
						}]
					},
					responsive: true,
					/* maintainAspectRatio: false, */
					title: {
						display:this.props.displayTitle,
						text: this.props.title,
						fontSize:25
					},
					legend: {
						display: this.props.displayLegend,
						position: this.props.legendPosition
					}
				  }}
				/>
			</div>

        );
    }
}

export default BarGraph;