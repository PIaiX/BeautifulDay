import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { getImageURL } from "../helpers/all";

const Offer = ({ data }) => {
  return (
    <div className="offer">
      {data?.medias && (
        <LazyLoadImage
          src={getImageURL({
            path: data.medias,
            type: "sale",
            size: "full",
          })}
          alt={data?.title}
          loading="lazy"
        />
      )}
      <div className="offer-body">
        <div>
          {data?.title && (
            <h5 className={data?.blackText ? "black" : ""}>{data.title}</h5>
          )}
          {data?.desc && (
            <h6 className={data?.blackText ? "black fw-4" : "fw-4"}>
              {data.desc}
            </h6>
          )}
        </div>
        <Link
          to={
            data?.options?.link
              ? data.options.link
              : data?.id
              ? "/promo/" + data.id
              : ""
          }
          className="btn btn-light"
        >
          Перейти
        </Link>
      </div>
    </div>
  );
};

export default Offer;
