/**
 * Interface representing a Country.
 *
 * This defines the structure of a country object, including the ISO3 code, name, geographical coordinates,
 * income group, and population details. The population is formatted as a string (e.g., "1.2M" for 1.2 million).
 */
export interface Country {
    /**
     * The ISO 3166-1 alpha-3 country code (a 3-letter code that uniquely identifies each country).
     */
    iso3: string;

    /**
     * The full name of the country.
     */
    name: string;

    /**
     * The geographical coordinates of the country, represented as a tuple of latitude and longitude.
     */
    coordinates: [number, number];

    /**
     * The income group classification of the country, typically represented as levels (e.g., 'High', 'Low').
     */
    incomeGroup: string;

    /**
     * The population of the country, formatted as a string (e.g., "1.2M" for 1.2 million or "500K" for 500 thousand).
     */
    population: string;
}
