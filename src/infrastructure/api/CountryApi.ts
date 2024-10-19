/**
 * CountryApi class is responsible for making API calls related to country information.
 *
 * This class handles the interaction with the external `hungermapdata` API to fetch country-related data.
 */
export class CountryApi {

    /**
     * Fetches the list of countries and their related information from the `hungermapdata` API.
     *
     * The method performs an HTTP GET request to the API endpoint. If the response is successful,
     * it returns the parsed JSON data; otherwise, it throws an error.
     *
     * @returns {Promise<any>} - A promise that resolves with the country data in JSON format.
     * @throws {Error} - If the request fails or returns a non-OK response, an error is thrown.
     */
    static async fetchCountries(): Promise<any> {
        const response = await fetch('https://api.hungermapdata.org/v2/info/country');

        if (!response.ok) {
            // Throw an error if the response status is not OK
            throw new Error('Failed to fetch countries');
        }

        // Return the parsed JSON data from the response
        return response.json();
    }
}
