// ===== GLOBAL VARIABLES =====
let currentLocation = 'Brooklyn, New York, USA';
let weatherData = {};
let charts = {};
let statusChart = null;
let forecastChart = null;

// Weather API Configuration
const WEATHER_API_KEY = '2b58c92e30b044d46f72b75b300e360f'; // Replace with your OpenWeatherMap API key
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5&units=metric';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    setupEventListeners();
    fetchWeatherData(currentLocation);
    initializeCharts();
    startAnimations();
});

function initializeApp() {
    // Set current date
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute

    // Initialize search functionality
    setupSearch();

    console.log('App initialized');

    // Load recently searched cities from localStorage
    loadRecentlySearched();
}

function setupSearch() {
    // Comprehensive cities database - Global Coverage
    window.availableCities = [
        // North America
        'New York, USA', 'Los Angeles, USA', 'Chicago, USA', 'Houston, USA', 'Phoenix, USA',
        'Philadelphia, USA', 'San Antonio, USA', 'San Diego, USA', 'Dallas, USA', 'San Jose, USA',
        'Austin, USA', 'Jacksonville, USA', 'Fort Worth, USA', 'Columbus, USA', 'Charlotte, USA',
        'San Francisco, USA', 'Indianapolis, USA', 'Seattle, USA', 'Denver, USA', 'Washington, USA',
        'Boston, USA', 'El Paso, USA', 'Nashville, USA', 'Detroit, USA', 'Oklahoma City, USA',
        'Portland, USA', 'Las Vegas, USA', 'Memphis, USA', 'Louisville, USA', 'Milwaukee, USA',
        'Toronto, Canada', 'Vancouver, Canada', 'Montreal, Canada', 'Calgary, Canada', 'Ottawa, Canada',
        'Edmonton, Canada', 'Winnipeg, Canada', 'Quebec City, Canada', 'Hamilton, Canada', 'Halifax, Canada',
        'Mexico City, Mexico', 'Guadalajara, Mexico', 'Monterrey, Mexico', 'Puebla, Mexico', 'Tijuana, Mexico',
        'Leon, Mexico', 'Juarez, Mexico', 'Zapopan, Mexico', 'Nezahualcoyotl, Mexico', 'Chihuahua, Mexico',

        // Europe
        'London, UK', 'Paris, France', 'Berlin, Germany', 'Madrid, Spain', 'Rome, Italy',
        'Amsterdam, Netherlands', 'Vienna, Austria', 'Prague, Czech Republic', 'Budapest, Hungary',
        'Warsaw, Poland', 'Stockholm, Sweden', 'Copenhagen, Denmark', 'Oslo, Norway', 'Helsinki, Finland',
        'Athens, Greece', 'Lisbon, Portugal', 'Dublin, Ireland', 'Brussels, Belgium', 'Zurich, Switzerland',
        'Moscow, Russia', 'Istanbul, Turkey', 'Kiev, Ukraine', 'Bucharest, Romania', 'Sofia, Bulgaria',
        'Belgrade, Serbia', 'Zagreb, Croatia', 'Ljubljana, Slovenia', 'Bratislava, Slovakia', 'Vilnius, Lithuania',
        'Riga, Latvia', 'Tallinn, Estonia', 'Reykjavik, Iceland', 'Helsinki, Finland', 'Malaga, Spain',
        'Barcelona, Spain', 'Valencia, Spain', 'Seville, Spain', 'Bilbao, Spain', 'Malaga, Spain',
        'Marseille, France', 'Lyon, France', 'Toulouse, France', 'Nice, France', 'Nantes, France',
        'Strasbourg, France', 'Bordeaux, France', 'Lille, France', 'Cannes, France', 'Saint-Tropez, France',
        'Milan, Italy', 'Naples, Italy', 'Turin, Italy', 'Palermo, Italy', 'Genoa, Italy',
        'Bologna, Italy', 'Florence, Italy', 'Venice, Italy', 'Verona, Italy', 'Bari, Italy',
        'Munich, Germany', 'Hamburg, Germany', 'Cologne, Germany', 'Frankfurt, Germany',
        'Stuttgart, Germany', 'Düsseldorf, Germany', 'Dortmund, Germany', 'Essen, Germany', 'Leipzig, Germany',
        'Bremen, Germany', 'Dresden, Germany', 'Hanover, Germany', 'Nuremberg, Germany',
        'Liverpool, UK', 'Manchester, UK', 'Birmingham, UK', 'Glasgow, UK', 'Edinburgh, UK',
        'Bristol, UK', 'Leeds, UK', 'Sheffield, UK', 'Cardiff, UK', 'Belfast, UK',
        'Newcastle, UK', 'Nottingham, UK', 'Leicester, UK', 'Coventry, UK', 'Hull, UK',

        // Asia
        'Tokyo, Japan', 'Beijing, China', 'Shanghai, China', 'Hong Kong, China', 'Singapore',
        'Bangkok, Thailand', 'Jakarta, Indonesia', 'Manila, Philippines', 'Kuala Lumpur, Malaysia',
        'Seoul, South Korea', 'Taipei, Taiwan', 'Ho Chi Minh City, Vietnam', 'Mumbai, India', 'Delhi, India',
        'Bangalore, India', 'Chennai, India', 'Kolkata, India', 'Islamabad, Pakistan', 'Karachi, Pakistan',
        'Dhaka, Bangladesh', 'Colombo, Sri Lanka', 'Kathmandu, Nepal', 'Thimphu, Bhutan', 'Male, Maldives',
        'Osaka, Japan', 'Nagoya, Japan', 'Sapporo, Japan', 'Fukuoka, Japan', 'Kobe, Japan',
        'Kyoto, Japan', 'Yokohama, Japan', 'Hiroshima, Japan', 'Sendai, Japan', 'Kitakyushu, Japan',
        'Shenzhen, China', 'Guangzhou, China', 'Chengdu, China', 'Tianjin, China', 'Wuhan, China',
        'Xi\'an, China', 'Hangzhou, China', 'Nanjing, China', 'Shenyang, China', 'Harbin, China',
        'Chongqing, China', 'Dalian, China', 'Qingdao, China', 'Suzhou, China', 'Xiamen, China',
        'Surabaya, Indonesia', 'Bandung, Indonesia', 'Medan, Indonesia', 'Semarang, Indonesia',
        'Palembang, Indonesia', 'Makassar, Indonesia', 'Batam, Indonesia', 'Pekanbaru, Indonesia',
        'Cebu, Philippines', 'Davao, Philippines', 'Quezon City, Philippines', 'Caloocan, Philippines',
        'Antipolo, Philippines', 'Taguig, Philippines', 'Pasig, Philippines', 'Cagayan de Oro, Philippines',
        'Penang, Malaysia', 'Johor Bahru, Malaysia', 'Kuching, Malaysia', 'Ipoh, Malaysia', 'Shah Alam, Malaysia',
        'Pattaya, Thailand', 'Phuket, Thailand', 'Chiang Mai, Thailand', 'Hat Yai, Thailand',
        'Pune, India', 'Ahmedabad, India', 'Surat, India', 'Jaipur, India', 'Lucknow, India',
        'Kanpur, India', 'Nagpur, India', 'Indore, India', 'Thane, India', 'Bhopal, India',
        'Lahore, Pakistan', 'Faisalabad, Pakistan', 'Rawalpindi, Pakistan', 'Gujranwala, Pakistan',
        'Peshawar, Pakistan', 'Multan, Pakistan', 'Islamabad, Pakistan', 'Quetta, Pakistan',
        'Faisalabad, Pakistan', 'Hyderabad, Pakistan', 'Sialkot, Pakistan', 'Sukkur, Pakistan',

        // Middle East & Africa
        'Dubai, UAE', 'Abu Dhabi, UAE', 'Doha, Qatar', 'Riyadh, Saudi Arabia', 'Tel Aviv, Israel',
        'Jerusalem, Israel', 'Cairo, Egypt', 'Lagos, Nigeria', 'Nairobi, Kenya', 'Johannesburg, South Africa',
        'Cape Town, South Africa', 'Casablanca, Morocco', 'Tunis, Tunisia', 'Algiers, Algeria',
        'Kuwait City, Kuwait', 'Manama, Bahrain', 'Muscat, Oman', 'Dammam, Saudi Arabia',
        'Mecca, Saudi Arabia', 'Medina, Saudi Arabia', 'Jeddah, Saudi Arabia', 'Khartoum, Sudan',
        'Addis Ababa, Ethiopia', 'Dar es Salaam, Tanzania', 'Kampala, Uganda', 'Kigali, Rwanda',
        'Abidjan, Ivory Coast', 'Accra, Ghana', 'Dakar, Senegal', 'Abuja, Nigeria', 'Port Harcourt, Nigeria',
        'Ibadan, Nigeria', 'Kano, Nigeria', 'Benin City, Nigeria', 'Maiduguri, Nigeria', 'Zaria, Nigeria',
        'Auckland, New Zealand', 'Wellington, New Zealand', 'Christchurch, New Zealand', 'Hamilton, New Zealand',
        'Tauranga, New Zealand', 'Napier-Hastings, New Zealand', 'Dunedin, New Zealand', 'Palmerston North, New Zealand',

        // South America
        'Buenos Aires, Argentina', 'São Paulo, Brazil', 'Rio de Janeiro, Brazil', 'Bogotá, Colombia',
        'Lima, Peru', 'Santiago, Chile', 'Caracas, Venezuela', 'Havana, Cuba', 'Montevideo, Uruguay',
        'La Paz, Bolivia', 'Quito, Ecuador', 'Georgetown, Guyana', 'Paramaribo, Suriname',
        'Cayenne, French Guiana', 'Brasília, Brazil', 'Salvador, Brazil', 'Fortaleza, Brazil',
        'Belo Horizonte, Brazil', 'Manaus, Brazil', 'Curitiba, Brazil', 'Recife, Brazil', 'Porto Alegre, Brazil',
        'Belém, Brazil', 'Goiânia, Brazil', 'Guarulhos, Brazil', 'Campinas, Brazil', 'São Luís, Brazil',
        'Mendoza, Argentina', 'Córdoba, Argentina', 'Rosario, Argentina', 'La Plata, Argentina',
        'Mar del Plata, Argentina', 'Tucumán, Argentina', 'Santa Fe, Argentina', 'Concepción, Chile',
        'Valparaíso, Chile', 'Viña del Mar, Chile', 'Temuco, Chile', 'Rancagua, Chile', 'Talca, Chile',
        'Medellín, Colombia', 'Cali, Colombia', 'Barranquilla, Colombia', 'Cartagena, Colombia',
        'Cúcuta, Colombia', 'Soledad, Colombia', 'Ibagué, Colombia', 'Bucaramanga, Colombia',
        'Arequipa, Peru', 'Trujillo, Peru', 'Chiclayo, Peru', 'Piura, Peru', 'Iquitos, Peru',
        'Huancayo, Peru', 'Chimbote, Peru', 'Pucallpa, Peru', 'Tacna, Peru', 'Ica, Peru',

        // Oceania & Pacific
        'Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia', 'Perth, Australia',
        'Adelaide, Australia', 'Gold Coast, Australia', 'Canberra, Australia', 'Newcastle, Australia',
        'Wollongong, Australia', 'Logan City, Australia', 'Geelong, Australia', 'Hobart, Australia',
        'Townsville, Australia', 'Cairns, Australia', 'Darwin, Australia', 'Toowoomba, Australia',
        'Ballarat, Australia', 'Bendigo, Australia', 'Albury, Australia', 'Launceston, Australia',
        'Mackay, Australia', 'Rockhampton, Australia', 'Bunbury, Australia', 'Bundaberg, Australia',
        'Coffs Harbour, Australia', 'Wagga Wagga, Australia', 'Hervey Bay, Australia', 'Mildura, Australia',
        'Shepparton, Australia', 'Geraldton, Australia', 'Tamworth, Australia', 'Traralgon, Australia',
        'Port Macquarie, Australia', 'Orange, Australia', 'Gladstone, Australia', 'Alice Springs, Australia',
        'Suva, Fiji', 'Nadi, Fiji', 'Lautoka, Fiji', 'Port Moresby, Papua New Guinea',
        'Honolulu, Hawaii', 'Anchorage, Alaska', 'Juneau, Alaska', 'Fairbanks, Alaska',
        'Sitka, Alaska', 'Ketchikan, Alaska', 'Wasilla, Alaska', 'Kenai, Alaska', 'Kodiak, Alaska',

        // Caribbean & Central America
        'San Juan, Puerto Rico', 'Panama City, Panama', 'San José, Costa Rica', 'Guatemala City, Guatemala',
        'Tegucigalpa, Honduras', 'San Salvador, El Salvador', 'Managua, Nicaragua', 'San Pedro Sula, Honduras',
        'Kingston, Jamaica', 'Port of Spain, Trinidad and Tobago', 'Bridgetown, Barbados',
        'Castries, Saint Lucia', 'Roseau, Dominica', 'Basseterre, Saint Kitts and Nevis',
        'St. George\'s, Grenada', 'Kingstown, Saint Vincent and the Grenadines', 'Nassau, Bahamas',
        'Belmopan, Belize', 'George Town, Cayman Islands', 'Road Town, British Virgin Islands',
        'Oranjestad, Aruba', 'Willemstad, Curaçao', 'Philipsburg, Sint Maarten', 'Marigot, Saint Martin',

        // Major tourist destinations & special locations
        'Istanbul, Turkey', 'Dubai, UAE', 'Singapore', 'Hong Kong', 'Macau', 'Monaco',
        'Vatican City', 'San Marino', 'Andorra', 'Liechtenstein', 'Luxembourg', 'Malta',
        'Gibraltar', 'Greenwich, UK', 'Stonehenge, UK', 'Venice, Italy', 'Athens, Greece',
        'Pyramids of Giza, Egypt', 'Petra, Jordan', 'Machu Picchu, Peru', 'Angkor Wat, Cambodia',
        'Taj Mahal, India', 'Great Wall of China', 'Mount Fuji, Japan', 'Sydney Opera House, Australia',
        'Statue of Liberty, USA', 'Eiffel Tower, France', 'Big Ben, UK', 'Colosseum, Italy',
        'Niagara Falls, Canada', 'Grand Canyon, USA', 'Yellowstone, USA', 'Yosemite, USA',
        'Banff, Canada', 'Whistler, Canada', 'Aspen, USA', 'Vail, USA', 'Park City, USA'
    ];
}

