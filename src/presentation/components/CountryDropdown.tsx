import React from 'react';
import { Country } from '../../domain/models/Country';

/**
 * Props interface for the CountryDropdown component.
 *
 * @property {Country[]} countries - The list of countries to display in the dropdown.
 * @property {(country: Country) => void} onCountrySelect - Callback function
 *           that is triggered when a country is selected. It receives the selected country object.
 */
interface CountryDropdownProps {
    countries: Country[];
    onCountrySelect: (country: Country) => void; // Updated to pass only the country
}

/**
 * CountryDropdown Component
 *
 * This component renders a dropdown menu with a list of countries. When a country is selected,
 * it calls the `onCountrySelect` function, passing the selected country's details.
 *
 * @param {CountryDropdownProps} props - Component props, including the countries array and onCountrySelect callback.
 * @returns {JSX.Element} The rendered CountryDropdown component.
 */
const CountryDropdown: React.FC<CountryDropdownProps> = ({ countries, onCountrySelect }) => {

    /**
     * Handles the change event when the user selects a country from the dropdown.
     *
     * It looks up the selected country from the `countries` list using its `iso3` code
     * and calls the `onCountrySelect` function with the selected country details.
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event triggered when the dropdown value changes.
     */
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCountry = countries.find(country => country.iso3 === event.target.value);
        if (selectedCountry) {
            onCountrySelect(selectedCountry); // Pass only the selected country
        }
    };

    return (
        <div>
            <label htmlFor="country-select">Select a country:</label>
            <select id="country-select" onChange={handleChange}>
                <option value="">--Select a Country--</option>
                {countries.map((country) => (
                    <option key={country.iso3} value={country.iso3}>
                        {country.name} ({country.iso3})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountryDropdown;
