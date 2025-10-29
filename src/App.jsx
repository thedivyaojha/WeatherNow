import React, { useState } from 'react';
import { Cloud, Wind, Droplets, Thermometer, Search, MapPin, AlertCircle, Loader, Eye, Gauge } from 'lucide-react';

function App() {
    const [data, setData] = useState(null);
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_KEY = '941a7cead09c74583b18b5e52cc40668';

    const searchLocation = async (e) => {
        if (e.key === 'Enter' && location.trim()) {
            setLoading(true);
            setError('');

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    if (response.status === 404) throw new Error('City not found. Please try another location.');
                    if (response.status === 401) throw new Error('API key error.');
                    throw new Error('Unable to fetch weather data.');
                }
                const result = await response.json();
                setData(result);
                setLocation('');
            } catch (err) {
                setError(err.message || 'Something went wrong.');
                setData(null);
            } finally {
                setLoading(false);
            }
        }
    };

    const formatTemp = (temp) => (temp ? Math.round(temp) : '--');

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 overflow-hidden">
                <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover">
                    <source
                        src="https://cdn.pixabay.com/vimeo/232755070/clouds-12152.mp4?width=1280&hash=0c24c7268a9a6f8f7b8b3b4e7d4462b74c8c65a2"
                        type="video/mp4"
                    />
                </video>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <div className="text-center pt-8 pb-6 px-4">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <Cloud className="w-12 h-12 text-white drop-shadow-lg" />
                        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">Weather Now</h1>
                    </div>
                    <p className="text-white/90 text-lg drop-shadow-md">
                        Your quick weather companion for outdoor adventures
                    </p>
                </div>

                {/* Search */}
                <div className="px-4 mb-6">
                    <div className="max-w-2xl mx-auto relative">
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

                    {loading && (
                        <div className="flex items-center justify-center gap-2 mt-4 text-white drop-shadow-lg">
                            <Loader className="w-5 h-5 animate-spin" />
                            <span className="font-medium">Fetching weather data...</span>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 bg-red-500/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                            <AlertCircle className="w-6 h-6 flex-shrink-0" />
                            <span className="font-medium">{error}</span>
                        </div>
                    )}
                </div>

                {/* Weather Info */}
                <div className="flex-1 flex items-start justify-center px-4 pb-8">
                    <div className="w-full max-w-5xl mx-auto space-y-6">
                        {data ? (
                            <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                                    {/* Location & Temp */}
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="flex justify-center md:justify-start items-center gap-2 mb-3">
                                            <MapPin className="w-6 h-6 text-white drop-shadow-md" />
                                            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">{data.name}</h2>
                                            <span className="text-xl text-white/80 drop-shadow-md">{data.sys?.country}</span>
                                        </div>
                                        <div className="flex justify-center md:justify-start items-baseline gap-2">
                      <span className="text-8xl md:text-9xl font-bold text-white drop-shadow-lg">
                        {formatTemp(data.main?.temp)}°F
                      </span>
                                            <span className="text-3xl text-white/80 drop-shadow-md mb-4"></span>
                                        </div>
                                    </div>

                                    {/* Weather Description */}
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
                        ) : (
                            !loading &&
                            !error && (
                                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-16 shadow-2xl border border-white/30 text-center mx-auto max-w-lg">
                                    <Cloud className="w-24 h-24 text-white/60 mx-auto mb-6 drop-shadow-lg" />
                                    <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-md">Welcome to Weather Now!</h3>
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
                    <p className="text-white/70 drop-shadow-md font-medium">Built for Jamie, the Outdoor Enthusiast 🏔️</p>
                </div>
            </div>
        </div>
    );
}

export default App;