function setupEventListeners() {
    // Inline search functionality
    const searchInput = document.getElementById('inlineSearchInput');
    const searchDropdown = document.getElementById('searchResultsDropdown');

    console.log('Setting up event listeners...');
    console.log('Search input element:', searchInput);
    console.log('Search dropdown element:', searchDropdown);
    console.log('Available cities:', window.availableCities ? window.availableCities.length : 'NOT DEFINED');

    if (searchInput && searchDropdown) {
        console.log('✓ Search elements found, attaching event listeners');

        searchInput.addEventListener('input', function (e) {
            console.log('Input event triggered, value:', e.target.value);
            handleInlineSearch();
        });

        searchInput.addEventListener('focus', () => {
            console.log('Search input focused');
            if (searchInput.value.length >= 2) {
                handleInlineSearch();
            }
        });

        // Allow pressing Enter to search ANY city name (even if not in suggestions)
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const value = searchInput.value.trim();
                if (value.length > 0) {
                    updateLocation(value);
                    addToRecentlySearched(value);
                    searchDropdown.classList.remove('active');
                }
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.search-container')) {
                searchDropdown.classList.remove('active');
            }
        });

        console.log('✓ Event listeners attached successfully');
    } else {
        console.error('✗ Search elements not found!');
        if (!searchInput) console.error('  - Missing: inlineSearchInput');
        if (!searchDropdown) console.error('  - Missing: searchResultsDropdown');
    }

    // Download button
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', handleDownloadApp);
    }

    // See more details link
    const seeMoreLink = document.querySelector('.see-more-link');
    if (seeMoreLink) {
        seeMoreLink.addEventListener('click', handleSeeMoreDetails);
    }

    // See all link
    const seeAllLink = document.querySelector('.see-all-link');
    if (seeAllLink) {
        seeAllLink.addEventListener('click', handleSeeAll);
    }

    // City cards
    document.querySelectorAll('.city-card').forEach(card => {
        card.addEventListener('click', function () {
            const cityName = this.querySelector('h4').textContent;
            updateLocation(cityName);
        });
    });
}

