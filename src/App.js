import React, { useState, useEffect } from 'react';
import "./App.css";

// Array of strings that should be filtered out from the search results
const filteredStrings = [
  'googleusercontent.com','support.google.com', 'googleadservices.com', 
  'maps.googleapis.com', 'schema.org', 'cdnjs.cloudflare.com', 
  'gstatic', 'w3.org', 'google.com.au', 'apis.google.com', 
  'www.google.com', 'policies.google.com'
];

function App() {

  const [numResults, setNumReults] = useState(10); // Number of results the user wants to enquire
  const [foundUrls, setFoundUrls] = useState([[]]); // URLs found from the search, organized per page
  const [urlKeyword, setUrlKeyword] = useState(''); // User-entered domain name to search for
  const [keywordInput, setKeywordInput] = useState(''); // User-entered keyword to search for 
  const [searchResults, setSearchResults] = useState([]); // Final search results after filtering by user-entered domain
  const [isSearchClicked, setIsSearchClicked] = useState(false); // Flag to determine if the search button was clicked
  const [urlError, setUrlError] = useState(null); // Error message related to domain validation



  // Effect to fetch data when the user initiates a search
  useEffect(() => {

    if (!isSearchClicked) return;

    // Function to fetch data for a specific page number
    const fetchData = async (pageNum) => {
      try {
        const response = await fetch(`/Google/Page0${pageNum + 1}.html`);
        const content = await response.text();

        // Regular expression to extract URLs from the content
        const urlRegex = /https?:\/\/[^\s"]+/g;
        const extractedUrls = content.match(urlRegex) || [];

        
        // Filter, map, and reduce to get unique URLs excluding those from filteredStrings
        const indexedUrls = extractedUrls
          .filter(url => !filteredStrings.some(keyword => url.includes(keyword)))
          .map((url, index) => ({ index: index + 1, url, rootDomain: new URL(url).origin }))
          .reduce((uniqueUrls, entry) => {
            if (!uniqueUrls.some(url => url.rootDomain === entry.rootDomain)) {
              uniqueUrls.push(entry);
            }
            return uniqueUrls;
          }, []);

        setFoundUrls(oldFoundUrls => [...oldFoundUrls, indexedUrls]);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    setFoundUrls([]);
    const numPages = Math.ceil(numResults / 10);
    for (let i = 0; i < numPages; i++) {
      fetchData(i);
    }
  }, [numResults, isSearchClicked]);



  // Utility function to validate the entered domain
  const validateUrl = (url) => {
    const urlRegex = /^[^.]+\.[a-z.]{2,6}$/;
    return urlRegex.test(url);
  };

  // Handler to update the domain state and validate it
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setUrlKeyword(url);
    if (!validateUrl(url)) {
      setUrlError("Invalid URL! Please only type your domain name without 'https://' or 'www.'")
    } else {
      setUrlError(null);
    }
  };


  // Handler to initiate the search and filter the found URLs by the entered domain
  const handleSearch = () => {

    if (keywordInput) {
      return;
    }

    setIsSearchClicked(true);

    // Processing the found URLs
    const processedResults = [];

    foundUrls.forEach((urlsArray, pageNum) => {
      urlsArray.forEach((urlObj, index) => {
        const rankPosition = index + 1 + pageNum * 10;
        processedResults.push({
          display: `${urlObj.rootDomain} ---------- Rank: ${rankPosition}`,
          rank: rankPosition
        });
      });
    });

    const filteredResults = processedResults.filter(urlObj => 
      urlObj.display.includes(urlKeyword));
  
    
    setSearchResults(filteredResults);
  };

  return (
    <div className="App">
      <h1>Welcome to the automation App</h1>
      <div>
        <h3>Results count that you want to enquire</h3>
        <input
          className='input-number'
          type="number"
          min="10"
          max="50"
          step="10"
          value={numResults}
          onChange={(e) => setNumReults(Number(e.target.value))}
        />
      </div>
      <div>
        <div>
          <h3>Keywords</h3>
          <input 
            className='input-text'
            type='text'
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
          />
        </div>
        <h3>Your website</h3>
        <input
          className='input-text'
          type="text"
          value={urlKeyword}
          onChange={handleUrlChange}
        />
        {urlError && <p style={{color: 'red'}}>{urlError}</p>}
      </div>
      <div>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {(searchResults.length > 0 && urlKeyword) && (
          <div>
            <h2>Search Results</h2>
            <div className='f-rank'>
              <p>Final Ranks: {searchResults.map(urlObj => urlObj.rank).join(', ')}</p>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Rankings</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((urlObj, index) => (
                    <tr key={index}>
                      <td><strong>{urlObj.display}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/*
      <div>
        {foundUrls.map((urls, pageNum) => (
          urls.length > 0 && (
            <div key={pageNum}>
              <h2>Found URLs for page {pageNum + 1}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Root Domain</th>
                  </tr>
                </thead>
                <tbody>
                  {urls.map((entry, newIndex) => (
                    <tr key={entry.index}>
                      <td>{newIndex + 1}</td>
                      <td>{entry.rootDomain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ))}
      </div>
      */}
    </div>
  );
}

export default App;