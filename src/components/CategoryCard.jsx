import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { getImageURL } from "../helpers/all";

const CategoryCard = memo(({ data }) => {
  const image = data?.media
    ? getImageURL({ path: data.media, type: "category" })
    : false;
  return (
    <figure className="category-card">
      {image && <img src={image} alt={data.title} />}
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
