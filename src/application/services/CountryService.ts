import { Country } from '../../domain/models/Country';
import { CountryApi } from '../../infrastructure/api/CountryApi';

// Predefined coordinates for some countries.
// These coordinates should ideally be fetched dynamically from an API.
const countryCoordinates: { [key: string]: [number, number] } = {
    ABW: [-69.9687, 12.5154], // Aruba
    AFG: [66.0241, 33.9391],  // Afghanistan
    // Other countries can be added here or fetched from an API.
};

/**
 * Formats a given population number into a more readable format.
 * - If the number is 1 million or greater, it formats it in millions (e.g., "1.2M").
 * - If the number is less than 1 million, it formats it in thousands (e.g., "500.0K").
 *
 * @param number - The population number to format.
 * @returns A string representing the formatted population.
 */
const formatPopulation = (number: number): string => {
    if (number >= 1_000_000) {
        return `${(number / 1_000_000).toFixed(1)}M`;
    } else {
        return `${(number / 1_000).toFixed(1)}K`;
    }
};

/**
 * Service class responsible for fetching and transforming country-related data.
 */
export class CountryService {

    /**
     * Fetches a list of countries from the Country API, maps the data to the `Country` model,
     * and enriches it with predefined country coordinates.
     *
     * @returns A promise that resolves to an array of `Country` objects.
     */
    static async fetchCountries(): Promise<Country[]> {
        const data = await CountryApi.fetchCountries();

        // Map API response to the `Country` model
        return data.body.countries.map((item: any) => ({
            iso3: item.country.iso3,
            name: item.country.name,
            coordinates: countryCoordinates[item.country.iso3] || [0, 0],
            incomeGroup: item.income_group.level,
            population: formatPopulation(item.population.number)
        }));
    }
}
