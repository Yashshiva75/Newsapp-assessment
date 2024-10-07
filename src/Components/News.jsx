import React, { useState } from 'react';
import axios from 'axios';

const categories = [
  { label: 'Sports', value: 'sports' },
  { label: 'Technology', value: 'technology' },
  { label: 'Health', value: 'health' },
  { label: 'Business', value: 'business' },
  { label: 'Entertainment', value: 'entertainment' },
];

const News = () => {
  const [articles, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('sports');

  const Getnews = async (category) => {
    try {
      setVisibleCount(5);
      let response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=bf168e3dae864173b0eda5430b8ec154`
      );
      setNews(response.data.articles);
      setError(null);
    } catch (err) {
      setError('Error fetching content. Please try again later.');
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    Getnews(category);
  };

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <div className="text-center">
      <nav className="bg-black p-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">News App</h1>
        <ul className="flex space-x-6">
          {categories.map((category) => (
            <li key={category.value}>
              <button
                className={`text-white ${
                  selectedCategory === category.value ? 'font-bold' : ''
                }`}
                onClick={() => handleCategoryChange(category.value)}
              >
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-wrap gap-6 p-4 justify-center">
        {error ? (
          <div className="text-center text-red-500 text-lg font-semibold">
            {error}
          </div>
        ) : (
          articles.slice(0, visibleCount).map((content, index) => (
            <div
              key={index}
              className="p-3 bg-blue-400 w-[320px] rounded-lg shadow-2xl flex justify-center items-start"
            >
              <div className="p-3 bg-white w-full rounded-lg flex flex-col items-center min-h-[200px]">
                <h2 className="text-lg font-semibold text-center mb-2">{content.title}</h2>
                {content.urlToImage && (
                  <img
                    src={content.urlToImage}
                    alt="news"
                    className="w-full object-cover mt-2 mb-4 rounded-md"
                  />
                )}
                <p className="text-sm mb-2">
                  {content.description || 'No description available'}
                </p>
                <p className="text-xs text-gray-600">Author: {content.author || 'Unknown'}</p>
                <p className="text-xs text-gray-600">Source: {content.source.name}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <button onClick={() => Getnews(selectedCategory)} className="bg-[#345782] mr-4 p-2 rounded-2xl text-white mt-4">
        Get Started
      </button>

      {visibleCount < articles.length && !error && (
        <button onClick={handleViewMore} className="bg-[#345782] p-2 rounded-2xl text-white mt-4">
          View More
        </button>
      )}
    </div>
  );
};

export default News;