// ===== DATE AND TIME =====
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);

    const dateTimeElement = document.querySelector('.date-time');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateString;
    }
}

// ===== SEARCH FUNCTIONALITY =====
function handleInlineSearch() {
    const searchInput = document.getElementById('inlineSearchInput');
    const searchDropdown = document.getElementById('searchResultsDropdown');

    console.log('Search triggered:', searchInput ? searchInput.value : 'NO INPUT');

    if (!searchInput || !searchDropdown) {
        console.error('Search elements not found');
        return;
    }

    const query = searchInput.value.toLowerCase();
    console.log('Query:', query, 'Length:', query.length);

    if (query.length < 2) {
        searchDropdown.classList.remove('active');
        return;
    }

    // Check if availableCities is defined
    if (!window.availableCities || !Array.isArray(window.availableCities)) {
        console.error('window.availableCities is not defined or not an array!');
        searchDropdown.innerHTML = '<div class="search-result-item">Error: City database not loaded</div>';
        searchDropdown.classList.add('active');
        return;
    }

    const filteredCities = window.availableCities.filter(city =>
        city.toLowerCase().includes(query)
    );

    console.log('Filtered cities:', filteredCities.length, 'results');

    displayInlineSearchResults(filteredCities.slice(0, 5));
}

function displayInlineSearchResults(cities) {
    const searchDropdown = document.getElementById('searchResultsDropdown');
    const searchInput = document.getElementById('inlineSearchInput');

    console.log('Displaying search results for', cities.length, 'cities');

    if (cities.length === 0) {
        searchDropdown.innerHTML = '<div class="search-result-item">No cities found</div>';
    } else {
        searchDropdown.innerHTML = cities.map(city => `
            <div class="search-result-item" onclick="selectInlineCity('${city}')">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <div class="location-name">${city}</div>
                    <div class="location-details">Click to view weather</div>
                </div>
            </div>
        `).join('');
    }

    searchDropdown.classList.add('active');
    console.log('Dropdown classes:', searchDropdown.className);
    console.log('Dropdown display style:', window.getComputedStyle(searchDropdown).display);
}

