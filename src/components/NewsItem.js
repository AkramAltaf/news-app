import React from "react";

const NewsItem = ({
  title,
  description,
  imageUrl,
  newsUrl,
  author,
  date,
  source,
}) => {
  return (
    <div className="card my-3">
      <span
        className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
        style={{ zIndex: "99", left: "90%" }}
      >
        {source}
      </span>
      <img src={imageUrl} className="card-img-top" alt="News" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <small className="text-muted">
            By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}
          </small>
        </p>
        <a
          rel="noreferrer"
          href={newsUrl}
          target="_blank"
          className="btn btn-sm btn-primary"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
