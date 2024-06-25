Title: Weather Application - SkySavvy
Live at: https://skysavvy-mdjg2s6vu-yashagrawals-projects.vercel.app/

Abstract:
SkySavvy is a weather application designed to provide real-time weather updates based on user location or search query. This document elucidates the functionality and workflow of the SkySavvy application.

Project Overview:
SkySavvy utilizes the OpenWeatherMap API to fetch weather data, including temperature, weather conditions, and wind speed. The retrieved data is presented to the user in a user-friendly interface, enabling them to stay informed about current weather conditions effortlessly.

Data Retrieval Procedure:
The application interacts with the OpenWeatherMap API to retrieve weather data. The API endpoint used for data retrieval is:

- API Endpoint: https://api.openweathermap.org/data/2.5/weather
- Data Format: JSON

Execution Workflow:
> Location-based Weather Retrieval:
- SkySavvy automatically detects the user's current location using the browser's geolocation API.
- Latitude and longitude coordinates are extracted from the geolocation data.
- The coordinates are used to construct a request to the OpenWeatherMap API to fetch weather data for the user's location.
- Upon receiving the JSON-formatted weather data, it is parsed and displayed to the user.

>Search-based Weather Retrieval:
- Users can manually input a city name into the search box provided by the application.
- When the user enters a city name and presses Enter, SkySavvy sends a request to the OpenWeatherMap API with the provided city name.
- The API responds with the weather data for the specified city, which is then parsed and presented to the user.
