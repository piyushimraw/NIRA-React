import Alert from './alert';
import OptimalRange from '../../stores/Optimal_Range';
import React, { Component } from 'react';
import SampleStore from '../../stores/SamplesStore';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';


import './info_card.css';

export default class InfoCard extends Component{
    constructor(){
        super()
        this.state = {
            info: [],
            parameters: ["Disolved_Oxygen", "pH", 
                        "Sodium","Chloride","Calcium", 
                        "lead", "mercury","Arsenic"],
            monitorLevel: {},
        }

    }

    componentWillMount(){
        SampleStore.on('changeInfo', ()=> {
            this.setState({
                info: SampleStore.getInfoData(),
                monitorLevel: {
                    Disolved_Oxygen: SampleStore.getInfoData()[0].Water_Quality_Indicators.Disolved_Oxygen,
                    pH: SampleStore.getInfoData()[0].Water_Quality_Indicators.pH,
                    Sodium: SampleStore.getInfoData()[0].Water_Quality_Indicators.Dissolved_Metals_and_Salts.Sodium,
                    Chloride: SampleStore.getInfoData()[0].Water_Quality_Indicators.Dissolved_Metals_and_Salts.Chloride,
                    Calcium: SampleStore.getInfoData()[0].Water_Quality_Indicators.Dissolved_Metals_and_Salts.Calcium,
                    lead: SampleStore.getInfoData()[0].Water_Quality_Indicators.Dissolved_Metals_and_Salts.lead,
                    mercury: SampleStore.getInfoData()[0].Water_Quality_Indicators.Dissolved_Metals_and_Salts.mercury,
                    Arsenic: SampleStore.getInfoData()[0].Water_Quality_Indicators.Dissolved_Metals_and_Salts.Arsenic,
                }

            });
        });
    }
    // criticalLevels = () => {
    //     const

    // }

    render(){
        console.log(this.state.monitorLevel);
        const info = this.state.info.map(info => {
            return  <Panel bsStyle="primary">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Sample Taken at {info.State}, 
                                        District {info.District} on <em>{info.Time_Of_Sample}</em>
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className={"info_body"}>
                            <ListGroup>
                                <ListGroupItem header="River">{info.River}</ListGroupItem>  
                                <ListGroupItem header="Temprature of Sample">{info.Temprature}</ListGroupItem>
                                <ListGroupItem header="Color of Sample">{info.Water_Quality_Indicators.Color_of_water}</ListGroupItem>           
                            </ListGroup>
                            <Alert  monitorLevel = {this.state.monitorLevel}
                                    parameters = {this.state.parameters}
                            />
                        </Panel.Body>
                    </Panel>
        });
        return (
            <div>
              {info}
            </div>
        );
    }
}