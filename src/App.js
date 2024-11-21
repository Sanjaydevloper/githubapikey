import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = 'Sanjaydevloper'; // Replace with the actual GitHub username

  // Fetch user data from GitHub API
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data); // Store the user data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]); // Runs when the component mounts or username changes

  // Display loading state
  if (loading) {
    return <div className="App">Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div className="App">Error: {error}</div>;
  }

  // Display user data
  return (
    <div className="App" style={{backgroundColor:'lightblue'}}>
      <h1>GitHub User Information</h1>
      <div className="user-info">
        <img src={user.avatar_url} alt={user.login} className="avatar" />
        <h2>{user.name}</h2>
        <p><strong>Username:</strong> {user.login}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
        <p><strong>Followers:</strong> {user.followers}</p>
        <p><strong>Following:</strong> {user.following}</p>
        <p><strong>Public Repos:</strong> {user.public_repos}</p>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
      </div>
    </div>
  );
}

export default App;
