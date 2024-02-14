import React, { memo } from "react";
import WidgetContact from "./widget/WidgetContact";
import WidgetNews from "./widget/WidgetNews";
import WidgetProjects from "./widget/WidgetProjects";
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
        ) : e.value == "news" ? (
          <WidgetNews {...e} />
        ) : null
      )
    : null;
});

export default Widgets;
