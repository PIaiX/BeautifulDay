import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { getImageURL } from "../helpers/all";

const PortfolioItem = ({ data }) => {
  return (
    <Link to={"/portfolio/" + data.id}>
      <figure className="offer mb-4">
        <LazyLoadImage
          src={getImageURL({
            path:
              data?.medias?.length > 0
                ? data.medias.filter((e) => e.main)[0]?.media
                : false,
            type: "portfolio",
          })}
          alt="offer"
          loading="lazy"
        />
        <figcaption className="d-flex align-items-center">
          <Link to={"/portfolio/" + data.id} className="btn-light">
            Перейти
          </Link>
        </figcaption>
      </figure>
    </Link>
  );
};

export default PortfolioItem;
