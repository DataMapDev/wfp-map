import React from 'react';
import './CountryInfo.css';

/**
 * Props interface for the CountryInfo component.
 *
 * @property {string | null} countryName - The name of the selected country, or null if none is selected.
 * @property {string | null} incomeGroup - The income group of the selected country, or null if none is selected.
 * @property {string | null} population - The population of the selected country, or null if none is selected.
 */
interface CountryInfoProps {
    countryName: string | null;
    incomeGroup: string | null;
    population: string | null;
}

/**
 * CountryInfo Component
 *
 * This component displays detailed information about a selected country. If no country is selected,
 * it prompts the user to select a country. When a country is selected, it shows the country's name,
 * population, and income group.
 *
 * @param {CountryInfoProps} props - Component props, including countryName, incomeGroup, and population.
 * @returns {JSX.Element} The rendered CountryInfo component.
 */
const CountryInfo: React.FC<CountryInfoProps> = ({
                                                     countryName,
                                                     incomeGroup,
                                                     population,
                                                 }) => {
    return (
        <div className="country-info">
            {countryName ? (
                <>
                    <h3>{countryName}</h3>
                    <p><strong>Population:</strong> {population !== null ? population : 'N/A'}</p>
                    <p><strong>Income Group:</strong> {incomeGroup}</p>
                </>
            ) : (
                <p>Select a country to see its information.</p>
            )}
        </div>
    );
};

export default CountryInfo;
