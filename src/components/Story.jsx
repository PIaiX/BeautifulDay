import React from "react";
import { getImageURL } from "../helpers/all";

const Story = ({ data, ...props }) => {
  const image = getImageURL({ path: data.medias, size: "mini", type: "story" });
  return (
    <figure className="story" onClick={props.onClick}>
      <img src={image} alt={data.title} />
      <figcaption>{data.title}</figcaption>
    </figure>
  );
};

export default Story;