function selectInlineCity(cityName) {
    updateLocation(cityName);
    document.getElementById('inlineSearchInput').value = cityName;
    document.getElementById('searchResultsDropdown').classList.remove('active');
    addToRecentlySearched(cityName);
}



// ===== LOCATION MANAGEMENT =====
function updateLocation(locationName) {
    currentLocation = locationName;

    // Update location displays
    document.querySelector('.location-info h2').textContent = locationName;
    document.querySelector('.current-location span').textContent = locationName;

    // Fetch weather data for new location
    fetchWeatherData(locationName);

    // Show loading animation
    showLoadingAnimation();
}

function getCurrentLocationWeather() {
    // Get user's geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                // In a real app, you would reverse geocode to get city name
                // For demo, we'll use the default Brooklyn location
                fetchWeatherData(currentLocation);
            },
            error => {
                console.log('Geolocation error:', error);
                fetchWeatherData(currentLocation);
            }
        );
    } else {
        fetchWeatherData(currentLocation);
    }
}

// ===== WEATHER DATA =====
async function fetchWeatherData(location) {
    showLoadingAnimation();
    
    try {
        // First get coordinates for the city
        const geoResponse = await fetch(
            `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${WEATHER_API_KEY}`
        );
        
        if (!geoResponse.ok) {
            throw new Error('Location not found');
        }
        
        const geoData = await geoResponse.json();
        
        if (geoData.length === 0) {
            throw new Error('City not found');
        }
        
        const { lat, lon, name, country, state } = geoData[0];
        const locationName = state ? `${name}, ${state}, ${country}` : `${name}, ${country}`;
        
        // Get current weather
        const weatherResponse = await fetch(
            `${WEATHER_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        
        if (!weatherResponse.ok) {
            throw new Error('Weather data not available');
        }
        
        const currentWeather = await weatherResponse.json();
        
        // Get 5-day forecast
        const forecastResponse = await fetch(
            `${WEATHER_API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        
        if (!forecastResponse.ok) {
            throw new Error('Forecast data not available');
        }
        
        const forecastData = await forecastResponse.json();
        
        // Process and update the data
        const processedData = processWeatherData(locationName, currentWeather, forecastData);
        updateWeatherDisplay(processedData);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Fallback to demo data if API fails
        const demoData = generateDemoWeatherData(location);
        updateWeatherDisplay(demoData);
        
        // Show error message to user
        showErrorMessage(`Unable to fetch real weather data. Showing demo data for ${location}.`);
    } finally {
        hideLoadingAnimation();
    }
}

function processWeatherData(locationName, currentWeather, forecastData) {
    // Process forecast data (get one forecast per day)
    const dailyForecasts = {};
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        if (!dailyForecasts[dayName]) {
            dailyForecasts[dayName] = item;
        }
    });
    
    const forecast = Object.values(dailyForecasts).slice(0, 6).map(item => ({
        day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
        temperature: Math.round(item.main.temp),
        condition: item.weather[0].description
    }));
    
    return {
        location: locationName,
        current: {
            temperature: Math.round(currentWeather.main.temp),
            condition: currentWeather.weather[0].description,
            high: Math.round(currentWeather.main.temp_max),
            low: Math.round(currentWeather.main.temp_min),
            humidity: currentWeather.main.humidity,
            windSpeed: Math.round(currentWeather.wind.speed * 3.6), // Convert m/s to km/h
            pressure: currentWeather.main.pressure,
            visibility: currentWeather.visibility / 1000, // Convert to km
            uvIndex: 0, // OpenWeatherMap free tier doesn't provide UV index
            icon: getWeatherIcon(currentWeather.weather[0].main)
        },
        forecast: forecast,
        alerts: generateWeatherAlerts()
    };
}

