import { ClientJS } from "clientjs";
import { Helmet } from "react-helmet";

const Meta = ({
  title = null,
  description = null,
  image = null,
  type = "website",
}) => {
  const client = new ClientJS();

  return (
    <Helmet
      htmlAttributes={{ lang: client.getLanguage() }}
      defaultTitle={process.env.REACT_APP_SITE_NAME}
      encodeSpecialCharacters={true}
      title={title ?? process.env.REACT_APP_SITE_NAME}
      meta={[
        {
          property: "title",
          content: title ?? process.env.REACT_APP_SITE_NAME,
        },
        description?.length > 0 && {
          name: "description",
          content: description.slice(0, 160),
        },
        {
          property: "og:title",
          content: title ?? process.env.REACT_APP_SITE_NAME,
        },
        description?.length > 0 && {
          property: "og:description",
          content: description.slice(0, 160),
        },
        {
          property: "og:type",
          content: type,
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:title",
          content: title ?? process.env.REACT_APP_SITE_NAME,
        },
        description?.length > 0 && {
          name: "twitter:description",
          content: description.slice(0, 160),
        },
        image?.length > 0 && {
          name: "og:image",
          content: image,
        },
      ]}
    />
  );
};

export default Meta;
