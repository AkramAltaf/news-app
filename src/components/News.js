import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

const News = ({ country, category, pageSize }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const fetchNews = async () => {
    setLoading(true);

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f615a406657f4806a3be2dc82f09acac&page=${page}&pageSize=${pageSize}`;

    const data = await fetch(url);
    const parsedData = await data.json();
    setLoading(false);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    // setPageSize(pageSize);
    document.title = `${capitalizeTitle(category)} - Daily News`;
    setPage(page);
  };

  const capitalizeTitle = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleNextClick = async () => {
    setPage((page) => page + 1);
  };

  const handlePrevClick = async () => {
    setPage((page) => page - 1);
  };

  useEffect(() => {
    fetchNews();
  }, [page]);

  return (
    <>
      <div className="container my-5">
        <h1 className="text-center my-3">
          Daily News - Top {capitalizeTitle(category)} headlines
        </h1>
        <div className="row">
          {loading ? (
            <Spinner />
          ) : (
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://img.etimg.com/thumb/msid-89006925,width-1070,height-580,imgsize-31588,overlay-economictimes/photo.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / pageSize)}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 10,
};

export default News;
