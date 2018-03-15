import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';


class PieChart extends Component {

    state = {
        data : []
    }


    componentWillMount = ()=> {
        console.log(this.props.rawData);
    }

    render(){
        console.log(this.props.rawData);
        return(
            <div className="chart">
                Chart Component
            </div>
        );
    }
}

export default PieChart;