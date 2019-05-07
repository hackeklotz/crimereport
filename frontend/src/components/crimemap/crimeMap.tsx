import * as React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import { ICrime, IStoreState } from 'components/types';

export interface IProps {
    crimes: ICrime[];
}

export function CrimeMap({ crimes }: IProps) {
    const position: [number, number] = [51.049259, 13.73836]
    
    const crimeList = crimes
        .filter((crime) =>
            crime.coordinate != null
        )
        .map((crime) =>
            <Marker position={crime.coordinate} key={crime.id}>
                <Popup>{crime.title}</Popup>
            </Marker>
        )

    return (
        <Map center={position} zoom={13} className='crime-map'>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {crimeList}
        </Map>
    );
}


// container
function mapStateToProps({ crimes }: IStoreState) {
    return {
        crimes,
    }
}

export default connect(mapStateToProps, null)(CrimeMap);