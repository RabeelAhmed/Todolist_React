import React from "react";

export default function MenuCard({ menuData }) {
  return (
    <>
      <section className="main-card--cointainer">
        {menuData.map((curElem) => {

          const {id, name, category, image, description} = curElem
          return (
            <>
              <div className="card-container">
                <div className="card">
                  <div className="card-body">
                    <span className="card-number card-circle subtle">
                      {id}
                    </span>
                    <span className="card-author subtle">{category}</span>
                    <h2 className="card-title">{name}</h2>
                    <span className="card-description subtle">
                      {description}
                    </span>
                    <div className="card-read">Read</div>
                  </div>
                  <img src={image} className="card-media" alt="images" />
                  <span className="card-tag subtle">Order Now</span>
                </div>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
}
