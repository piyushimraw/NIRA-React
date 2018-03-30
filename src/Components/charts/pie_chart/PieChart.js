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
                '#FBFF11', //sodium
                '#F92AFC', //chloride
                '#C717CA', //potasium
                '#ECEAEC', //calcium
                '#2DEB27',
                '#27EBE2',
                '#411FE8',
                '#F70690',
                '#F7AA06',
                '#06CFF7' //oxygen
                ],
                hoverBackgroundColor: [
                  '#FBFF11', //sodium
                  '#F92AFC', //chloride
                  '#C717CA', //potasium
                  '#ECEAEC', //calcium
                  '#2DEB27',
                  '#27EBE2',
                  '#411FE8',
                  '#F70690',
                  '#F7AA06',
                  '#06CFF7' //oxygen
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