function getWeatherIcon(weatherMain) {
    const iconMap = {
        'Thunderstorm': 'storm',
        'Drizzle': 'rainy',
        'Rain': 'rainy',
        'Snow': 'snowy',
        'Clear': 'sunny',
        'Clouds': 'partly-cloudy'
    };
    return iconMap[weatherMain] || 'partly-cloudy';
}

function showErrorMessage(message) {
    // Create a toast notification for errors
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(231, 76, 60, 0.95) 0%, rgba(192, 57, 43, 0.95) 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 5000);
}

function generateDemoWeatherData(location) {
    const weatherConditions = [
        { condition: 'Stormy with partly cloudy', temp: 18, high: 29, low: 12, icon: 'storm' },
        { condition: 'Partly Cloudy', temp: 22, high: 28, low: 16, icon: 'partly-cloudy' },
        { condition: 'Clear and Sunny', temp: 25, high: 32, low: 18, icon: 'sunny' },
        { condition: 'Light Rain', temp: 15, high: 20, low: 10, icon: 'rainy' },
        { condition: 'Snowy', temp: -2, high: 2, low: -5, icon: 'snowy' }
    ];

    const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

    return {
        location: location,
        current: {
            temperature: randomCondition.temp,
            condition: randomCondition.condition,
            high: randomCondition.high,
            low: randomCondition.low,
            humidity: Math.floor(Math.random() * 40) + 40,
            windSpeed: Math.floor(Math.random() * 20) + 5,
            pressure: Math.floor(Math.random() * 50) + 980,
            visibility: Math.floor(Math.random() * 10) + 5,
            uvIndex: Math.floor(Math.random() * 10) + 1,
            icon: randomCondition.icon
        },
        forecast: generateForecastData(),
        alerts: generateWeatherAlerts()
    };
}

