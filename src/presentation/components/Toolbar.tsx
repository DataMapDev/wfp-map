import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faUtensils, faCloud, faExclamationTriangle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Toolbar.css';

interface ToolbarProps {
    selectedCountryIso3: string; // Get the selected country's ISO3 code
}

/**
 * Toolbar Component
 *
 * This component renders a toolbar with buttons, each representing different data sources
 * (IPC, FCS, Climate, and Hazards). When a button is clicked, the corresponding information
 * from a simulated API call is displayed in an information card below the buttons.
 *
 * @returns {JSX.Element} The rendered Toolbar component.
 */
const Toolbar: React.FC<ToolbarProps> = ({ selectedCountryIso3 }) => {
    // State to store the current information to be displayed
    const [info, setInfo] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Function to format large numbers (e.g., 23075100 -> 23.1M)
    const formatLargeNumber = (num: number): string => {
        return num >= 1_000_000 ? `${(num / 1_000_000).toFixed(1)}M` : num.toString();
    };

    /**
     * Simulates fetching data from the IPC API and updates the displayed information.
     */
    const handleIPCClick = () => setInfo('Information from IPC API here');

    // Fetch FCS data for the selected country
    const handleFCSClick = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.hungermapdata.org/v1/foodsecurity/country/${selectedCountryIso3}`);
            const data = await response.json();

            if (data?.body?.metrics?.fcs?.people) {
                const fcsPeople = data.body.metrics.fcs.people;
                const formattedFcsPeople = formatLargeNumber(fcsPeople);
                setInfo(`People with insufficient food consumption: ${formattedFcsPeople}`);
            } else {
                setInfo('No data available for food consumption.');
            }
        } catch (error) {
            setInfo('Failed to fetch FCS data.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Simulates fetching data from the Climate Data API and updates the displayed information.
     */
    const handleClimateClick = () => setInfo('Information from Climate Data API here');

    /**
     * Simulates fetching data from the Hazards Data API and updates the displayed information.
     */
    const handleHazardsClick = () => setInfo('Information from Hazards Data API here');

    return (
        <div className="toolbar">
            {/* IPC Button */}
            <button onClick={handleIPCClick} className="icon-button">
                <FontAwesomeIcon icon={faInfoCircle} />
                <span className="icon-label">IPC</span>
            </button>

            {/* FCS Button */}
            <button onClick={handleFCSClick} className="icon-button">
                <FontAwesomeIcon icon={faUtensils} />
                <span className="icon-label">FCS</span>
            </button>

            {/* Climate Button */}
            <button onClick={handleClimateClick} className="icon-button">
                <FontAwesomeIcon icon={faCloud} />
                <span className="icon-label">Climate</span>
            </button>

            {/* Hazards Button */}
            <button onClick={handleHazardsClick} className="icon-button">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <span className="icon-label">Hazards</span>
            </button>

            {loading && <FontAwesomeIcon icon={faSpinner} spin size="2x" />}

            {/* Information Card */}
            {info && (
                <div className="info-card">
                    <p>{info}</p>
                </div>
            )}
        </div>
    );
};

export default Toolbar;
