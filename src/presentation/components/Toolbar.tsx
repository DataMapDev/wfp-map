import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faUtensils, faCloud, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './Toolbar.css';

/**
 * Toolbar Component
 *
 * This component renders a toolbar with buttons, each representing different data sources
 * (IPC, FCS, Climate, and Hazards). When a button is clicked, the corresponding information
 * from a simulated API call is displayed in an information card below the buttons.
 *
 * @returns {JSX.Element} The rendered Toolbar component.
 */
const Toolbar: React.FC = () => {
    // State to store the current information to be displayed
    const [info, setInfo] = useState<string | null>(null);

    /**
     * Simulates fetching data from the IPC API and updates the displayed information.
     */
    const handleIPCClick = () => setInfo('Information from IPC API here');

    /**
     * Simulates fetching data from the FCS and rCSI APIs and updates the displayed information.
     */
    const handleFCSClick = () => setInfo('Information from FCS and rCSI API here');

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