function generateForecastData() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const baseTemp = Math.floor(Math.random() * 15) + 15;

    return days.map(day => ({
        day: day,
        temperature: baseTemp + Math.floor(Math.random() * 10) - 5,
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)]
    }));
}

function generateWeatherAlerts() {
    const alertTypes = ['None', 'Low', 'Moderate', 'High', 'Extreme'];
    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];

    return {
        level: randomAlert,
        message: randomAlert === 'None' ? 'No weather alerts' : `Weather alert: ${randomAlert} risk`
    };
}

function updateWeatherDisplay(data) {
    weatherData = data;

    // Update current weather
    document.querySelector('.temp-value').textContent = `${data.current.temperature}°`;
    document.querySelector('.high').textContent = `H: ${data.current.high}°`;
    document.querySelector('.low').textContent = `L: ${data.current.low}°`;
    document.querySelector('.weather-description h3').textContent = data.current.condition;

    // Update weather animation based on condition
    updateWeatherAnimation(data.current.icon);

    // Update forecast
    updateForecastDisplay(data.forecast);

    // Update charts
    updateCharts(data);

    // Update status alert
    updateStatusAlert(data.alerts);
}

function updateWeatherAnimation(icon) {
    const animationContainer = document.querySelector('.weather-animation');

    // Reset animations
    animationContainer.className = 'weather-animation';

    // Add specific animation classes based on weather
    switch (icon) {
        case 'storm':
            animationContainer.classList.add('storm-animation');
            break;
        case 'rainy':
            animationContainer.classList.add('rain-animation');
            break;
        case 'sunny':
            animationContainer.classList.add('sunny-animation');
            break;
        case 'snowy':
            animationContainer.classList.add('snow-animation');
            break;
        default:
            animationContainer.classList.add('cloudy-animation');
    }
}

