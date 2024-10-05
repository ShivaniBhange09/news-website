import React from "react";

const Card = ({ data }) => {
  return (
    <div className="cardContainer">
      {data.map((curItem, index) => {
        if (!curItem.urlToImage) {
          return null; // Skip items without an image
        } else {
          return (
            <div className="card" key={index}>
              <img src={curItem.urlToImage} alt={curItem.title} />
              <div className="content">
                <a className="title" onClick={() => window.open(curItem.url)}>
                  {curItem.title}
                </a>
                <p>{curItem.description}</p>
                <button onClick={() => window.open(curItem.url)}>
                  Read More
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Card;
