import React, { memo } from "react";
import WidgetBanners from "./widget/WidgetBanners";
import WidgetBlogs from "./widget/WidgetBlogs";
import WidgetContact from "./widget/WidgetContact";
import WidgetProjects from "./widget/WidgetProjects";
import WidgetSales from "./widget/WidgetSales";
import WidgetServices from "./widget/WidgetServices";
import WidgetStories from "./widget/WidgetStories";
import WidgetPopular from "./widget/WidgetPopular";
import WidgetCategories from "./widget/WidgetCategories";
import WidgetHello from "./widget/WidgetHello";
import WidgetAbout from "./widget/WidgetAbout";

const Widgets = memo(({ data }) => {
  return data?.length > 0
    ? data.map((e) =>
        e?.value == "services" ? (
          <WidgetServices {...e} />
        ) : e?.value == "hello" ? (
          <WidgetHello {...e} />
        ) : e?.value == "projects" ? (
          <WidgetProjects {...e} />
        ) : e?.value == "categories" ? (
          <WidgetCategories {...e} />
        ) : e?.value == "contact" ? (
          <WidgetContact {...e} />
        ) : e?.value == "popular" ? (
          <WidgetPopular {...e} />
        ) : e?.value == "stories" ? (
          <WidgetStories {...e} />
        ) : e?.value == "sales" ? (
          <WidgetSales {...e} />
        ) : e?.value == "banners" ? (
          <WidgetBanners {...e} />
        ) : e?.value == "about" ? (
          <WidgetAbout {...e} />
        ) : e?.value == "blogs" ? (
          <WidgetBlogs {...e} />
        ) : null
      )
    : null;
});

export default Widgets;
