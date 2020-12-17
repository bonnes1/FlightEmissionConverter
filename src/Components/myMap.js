import React, { Component } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from 'leaflet';

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';

const MyMap = () => {
    return (
        <MapContainer center={[45.4, -75.7]} zoom={3}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );
}
export default MyMap;
{/*class MyMap extends Component {
    componentDidMount() {
        const map = this.map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);

        window.addEventListener("resize", () => {
            setTimeout(() => {
                // console.log("resize map: ", this.map)
                // map.invalidateSize
                this.map.invalidateSize()
            }, 500);
        });

        console.log(this.map)
    }
}
export default MyMap;*/}
