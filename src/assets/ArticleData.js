import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleData = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;
        setArticles(countries);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Article List</h1>
      <ul>
        {articles.map((country) => (
          <li key={country.alpha3Code}>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleData;
