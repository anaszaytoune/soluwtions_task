import React, { useState } from 'react';
import './newsApp.css';




import axios from 'axios';

const NewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNews = async (count) => {
    try {
      const response = await axios.get(`https://gnews.io/api/v4/top-headlines?token=22cdab3411db3d9f1370564259f2467b&country=us&max=${count}`);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const searchByTitleOrAuthor = async (query) => {
    try {
      const response = await axios.get(`https://gnews.io/api/v4/search?q=${query}&token=22cdab3411db3d9f1370564259f2467b`);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error searching news:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFetchNews = () => {
    fetchNews(10); 
  };

  const handleSearchSubmit = () => {
    searchByTitleOrAuthor(searchQuery);
  };

  return (
    <div className="news-app">
      <h1>Soluwtions News App</h1>

      <div className="search-bar">
        <label></label>
        <input placeholder="Search News by Title or Author:" className="input1" type="text" value={searchQuery} onChange={handleSearchChange} />
        <button onClick={handleSearchSubmit}>Search</button>
      </div>

      <div className="action-buttons">
        <button onClick={handleFetchNews}>Fetch Top News</button>
      </div>

      <div className="article-list">
        <h2>Articles</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.url} className="article-item">
              <img src={article.image} alt={article.title} />
              <div className="article-content">
                <strong>{article.title}</strong> - {article.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default NewsApp;
