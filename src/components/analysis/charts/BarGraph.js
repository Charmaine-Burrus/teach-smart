import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class BarGraph extends Component {

    constructor(props){
		super(props);
		this.state = {
			chartData: props.chartData
		}
    }
    
	static defaultProps = {
		displayTitle: true,
		displayLegend: true,
		legendPosition: 'right',
		title: '',
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
								min: 30, 
								max: 100
							}
						}]
					},
					responsive: true,
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