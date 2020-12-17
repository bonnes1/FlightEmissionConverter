import React from 'react'
import './App.css'
import DestinationHandle from "./Components/DestinationHandle";
import {TileLayer,latLng,Marker,Popup,L} from "leaflet";
import 'leaflet/dist/leaflet.css';


import Footer from "./Components/Footer";

function App() {
    return (
        <div className={'body'} >
                <div className='App-header' >
                    <h2>Flight Emission Converter</h2>
                    <div className={'description'}>
                        CO₂ emissions are one of the most serious drivers of global warming. Emitted into the atmosphere,
                        CO₂ reflects the heat emitted by the earth’s surface and bounces it back to lower atmospheric layers.
                        Flying, as all other combustion of fossil fuel, contributes to the emission of carbon.
                        In fact, if the world’s air travel was a country, it would take the place 6 of the biggest carbon emitters.
                        But how is your individual flight connected to these numbers? This calculator is a tool to better
                        understand the environmental impact of your flight. It breaks up the emissions of your flight and
                        compares them to something that is better understandable and closer at heart.
                    </div>
                </div>
            <div style={{marginTop:"-3%"}}>
                <DestinationHandle/>
            </div>

            <Footer/>
            {/*<MyMap className={'leaflet-container'}/>*/}

        </div>
    )

}
export default App

/*class App extends Component {
    render() {
        return (
            <div className='App'>
            <div className='App-header'>
            <h2>Flight Emission Converter</h2>
        </div>
        <div/>
        <div className={"world"}>
            {<BarChart data={[5,10,1,3]} size={[500,500]} />}
<WorldMap/>
</div>
</div>
)
}
}
export default App*/
