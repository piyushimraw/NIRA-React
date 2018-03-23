import {Line} from "react-chartjs-2";
import React, { Component } from 'react';

import SampleStore from '../../../stores/SamplesStore';
import * as LineChartActions from '../../../actions/lineChartActions';


export default class LineChart extends Component {
    constructor() {
        super();
        this.state  = {
            timeLabels: [],
            data: [],
            riverName:""
        };
    }

    componentWillMount(){
        SampleStore.on('change', ()=> {
          this.setState({
            timeLabels: SampleStore.getAll().map( sample => sample.Time_Of_Sample),
            data: SampleStore.getAll().map(sample => sample.Total_Water_Quality_Index),
            riverName: SampleStore.getAll()[0].River
          });
        });
      }

      handleElementClick = (elem) => {

            //Exception Check for in between click of line
          if(!(elem.length === undefined || elem.length == 0))
           {     
               LineChartActions.sendDataToPieChart(elem[0]._index); 
            
            }
      }

      render (){
        const data = {
            labels: this.state.timeLabels,
            datasets: [
              {
                label: `${this.state.riverName} Water Quality Over Time`,
                maintainAspectRatio	: true,
                fill: false,
                lineTension: 0.2,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.data
              }
            ]
          };
          return (
              <div>
                 <Line data={data} onElementsClick={this.handleElementClick}/>
              </div>
          );
      }


}
