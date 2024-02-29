import React, { memo } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import { customPrice, getImageURL } from "../helpers/all";
import BtnFav from "./utils/BtnFav";

const ProjectItem = memo(({ data }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  var price = data.price ?? 0;

  return (
    <div className="product" key={data.id}>
      <div className="product-img">
        <Link to={"/project/" + data.id}>
          <LazyLoadImage
            src={getImageURL({ path: data.medias })}
            alt={data.title}
            loading="lazy"
          />
        </Link>
      </div>
      <Link to={"/project/" + data.id}>
        <h6 className="text-center text-md-start">{data.title}</h6>
      </Link>
      <Link
        to={"/project/" + data.id}
        className="d-flex justify-content-between align-items-center"
      >
        <div className="fs-11">{customPrice(price)}</div>
        {/* <div>
          <Link to={"/project/" + data.id} className="btn btn-sm btn-primary">
            Подробнее
          </Link>
        </div> */}
      </Link>
    </div>
  );
});

export default ProjectItem;
