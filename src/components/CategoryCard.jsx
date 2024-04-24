import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import { getImageURL } from "../helpers/all";

const CategoryCard = memo(({ data }) => {
  return (
    <figure className="category-card">
      {/* {image && <img src={image} alt={data.title} />} */}
      <LazyLoadImage
        src={getImageURL({ path: data.media, type: "category" })}
        alt={data.title}
        loading="lazy"
      />
      <figcaption>
        <h6>
          <NavLink to={`/category/${data.id}`} className="stretched-link">
            {data.title}
          </NavLink>
        </h6>
      </figcaption>
    </figure>
  );
});

export default CategoryCard;
