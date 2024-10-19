import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import CountryDropdown from './CountryDropdown';
import CountryInfo from './CountryInfo';
import Toolbar from "./Toolbar";
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
    // Reference to the map container
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    // State for managing the Mapbox instance
    const [map, setMap] = useState<mapboxgl.Map | null>(null);

    // State for storing the list of countries
    const [countries, setCountries] = useState<Country[]>([]);

    // State for managing the selected country
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    /**
     * Initializes the Mapbox map when the component mounts.
     * Adds navigation controls and sets an initial zoom and center position.
     */
    useEffect(() => {
        const initializeMap = () => {
            const newMap = new mapboxgl.Map({
                container: mapContainerRef.current as HTMLElement,
                style: 'mapbox://styles/mapbox/streets-v11',
                projection: 'globe',  // Enable globe view projection
                center: [30, 15],  // Initial center [longitude, latitude]
                zoom: 2,           // Initial zoom level
            });

            newMap.addControl(new mapboxgl.NavigationControl()); // Add navigation controls
            setMap(newMap);  // Set the created map instance in the state

            return newMap;
        };

        const mapInstance = initializeMap();  // Initialize the map

        // Cleanup the map when the component unmounts
        return () => mapInstance.remove();
    }, []);

    /**
     * Fetches the list of countries when the component mounts.
     * Utilizes the CountryService to retrieve the data.
     */
    useEffect(() => {
        const fetchCountries = async () => {
            const result = await CountryService.fetchCountries();  // Fetch countries from API
            setCountries(result);  // Store countries in state
        };
        fetchCountries();
    }, []);

    /**
     * Handles the event when a country is selected from the dropdown.
     * The map zooms in to the selected country's coordinates, and its information is displayed.
     *
     * @param {Array<number>} coordinates - The [longitude, latitude] coordinates of the selected country.
     * @param {Country} country - The selected country object.
     */
    const handleCountrySelect = (coordinates: [number, number], country: Country) => {
        if (map) {
            map.flyTo({
                center: coordinates,  // Fly to the selected country's coordinates
                zoom: 5,              // Set the zoom level
                essential: true,       // Ensures that the transition is animated
            });
            setSelectedCountry(country);  // Set the selected country in state
        }
    };

    return (
        <div className="map-container">
            {/* Map container for Mapbox */}
            <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />

            {/* Dropdown and country info panel */}
            <div className="map-dropdown-container">
                {/* Dropdown for selecting a country */}
                <CountryDropdown countries={countries} onCountrySelect={handleCountrySelect} />

                {/* Display country information if a country is selected */}
                <CountryInfo
                    countryName={selectedCountry?.name || null}
                    incomeGroup={selectedCountry?.incomeGroup || null}
                    population={selectedCountry?.population || null}
                />

                {/* Display the toolbar if a country is selected */}
                {selectedCountry && <Toolbar />}
            </div>
        </div>
    );
};

export default Map;
