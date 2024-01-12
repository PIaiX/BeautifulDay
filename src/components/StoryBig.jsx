import React from "react";
import { getImageURL } from "../helpers/all";

const StoryBig = ({ data, ...props }) => {
  const image = getImageURL({ path: data.medias, size: "full", type: "story" });
  return (
    <figure className="story-big">
      <img src={image} alt={data.title} />
    </figure>
  );
};

export default StoryBig;
