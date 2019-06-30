import { highlightCrime } from 'components/crimeviewer/crimeViewerRedux';
import { ICrime, IStoreState } from 'components/types';
import { LayerEvent } from 'leaflet';
import * as React from 'react';
import { CircleMarker, Map, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';

export interface IProps {
    crimes: ICrime[];

    highlightCrime: (crimeId: number, highlight: boolean) => void;
}

export function CrimeMap({ crimes, highlightCrime }: IProps) {
    const position: [number, number] = [51.049259, 13.73836]

    const crimeList = crimes
        .filter((crime) =>
            crime.coordinate != null
        )
        .map((crime) =>
            <CircleMarker
                center={crime.coordinate}
                radius={15}
                color={crime.highlight ? 'red' : 'blue'}
                key={crime.id}
                onMouseOver={(e: LayerEvent) => {
                    e.target.openPopup();
                    highlightCrime(crime.id, true)
                }}
                onMouseOut={(e: LayerEvent) => {
                    e.target.closePopup();
                    highlightCrime(crime.id, false)
                }}>
                <Popup>{crime.title}</Popup>
            </CircleMarker>
        )

    return (
        <Map center={position} zoom={12} className='crime-map'>
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
function mapDispatchToProps(dispatch: any, ) {
    return {
        highlightCrime: (crimeId: number, highlight: boolean) => dispatch(highlightCrime(crimeId, highlight)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeMap);