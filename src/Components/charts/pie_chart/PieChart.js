import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

import SampleStore from '../../../stores/SamplesStore';



class PieChart extends Component {

    constructor() {
        super();
        this.state = {
            pieLabels: ["Sodium", "Chloride", "Potasium", 
                        "Calcium", "Manganese","Magnesium", 
                        "Lead", "Mercury", "Arsenic", "Oxygen"],
            pieData: []
        }
    }

    componentWillMount(){
        SampleStore.on('pieDataChange', ()=>{
            this.setState({
                pieData: Object.values(SampleStore.getPieData()),
            });
        });
    }

    render(){
        const data = {
            labels: this.state.pieLabels,
            datasets: [{
                data: this.state.pieData,
                backgroundColor: [
                '#FF6384', //sodium
                '#36A2EB', //chloride
                '#FF6384', //potasium
                '#36A2EB', //calcium
                '#FF6384',
                '#36A2EB',
                '#FF6384',
                '#36A2EB',
                '#36A2EB',
                '#FFCE56' //oxygen
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FF6384',
                    '#36A2EB',
                    '#FF6384',
                    '#36A2EB',
                    '#FF6384',
                    '#36A2EB',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };
        

        return(
            <div> 
                <Doughnut data={data} />
            </div>
        );
    }

}
export default PieChart;