function updateForecastDisplay(forecast) {
    const forecastDays = document.querySelectorAll('.forecast-day');

    forecast.forEach((day, index) => {
        if (forecastDays[index]) {
            forecastDays[index].querySelector('.day-name').textContent = day.day;
            forecastDays[index].querySelector('.day-temp').textContent = `${day.temperature}°`;
        }
    });
}

function updateStatusAlert(alerts) {
    const statusAlert = document.querySelector('.status-alert');
    const alertLevel = alerts.level.toLowerCase();

    statusAlert.className = 'status-alert';

    if (alertLevel === 'high' || alertLevel === 'extreme') {
        statusAlert.classList.add('danger-alert');
        statusAlert.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${alertLevel.charAt(0).toUpperCase() + alertLevel.slice(1)}</span>
        `;
    } else if (alertLevel === 'moderate') {
        statusAlert.classList.add('warning-alert');
        statusAlert.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${alertLevel.charAt(0).toUpperCase() + alertLevel.slice(1)}</span>
        `;
    } else {
        statusAlert.classList.add('safe-alert');
        statusAlert.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Safe</span>
        `;
    }
}

// ===== CHARTS =====
function initializeCharts() {
    initializeStatusChart();
    initializeForecastChart();
}

function initializeStatusChart() {
    const ctx = document.getElementById('statusChart').getContext('2d');

    statusChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['6h', '12h', '18h', '24h', '30h', '36h'],
            datasets: [{
                label: 'Temperature Trend',
                data: [18, 20, 22, 19, 17, 16],
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            }
        }
    });
}

function initializeForecastChart() {
    const ctx = document.getElementById('forecastChart').getContext('2d');

    forecastChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                label: '6-Day Forecast',
                data: [28, 26, 27, 23, 30, 25],
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#00d4ff',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#00d4ff',
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            return `Temperature: ${context.parsed.y}°C`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        callback: function (value) {
                            return value + '°';
                        }
                    }
                }
            }
        }
    });
}

function updateCharts(data) {
    // Update status chart with new temperature data
    if (statusChart) {
        const newTempData = Array.from({ length: 6 }, () =>
            data.current.temperature + Math.floor(Math.random() * 10) - 5
        );
        statusChart.data.datasets[0].data = newTempData;
        statusChart.update();
    }

    // Update forecast chart
    if (forecastChart) {
        const forecastTemps = data.forecast.map(day => day.temperature);
        forecastChart.data.datasets[0].data = forecastTemps;
        forecastChart.update();
    }
}

// ===== RECENTLY SEARCHED =====
function loadRecentlySearched() {
    const recent = localStorage.getItem('recentlySearched');
    if (recent) {
        const cities = JSON.parse(recent);
        updateRecentSearchDisplay(cities);
    }
}

function addToRecentlySearched(cityName) {
    let recent = localStorage.getItem('recentlySearched');
    let cities = recent ? JSON.parse(recent) : [];

    // Remove if already exists
    cities = cities.filter(city => city !== cityName);

    // Add to beginning
    cities.unshift(cityName);

    // Keep only last 5
    cities = cities.slice(0, 5);

    localStorage.setItem('recentlySearched', JSON.stringify(cities));
    updateRecentSearchDisplay(cities);
}

function updateRecentSearchDisplay(cities) {
    // Update the city cards with recently searched cities
    const cityCards = document.querySelectorAll('.city-card');

    cities.slice(0, 2).forEach((city, index) => {
        if (cityCards[index]) {
            const cityData = generateDemoWeatherData(city);
            cityCards[index].querySelector('h4').textContent = city;
            cityCards[index].querySelector('.weather-desc').textContent = cityData.current.condition;
            cityCards[index].querySelector('.city-temp').textContent = `${cityData.current.temperature}°`;
        }
    });
}

// ===== ANIMATIONS =====
function startAnimations() {
    // Add floating animation to clouds
    animateClouds();

    // Add pulse animation to globe
    animateGlobe();

    // Add lightning effect
    startLightningEffect();
}

function animateClouds() {
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach((cloud, index) => {
        cloud.style.animationDelay = `${index * 2}s`;
    });
}

function animateGlobe() {
    const globe = document.querySelector('.globe');
    if (globe) {
        globe.style.animation = 'pulse 3s ease-in-out infinite, rotate 20s linear infinite';
    }
}

function startLightningEffect() {
    setInterval(() => {
        const lightning = document.querySelector('.lightning');
        if (lightning && Math.random() > 0.7) {
            lightning.style.animation = 'none';
            setTimeout(() => {
                lightning.style.animation = 'lightning 3s infinite';
            }, 10);
        }
    }, 5000);
}

// ===== LOADING STATES =====
function showLoadingAnimation() {
    const tempElement = document.querySelector('.temp-value');
    tempElement.innerHTML = '<div class="loading"></div>';
}

function hideLoadingAnimation() {
    // Loading will be hidden when weather data is updated
}

// ===== HANDLER FUNCTIONS =====
function handleDownloadApp() {
    // Simulate app download
    const btn = document.querySelector('.download-btn');
    const originalContent = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    btn.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';

    setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.style.background = '';
    }, 2000);

    // In a real app, this would trigger actual app download
    console.log('App download initiated');
}

function handleSeeMoreDetails(e) {
    e.preventDefault();

    // Scroll to forecast section
    const forecastSection = document.querySelector('.forecast-section');
    forecastSection.scrollIntoView({ behavior: 'smooth' });

    // Highlight the section
    forecastSection.style.animation = 'pulse 1s ease-in-out';
    setTimeout(() => {
        forecastSection.style.animation = '';
    }, 1000);
}

function handleSeeAll(e) {
    e.preventDefault();

    // Show all recently searched cities
    const recent = localStorage.getItem('recentlySearched');
    if (recent) {
        const cities = JSON.parse(recent);
        console.log('All recently searched cities:', cities);

        // In a real app, this would show a modal or navigate to a full list page
        alert(`Recently searched cities:\n${cities.join('\n')}`);
    } else {
        alert('No recently searched cities found');
    }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
    }

    // Escape to close modal
    if (e.key === 'Escape') {
        closeSearchModal();
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce search input
const debouncedSearch = debounce(handleSearchInput, 300);

// ===== ERROR HANDLING =====
window.addEventListener('error', function (e) {
    console.error('Application error:', e.error);
    // In a real app, you would send this to an error tracking service
});

// ===== SERVICE WORKER FOR PWA (Optional) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function (registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.selectInlineCity = selectInlineCity;
