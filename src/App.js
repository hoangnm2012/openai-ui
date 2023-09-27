import logo from './logo.svg';
import { useState, useEffect } from "react";
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [message, setMessage] = useState("");
  // Define the URL you want to send a POST request to
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

// Define the data you want to send in the POST request body
  const postData = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "What is NodeJS?"}],
    "temperature": 0.7
  };

// Define custom headers for the request
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  };

// Create the fetch options object
  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(postData)
  };

// Use the fetch API to make a POST request with custom headers


  useEffect(() => {
    fetch(apiUrl, options)
      .then(response => {
        // Check if the response status is OK (HTTP 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const res = response.json();
        // Parse the response body as JSON

        // const msg = res?.choices && res?.choices[0].message?.content || "No Response";
        // console.log(msg, 'res');
        // setData(msg);
        return res;
      })
      .then(data => {
        // Work with the JSON data returned from the POST request
        const msg = data?.choices && data?.choices[0].message?.content || "No Response";
        setMessage(msg)
        console.log('POST request successful. Response data:', data);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
      });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {message}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
