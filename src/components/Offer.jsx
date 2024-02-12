import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { getImageURL } from "../helpers/all";

const Offer = ({ data }) => {
  return (
    <figure className="offer">
      <LazyLoadImage src="/images/img2.jpg" alt="offer" loading="lazy" />
      {/* {data?.medias && (
        <LazyLoadImage
          src={getImageURL({
            path: data.medias,
            type: "sale",
            size: "full",
          })}
          // src="/images/img.jpg"
          alt={data?.title}
          loading="lazy"
        />
      )} */}
      <figcaption>
        {/* <Link
          to={
            data?.options?.link
              ? data.options.link
              : data?.id
              ? "/promo/" + data.id
              : ""
          }
          className="btn-light"
        >
          Заказать
        </Link> */}
        <Link to="/promo/1" className="btn-light">
          Заказать
        </Link>
      </figcaption>
    </figure>
  );
};

export default Offer;
