import React, { useState } from 'react';
import { Cloud, Wind, Droplets, Thermometer, Search, MapPin, AlertCircle, Loader, Eye, Gauge } from 'lucide-react';

/**
 * Weather Now Application
 * A polished weather app for outdoor enthusiasts
 * Built with React and Tailwind CSS
 */
function App() {
    // State management
    const [data, setData] = useState(null);
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // API configuration
    const API_KEY = '941a7cead09c74583b18b5e52cc40668';

    /**
     * Handles the weather search when user presses Enter
     * Fetches data from OpenWeatherMap API
     */
    const searchLocation = async (e) => {
        if (e.key === 'Enter' && location.trim()) {
            setLoading(true);
            setError('');

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('City not found. Please try another location.');
                    } else if (response.status === 401) {
                        throw new Error('API key error. Please contact support.');
                    } else {
                        throw new Error('Unable to fetch weather data. Please try again.');
                    }
                }

                const result = await response.json();
                setData(result);
                setLocation('');
            } catch (err) {
                if (err.message.includes('Failed to fetch')) {
                    setError('Network error. Please check your connection.');
                } else {
                    setError(err.message || 'Something went wrong. Please try again.');
                }
                setData(null);
            } finally {
                setLoading(false);
            }
        }
    };

    /**
     * Formats temperature to whole number
     */
    const formatTemp = (temp) => {
        return temp ? Math.round(temp) : '--';
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Video with Overlay */}
            <div className="absolute inset-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute w-full h-full object-cover"
                >
                    <source
                        src="https://player.vimeo.com/external/365053688.sd.mp4?s=7a97b02152a2a53c7d5302cc3b56b7efc60ed1a1&profile_id=164&oauth2_token_id=57447761"
                        type="video/mp4"
                    />
                </video>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            </div>



            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header Section */}
                <div className="text-center pt-8 pb-6 px-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <Cloud className="w-12 h-12 text-white drop-shadow-lg" />
                        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                            Weather Now
                        </h1>
                    </div>
                    <p className="text-white/90 text-lg drop-shadow-md">
                        Your quick weather companion for outdoor adventures
                    </p>
                </div>

                {/* Search Section */}
                <div className="px-4 mb-6">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                onKeyPress={searchLocation}
                                placeholder="Search for a city..."
                                className="w-full px-6 py-4 pr-14 rounded-full bg-white/95 backdrop-blur-md text-gray-800 placeholder-gray-500 text-lg font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
                                disabled={loading}
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                <div className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-full p-3 cursor-pointer shadow-lg">
                                    <Search className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Loading Indicator */}
                        {loading && (
                            <div className="flex items-center justify-center gap-2 mt-4 text-white drop-shadow-lg">
                                <Loader className="w-5 h-5 animate-spin" />
                                <span className="font-medium">Fetching weather data...</span>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 bg-red-500/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Weather Content */}
                <div className="flex-1 flex items-start justify-center px-4 pb-8">
                    <div className="w-full max-w-5xl">
                        {data ? (
                            <div className="space-y-6">
                                {/* Main Weather Card */}
                                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                        {/* Left: Location & Temp */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <MapPin className="w-6 h-6 text-white drop-shadow-md" />
                                                <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                                                    {data.name}
                                                </h2>
                                                <span className="text-xl text-white/80 drop-shadow-md">
                          {data.sys?.country}
                        </span>
                                            </div>

                                            <div className="flex items-baseline gap-2">
                        <span className="text-8xl md:text-9xl font-bold text-white drop-shadow-lg">
                          {formatTemp(data.main?.temp)}°
                        </span>
                                                <span className="text-3xl text-white/80 drop-shadow-md mb-4">F</span>
                                            </div>
                                        </div>

                                        {/* Right: Weather Description */}
                                        <div className="flex flex-col items-center md:items-end text-center md:text-right">
                                            {data.weather && data.weather[0] && (
                                                <>
                                                    <img
                                                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                                                        alt={data.weather[0].description}
                                                        className="w-32 h-32 drop-shadow-2xl"
                                                    />
                                                    <p className="text-2xl md:text-3xl font-semibold text-white capitalize drop-shadow-md -mt-4">
                                                        {data.weather[0].description}
                                                    </p>
                                                    <p className="text-lg text-white/80 drop-shadow-md mt-1">
                                                        Feels like {formatTemp(data.main?.feels_like)}°F
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Weather Details Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {/* Humidity */}
                                    <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all">
                                        <div className="flex flex-col items-center text-center">
                                            <Droplets className="w-10 h-10 text-blue-200 mb-3 drop-shadow-md" />
                                            <p className="text-3xl font-bold text-white drop-shadow-md mb-1">
                                                {data.main?.humidity || '--'}%
                                            </p>
                                            <p className="text-sm text-white/80 drop-shadow-md font-medium">Humidity</p>
                                        </div>
                                    </div>

                                    {/* Wind Speed */}
                                    <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all">
                                        <div className="flex flex-col items-center text-center">
                                            <Wind className="w-10 h-10 text-blue-200 mb-3 drop-shadow-md" />
                                            <p className="text-3xl font-bold text-white drop-shadow-md mb-1">
                                                {data.wind?.speed ? Math.round(data.wind.speed) : '--'}
                                            </p>
                                            <p className="text-sm text-white/80 drop-shadow-md font-medium">Wind (MPH)</p>
                                        </div>
                                    </div>

                                    {/* Pressure */}
                                    <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all">
                                        <div className="flex flex-col items-center text-center">
                                            <Gauge className="w-10 h-10 text-blue-200 mb-3 drop-shadow-md" />
                                            <p className="text-3xl font-bold text-white drop-shadow-md mb-1">
                                                {data.main?.pressure || '--'}
                                            </p>
                                            <p className="text-sm text-white/80 drop-shadow-md font-medium">Pressure (hPa)</p>
                                        </div>
                                    </div>

                                    {/* Visibility */}
                                    <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all">
                                        <div className="flex flex-col items-center text-center">
                                            <Eye className="w-10 h-10 text-blue-200 mb-3 drop-shadow-md" />
                                            <p className="text-3xl font-bold text-white drop-shadow-md mb-1">
                                                {data.visibility ? (data.visibility / 1609).toFixed(1) : '--'}
                                            </p>
                                            <p className="text-sm text-white/80 drop-shadow-md font-medium">Visibility (mi)</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Min/Max Temperature Bar */}
                                <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30">
                                    <div className="flex items-center justify-around">
                                        <div className="text-center">
                                            <Thermometer className="w-8 h-8 text-blue-300 mx-auto mb-2 drop-shadow-md" />
                                            <p className="text-sm text-white/80 drop-shadow-md mb-1 font-medium">Min Temp</p>
                                            <p className="text-3xl font-bold text-white drop-shadow-md">
                                                {formatTemp(data.main?.temp_min)}°F
                                            </p>
                                        </div>
                                        <div className="h-16 w-px bg-white/30"></div>
                                        <div className="text-center">
                                            <Thermometer className="w-8 h-8 text-red-300 mx-auto mb-2 drop-shadow-md" />
                                            <p className="text-sm text-white/80 drop-shadow-md mb-1 font-medium">Max Temp</p>
                                            <p className="text-3xl font-bold text-white drop-shadow-md">
                                                {formatTemp(data.main?.temp_max)}°F
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Empty State
                            !loading && !error && (
                                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-white/30 text-center">
                                    <Cloud className="w-24 h-24 text-white/60 mx-auto mb-6 drop-shadow-lg" />
                                    <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-md">
                                        Welcome to Weather Now!
                                    </h3>
                                    <p className="text-xl text-white/80 drop-shadow-md">
                                        Enter a city name above to check the current weather
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center pb-6 px-4">
                    <p className="text-white/70 drop-shadow-md font-medium">
                        Built for Jamie, the Outdoor Enthusiast 🏔️
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;