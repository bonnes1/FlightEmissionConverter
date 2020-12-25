import React, { Component } from 'react'
import travels from './travels'
import {OpenStreetMapProvider,GeoSearchControl} from 'leaflet-geosearch';
import BarChart from './BarChart.js'

import housewWithCabel from '../Resources/houseWithCabel.png';
import kettle from '../Resources/kettel.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

class DestinationHandle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departure: '',
            arrival:'',
            isReturnTrip:true,
            emissions:'',
            text:' ',
            submitted:'hidden',
            noTrip:'hidden'
        };

        this.handleChangeDeparture = this.handleChangeDeparture.bind(this);
        this.handleChangeArrival = this.handleChangeArrival.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleChangeEmission = this.handleChangeEmission.bind(this);
        //this.handleGeoLocation = this.handleGeoLocation.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.toggleFlip = this.toggleFlip.bind(this);
        this.carbonBudgetComparison = this.carbonBudgetComparison.bind(this);
        this.householdComparison = this.householdComparison.bind(this);
        this.boilingWaterComparison = this.boilingWaterComparison.bind(this);
    }

    handleClick = e => {
        e.preventDefault();
        this.setState(prevState => ({isFlipped:!prevState.isFlipped}))
    }
    handleChangeDeparture = e => {
            let input = e.target.value;
            this.setState({departure: input})
    }

    handleChangeArrival = e => {
            let input = e.target.value;
            this.setState({arrival: input})
    }
    handleCheckBox = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleChangeEmission = emissions => {
        let emissionText = `${"Your CO₂ emissions of this flight are " +emissions +" kg." }`;
        let length  = emissionText.trim().split(/\s+/).length;

        if(emissions % 1 === 0 ) {
            this.setState({emissions:emissions})
        }
        else {
            this.setState({emissions:"No trips found."})
        }
    }

    handleGeoLocation = async e => {
        //Started with leaflet in order to have access a geo location instead of having set trips.
        //Unfortunately I struggled with the API a bit with fetching errors and did not have time to investigate further.
        let arrPos;
        let depPos
        const provider = new OpenStreetMapProvider();
        await provider.search({query:this.state.departure}).then((dep) => {
            console.log(dep)
                /*for (let i = 0; i < dep.length; i++) {
                    console.log(dep[i].x)
                    console.log(dep[i].y)
                    console.log(dep[i].label)
                }*/
            depPos = dep;
        });
        await provider.search({query:this.state.arrival}).then(arr => {
                console.log(arr)
            arrPos = arr;
        });
        return {depPos,arrPos}
    }

    handleSubmit = e => {
        e.preventDefault();

        let FEMFactor = 0.136; //FlightEmissionMap factor
        let foundTrip = false;
        for(let i=0; i<travels.length; i++) {
            if (((this.state.departure.toLowerCase() === travels[i].departure.toLowerCase()) &&
                (this.state.arrival.toLowerCase() === travels[i].arrival.toLowerCase()) ||
                ((this.state.departure.toLowerCase() === travels[i].arrival.toLowerCase()) &&
                    (this.state.arrival.toLowerCase() === travels[i].departure.toLowerCase())))) {
                let distance = travels[i].distance;
                let returnTrip = this.state.isReturnTrip ? 2 : 1;
                let emissions = Math.round(distance * returnTrip * FEMFactor);
                this.handleChangeEmission(emissions);
                foundTrip = true;

                this.setState({noTrip:"hidden",submitted:'show'});
            }
        }
        if(!foundTrip){
            this.handleChangeEmission("No trips found")
            this.setState({noTrip:'show',submitted:'hidden'});
        }
    };

    toggleFlip = (e, index) => {
        e.preventDefault();
        let box = '';
        if (index === 1) {
            box = '.flip-box-inner'
        }
        if (index === 2) {
            box = '.flip-box-inner-second'
        }
        if (index === 3) {
            box = '.flip-box-inner-third'
        }
        let flipBox = document.querySelector(box);
        flipBox.classList.toggle('is-flipped')
    };

    carbonBudgetComparison = () => {
        let carbonBudgetPercentage = ((this.state.emissions/2000.0)*100).toFixed(2);
        return (
            <div className="flip-box-inner" onClick={(e,index) =>{index = 1;this.toggleFlip(e,index)}}>
                <div className="box-face box-face--front">
                    <div>
                        <p style={{fontSize:"20px",paddingRight:"30%", paddingTop:"5%"}}>This is equivalent to: </p>
                        <div style={{fontSize:"30px",paddingLeft:"20%",fontWeight:"bold"}}>
                            {carbonBudgetPercentage + "%"}
                        </div>
                        <div style={{width:"50%",paddingLeft:"35%"}}>
                            of an individual's yearly carbon budget following the Paris Agreement.
                        </div>
                        <BarChart className={'emissionBar'} data={ [this.state.emissions]} size={[100,100]}/>
                    </div>
                </div>
                <div className="box-face box-face--back">
                    <div>
                        In the Paris Agreement of 2015, 196 countries pledged to limit global warming to below 2°C.
                        In order to do so it has been calculated that every individual’s yearly carbon emissions need to
                        be limited to 2000kg by 2050. This is known as carbon budget.
                    </div>
                </div>
            </div>)};

    householdComparison = () => {
        let householdEmission = Math.round((this.state.emissions/1800)*365);
        return (
            <div className="flip-box-inner-second" onClick={(e,index) =>{index = 2;this.toggleFlip(e,index)}}>
                <div className="box-face-second box-face-second--front">
                    <div>
                        <p style={{fontSize:"20px",paddingRight:"30%", paddingTop:"5%"}}>To offset the flight,</p>
                        <div style={{width:"60%",paddingRight:"5%",float:"right"}}>you would need to sit in the dark and cold, eat raw food and use no electronic device for</div>
                        <div style={{fontSize:"30px",paddingRight:"15%",fontWeight:"bold",float:"right"}}>{householdEmission + " days"}</div>
                        <div id={"householdImage"}><img  src={housewWithCabel} alt={"Household icon"}/></div>
                    </div>
                </div>
                <div className="box-face-second box-face-second--back">
                    <div>
                        The emissions of the electricity used by one average Swedish household each year sum up to
                        roughly 1800 kg CO₂. That includes emissions from heating, cooking, cooling, washing,
                        appliances and electronic devices.
                    </div>
                </div>
            </div>)};

    boilingWaterComparison = () => {
        let boilingWater = Math.round((this.state.emissions/0.094)/365);
        return(
            <div className="flip-box-inner-third" onClick={(e,index) =>{index = 3;this.toggleFlip(e,index)}}>
                <div className="box-face-third box-face-third--front">
                    <div>
                        <p style={{fontSize:"20px",paddingRight:"20%", paddingTop:"5%"}}>For the same emissions</p>
                        <div style={{width:"60%",paddingRight:"5%",float:"right"}}>
                            you could boil 1 liter of water twice a day for
                        </div>
                        <div style={{fontSize:"30px",paddingRight:"20%",fontWeight:"bold",float:"right"}}>{boilingWater + " years"}</div>
                        <div id={"kettleImage"}><img src={kettle} alt={"Kettle icon"}/></div>
                    </div>
                </div>
                <div className="box-face-third box-face-third--back">
                    <div>
                        Boiling one liter of water in a standard kettle consumes comparatively little energy and results
                        in emissions of 0,047 kg of CO2 per boiling.
                    </div>
                </div>
            </div>)};


    render() {
        //this.handleGeoLocation().then(r => { console.log(r)});
        return(
            <div>
                <form className={'container'} onSubmit={this.handleSubmit}>
                    <label className={'returnTrip'}>
                        Return trip:
                        <input
                        name="isReturnTrip"
                        type="checkbox"
                        checked={this.state.isReturnTrip}
                        onChange={this.handleCheckBox}/>
                    </label>
                    <label className={'departure'}>
                        <input type={"text"} value={this.state.departure} placeholder={"Stockholm"} onChange={this.handleChangeDeparture}/>
                    </label>
                    <label id={"arrow"}><FontAwesomeIcon icon={faLongArrowAltRight}/></label>
                    <label className={'arrival'}>
                        <input type={"text"} value={this.state.arrival} placeholder={"New York"} onChange={this.handleChangeArrival}/>
                    </label>
                    <input className={'submit'} type={"submit"} value={"Calculate"} />
                </form>

                <div className={`emissionsSentence ${this.state.submitted}`}>
                    <div  style={{fontSize:"20px"}}>Your CO₂ emissions of this flight are <b style={{fontSize:"30px"}}>{this.state.emissions} kg.</b></div>
                </div>
                <div className={`emissionsSentence ${this.state.noTrip}`}>
                    <div style={{fontSize:"20px"}}>No trips Found.</div>
                </div>
                    <div className={'items' + ` ${this.state.submitted}`}>
                        <div className="flip-box" onChange={this.handleChangeEmission}>
                            {this.carbonBudgetComparison()}
                        </div>
                        <div className="flip-box" onChange={this.handleChangeEmission}>
                            {this.householdComparison()}
                        </div>
                        <div className="flip-box" onChange={this.handleChangeEmission}>
                            {this.boilingWaterComparison()}
                        </div>
                    </div>
                {/*<MyMap/>*/}
            </div>

        )
    }


}
export default DestinationHandle;
