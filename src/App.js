import React, { useState } from 'react';
import axios from 'axios';
import UserList from './UserList';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
  const API_URL = 'https://api.github.com';
  const [query, setQuery] = useState(''); // 검색값
  const [results, setResults] = useState([]); // 결과값

  const fetchUsers = async query => {
    try {
      const res = await axios.get(`${API_URL}/search/users?q=${query}`);
      const data = await res.data;
      return data.items || [];
    } catch (e) {
      throw new Error(e);
    }
  };

  const onSearchSubmit = async e => {
    e.preventDefault();
    const results = await fetchUsers(query);
    // await를 쓰는 이유는 fetchUsers 함수가 비동기적으로 동작하기 때문
    setResults(results);
    console.log(results);
  };

  const onSearchChange = e => {
    setQuery(e.target.value);
  };

  return (
    <div className="app">
      <main className="main">
        <div className="title-box">
          <h1 className="title">🧑🏻‍💻 GitHub User Search</h1>
        </div>
        <form className="search-form" onSubmit={onSearchSubmit}>
          <Form.Control
            id="search"
            className="search-input"
            placeholder="Enter username or email"
            onChange={onSearchChange}
            value={query}
          />
          <Button
            type="submit"
            variant="outline-secondary"
            className="submit-btn"
          >
            Search
          </Button>
        </form>
        <h2 className="sub-title">Results</h2>
        <ul className="results">
          <div className="line"></div>
          {results.map(result => (
            <UserList
              username={result.login}
              key={result.login}
              avartar={result.avatar_url}
              url={result.html_url}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
