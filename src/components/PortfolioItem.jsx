import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { getImageURL } from "../helpers/all";

const PortfolioItem = ({ data }) => {
  return (
    <figure className="offer">
      <LazyLoadImage src="/images/img2.jpg" alt="offer" loading="lazy" />
      <figcaption>
        <Link to="/promo/1" className="btn-light">
          Заказать
        </Link>
      </figcaption>
    </figure>
  );
};

export default PortfolioItem;
