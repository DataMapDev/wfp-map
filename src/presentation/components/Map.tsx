import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CountryDropdown from './CountryDropdown';
import CountryInfo from './CountryInfo';
import Toolbar from './Toolbar';
import { CountryService } from '../../application/services/CountryService';
import { Country } from '../../domain/models/Country';
import './Map.css';

// Set the Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibG96ODUiLCJhIjoiY20yZnlvYzZuMGVrYTJsczE2NjJmZWF3cCJ9.0QcUuJMYE5fKcq21isQodg';

/**
 * Map Component
 *
 * This component is responsible for rendering an interactive map using Mapbox,
 * fetching country data, and displaying a dropdown for country selection.
 * When a country is selected, the map zooms in on its coordinates and
 * detailed country information is displayed.
 *
 * @returns {JSX.Element} The rendered Map component.
 */
const Map: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    useEffect(() => {
        const initializeMap = () => {
            const newMap = new mapboxgl.Map({
                container: mapContainerRef.current as HTMLElement,
                style: 'mapbox://styles/mapbox/streets-v11',
                projection: 'globe',
                center: [30, 15],
                zoom: 2,
            });

            newMap.addControl(new mapboxgl.NavigationControl());
            setMap(newMap);

            return newMap;
        };

        const mapInstance = initializeMap();

        return () => mapInstance.remove();
    }, []);

    useEffect(() => {
        const fetchCountries = async () => {
            const result = await CountryService.fetchCountries();
            setCountries(result);
        };
        fetchCountries();
    }, []);

    /**
     * Fetches coordinates for the selected country using Mapbox's Geocoding API.
     *
     * @param {string} countryName - The name of the selected country.
     */
    const fetchCountryCoordinates = async (countryName: string) => {
        const response = await fetch(
            `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(countryName)}&types=country&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();
        if (data.features.length > 0) {
            return data.features[0].geometry.coordinates as [number, number];
        }
        return null;
    };

    /**
     * Handles the event when a country is selected from the dropdown.
     * The map zooms in to the selected country's coordinates, and its information is displayed.
     *
     * @param {Country} country - The selected country object.
     */
    const handleCountrySelect = async (country: Country) => {
        const coordinates = await fetchCountryCoordinates(country.name); // Fetch coordinates based on country name
        if (coordinates && map) {
            map.flyTo({
                center: coordinates,
                zoom: 5,
                essential: true,
            });
            setSelectedCountry(country);
        }
    };

    return (
        <div className="map-container">
            <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />

            <div className="map-dropdown-container">
                <CountryDropdown countries={countries} onCountrySelect={handleCountrySelect} />

                <CountryInfo
                    countryName={selectedCountry?.name || null}
                    incomeGroup={selectedCountry?.incomeGroup || null}
                    population={selectedCountry?.population || null}
                />

                {selectedCountry && <Toolbar selectedCountryIso3={selectedCountry.iso3} />}
            </div>
        </div>
    );
};

export default Map;
