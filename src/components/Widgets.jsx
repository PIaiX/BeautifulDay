import React, { memo } from "react";
import WidgetBlogs from "./widget/WidgetBlogs";
import WidgetContact from "./widget/WidgetContact";
import WidgetProjects from "./widget/WidgetProjects";
import WidgetSales from "./widget/WidgetSales";
import WidgetServices from "./widget/WidgetServices";

const Widgets = memo(({ data }) => {
  return data?.length > 0
    ? data.map((e) =>
        e.value == "services" ? (
          <WidgetServices {...e} />
        ) : e.value == "projects" ? (
          <WidgetProjects {...e} />
        ) : e.value == "contact" ? (
          <WidgetContact {...e} />
        ) : e.value == "sales" ? (
          <WidgetSales {...e} />
        ) : e.value == "banners" ? (
          <WidgetContact {...e} />
        ) : e.value == "blogs" ? (
          <WidgetBlogs {...e} />
        ) : null
      )
    : null;
});

export default Widgets;
