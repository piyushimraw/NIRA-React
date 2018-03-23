import React, { Component } from 'react';
import {Alert, Button} from 'react-bootstrap';
import { List } from 'react-virtualized';
import OptimalRange from '../../stores/Optimal_Range';

function AssignWorker(props){
    const alertLength = props.alertLength;
    if(alertLength>0){
        return <Button bsStyle="primary" bsSize="large" block>
                Assign A Worker
                </Button>
    }
    else {
        return <span></span>
    }
}

const alert =  (props) => (
    props.parameters.map(parameter => {
        if(props.monitorLevel[parameter]<OptimalRange[parameter].min || props.monitorLevel[parameter]>OptimalRange[parameter].max)
          return <Alert bsStyle="danger">
                    <strong>{parameter}</strong> is not  in Optimal Range.
                </Alert>
    } )
    
)

export default class AlertMessage extends Component{
    constructor(){
        super()
        this.state = {
            alertList :  [],
        }
    }

     rowRenderer ({
        key,         // Unique key within array of rows
        index,       // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        style        // Style object to be applied to row (to position it)
      }) {
        return (
          <div
            key={key}
            style={style}
          >
            {this.state.alertList[index]}
          </div>
        )
      }

      componentDidMount(){
          this.setState({
              alertList: alert(this.props),
          })
      }

    render(){
        return (
        <div>
            <List
             width={420}
            height={100}
            rowCount={this.state.alertList.length}
            rowHeight={50}
            rowRenderer={this.rowRenderer.bind((this))}
         />
         <AssignWorker alertLength={this.state.alertList.length}/>
        </div>
        
        );
    }

}





