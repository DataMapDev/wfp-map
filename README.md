# Map-Based Interface with Data Insights

## Overview

This project implements a dynamic, map-based interface that provides data insights for different countries. Using **Mapbox GL JS**, the map renders as a globe, allowing users to navigate between countries through a dropdown menu. When a country is selected, the map "flies" to that location, focusing on the chosen country, and displays additional information about it.

The interface also includes four buttons representing different data sources, each of which can be clicked to fetch and display data specific to the selected country. As this is a Proof of Concept (POC), the API calls for fetching data are simulated and not fully implemented.

## Features

1. **Mapbox Integration**: The globe map is rendered using Mapbox GL JS, allowing smooth transitions (fly-to effect) when a user selects a country.
   
2. **Country Selection**: A dropdown menu enables the user to choose a country, which triggers the map to zoom in on that country and display details such as population and income group. Currently, only **Aruba** and **Afghanistan** can be selected, as their coordinates have been manually added. In the future, an API could be used to fetch the coordinates for all countries dynamically.

3. **Data Buttons**: Four buttons appear after a country is selected:
   - **IPC (Integrated Food Security Phase Classification)**
   - **FCS (Food Consumption Score)**
   - **Climate**
   - **Hazards**

   While the current implementation does not include actual API integration, clicking the buttons simulates fetching data from specific endpoints.

4. **User Experience Flow**: The design is aimed at providing a seamless experience where the user:
   1. Selects a country.
   2. Views country information (population, income group, etc.).
   3. Clicks one of the four buttons to retrieve additional country-specific data.

## How to Run the Project

To run the project, simply use the following command:

```bash
npm start
