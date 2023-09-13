import React from "react";
import { Link } from "react-router-dom";

const NavBreadcrumbs = ({ breadcrumbs = false, className = "" }) => {
  return (
    breadcrumbs &&
    breadcrumbs?.length > 0 && (
      <nav className={"breadcrumbs " + className}>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          {breadcrumbs.map((e) => (
            <li>
              <Link to={e.link}>{e.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default NavBreadcrumbs;
