import { Country } from '../../domain/models/Country';
import { CountryApi } from '../../infrastructure/api/CountryApi';

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
     * Fetches a list of countries from the Country API, maps the data to the `Country` model
     *
     * @returns A promise that resolves to an array of `Country` objects.
     */
    static async fetchCountries(): Promise<Country[]> {
        const data = await CountryApi.fetchCountries();

        // Map API response to the `Country` model and sort by country name
        return data.body.countries
            .map((item: any) => ({
                iso3: item.country.iso3,
                name: item.country.name,
                incomeGroup: item.income_group.level,
                population: formatPopulation(item.population.number)
            }))
            .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
    }
}
