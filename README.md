# Map-Based Interface with Data Insights

## Overview

This project implements a dynamic, map-based interface that provides data insights for different countries. Using **Mapbox GL JS**, the map renders as a globe, allowing users to navigate between countries through a dropdown menu. When a country is selected, the map "flies" to that location, focusing on the chosen country, and displays additional information about it.

The interface also includes four buttons representing different data sources, each of which can be clicked to fetch and display data specific to the selected country. While this is a Proof of Concept (POC), only the **FCS (Food Consumption Score)** endpoint is fully implemented to show the number of people with insufficient food consumption. The other endpoints are not yet integrated.

## Features

1. **Mapbox Integration**: The globe map is rendered using Mapbox GL JS, allowing smooth transitions (fly-to effect) when a user selects a country.

2. **Country Selection**: A dropdown menu enables the user to choose a country, which triggers the map to zoom in on that country and display details such as population and income group. Currently, only **Aruba** and **Afghanistan** can be selected, as their coordinates have been manually added. In the future, an API could be used to fetch the coordinates for all countries dynamically.

3. **Data Buttons**: Four buttons appear after a country is selected:
   - **IPC (Integrated Food Security Phase Classification)**
   - **FCS (Food Consumption Score)**
   - **Climate**
   - **Hazards**

   The implementation currently focuses on the FCS endpoint, which retrieves the score for people with insufficient food consumption. The other buttons simulate fetching data from specific endpoints but are not fully implemented yet.

4. **Loading Spinner**: A loading spinner is displayed when the FCS button is clicked, as the API call to fetch the FCS score takes some time to respond.

5. **User Experience Flow**: The design is aimed at providing a seamless experience where the user:
   1. Selects a country.
   2. Views country information (population, income group, etc.).
   3. Clicks the **FCS** button to retrieve additional country-specific data.

## Deployment

This project is deployed to **GitHub Pages** and can be accessed at the following URL:

[Live Application](https://datamapdev.github.io/wfp-map/)

## How to Run the Project

To run the project locally, use the following commands:

1. Install dependencies:

   ```bash
   npm install

2. Start the project

   ```bash
   npm start
