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
		location: 'this state'
	}	

    render() {
        return (
            <div className="bar-graph center">
				<Bar
				  data={this.state.chartData}
				  options={{
					responsive: true,
					/* maintainAspectRatio: false, */
					title: {
						display:this.props.displayTitle,
						text: 'Largest Cities In ' +this.props.location,
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