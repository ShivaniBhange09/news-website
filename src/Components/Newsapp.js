import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll
import Card from "./Card";

const NewsApp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const API_KEY = "a9c3bf83fd154d66aa3527155165c567";

  const getData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}&page=${page}&pageSize=20`
      );
      const jsonData = await response.json();

      if (jsonData.articles && Array.isArray(jsonData.articles)) {
        if (jsonData.articles.length === 0) {
          setHasMore(false);
        } else {
          setNewsData((prevData) => [...prevData, ...jsonData.articles]);
        }
      } else {
        console.error("No articles found or articles is not an array");
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [page]); // Fetch data whenever the page changes

  const handleInput = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  const userInput = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <nav>
        <div>
          <h1>InfoSphere</h1>
        </div>
        <ul style={{ display: "flex", gap: "11px" }}>
          <a style={{ fontWeight: 600, fontSize: "17px" }}>
            Get your daily dose of News!
          </a>
          {/* <a style={{ fontWeight: 600, fontSize: "17px" }}>Trending</a> */}
        </ul>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
          />
          <button onClick={getData}>Search</button>
        </div>
      </nav>
      <div>
        <p className="head">Stay Updated with InfoSphere</p>
      </div>
      <div className="categoryBtn">
        <button onClick={userInput} value="sports">
          Sports
        </button>
        <button onClick={userInput} value="politics">
          Politics
        </button>
        <button onClick={userInput} value="entertainment">
          Entertainment
        </button>
        <button onClick={userInput} value="health">
          Health
        </button>
        <button onClick={userInput} value="fitness">
          Fitness
        </button>
      </div>

      <InfiniteScroll
        dataLength={newsData.length}
        next={() => {
          setPage((prevPage) => prevPage + 1);
          getData(); // Fetch more data
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more news available</p>}
      >
        <div>{newsData.length > 0 ? <Card data={newsData} /> : null}</div>
      </InfiniteScroll>
    </div>
  );
};

export default NewsApp;
