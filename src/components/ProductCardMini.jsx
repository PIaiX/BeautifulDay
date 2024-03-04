import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { customPrice, customWeight, getImageURL } from "../helpers/all";
import ButtonCart from "./ButtonCart";

const ProductCardMini = memo(({ data }) => {
  var price = data?.price ?? 0;
  if (Array.isArray(data?.modifiers) && data?.modifiers?.length > 0) {
    var price = Math.min(...data.modifiers.map((item) => item.price));
  }

  const image = getImageURL({
    path: data.medias,
    type: "product",
    size: "full",
  });
  return (
    <figure className="product-card-mini">
      <Link to="/product">
        <LazyLoadImage src={image} alt={data.title} loading="lazy" />
      </Link>
      <figcaption>
        <div>
          <h6>
            <Link to="/product">{data.title}</Link>
          </h6>
          <p className="d-none d-lg-block gray">
            {customWeight(data.energy.weight)}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="d-lg-none gray">{customWeight(data.energy.weight)}</p>
          <p className="d-none d-lg-block fw-6">
            {data?.modifiers?.length > 0
              ? "от " + customPrice(price)
              : customPrice(price)}
          </p>
          <ButtonCart product={data} />
        </div>
      </figcaption>
    </figure>
  );
});

export default ProductCardMini;
