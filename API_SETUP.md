# WeatherPro - Real Weather API Setup

## Getting Real Weather Data

Your weather app now supports real-time weather data from anywhere in the world! Follow these steps:

### 1. Get Free API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Copy the API key

### 2. Update the API Key
Open `script.js` and replace this line:
```javascript
const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';
```

With your actual API key:
```javascript
const WEATHER_API_KEY = 'your_actual_api_key_here';
```

### 3. Features Now Available
- **Real weather data** from any city worldwide
- **Current conditions**: Temperature, humidity, wind speed, pressure
- **6-day forecast** with actual weather predictions
- **Automatic city detection** with coordinates
- **Error handling** with fallback to demo data
- **Smart search** for thousands of cities globally

### 4. How to Use
1. Search for any city: "Tokyo", "London", "Mumbai", "Cairo", etc.
2. The app will fetch real weather data
3. If API fails, it shows demo data with an error message
4. All weather features work with real data

### 5. Supported Locations
- **150+ major cities** pre-configured
- **Any city worldwide** through API search
- **Automatic coordinates** detection
- **Multi-language city names** supported

### 6. API Limits (Free Tier)
- 60 calls per minute
- 1,000 calls per day
- Current weather + 5-day forecast
- More than enough for personal use

## Testing
Try searching for:
- "New York" - USA
- "London" - UK  
- "Tokyo" - Japan
- "Sydney" - Australia
- "Mumbai" - India
- "Paris" - France

All will show real weather data once API key is configured!
