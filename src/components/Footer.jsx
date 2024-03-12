import React, { memo } from "react";
import Container from "react-bootstrap/Container";
import * as Icons from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getImageURL } from "../helpers/all";
import useIsMobile from "../hooks/isMobile";
import CartIcon from "./svgs/CartIcon";
import CatalogIcon from "./svgs/CatalogIcon";
import FlameIcon from "./svgs/FlameIcon";

const Icon = ({ name }) => {
  const IoIcon = Icons[name];

  if (!IoIcon) return <p>Icon not found!</p>;

  return <IoIcon />;
};

const Footer = memo(() => {
  const isMobileLG = useIsMobile("991px");
  const isAuth = useSelector((state) => state.auth.isAuth);
  const options = useSelector((state) => state.settings.options);

  return (
    <footer>
      <Container className="h-100">
        {isMobileLG ? (
          <nav className="h-100 mobile">
            <ul>
              <li>
                <NavLink to="/">
                  <Icon name="IoHomeOutline" />
                  <div className="text">
                    <span>Главная</span>
                  </div>
                </NavLink>
              </li>
              {options?.menu?.length > 0 ? (
                options.menu.map(
                  (e) =>
                    e?.status &&
                    e?.mobile && (
                      <li>
                        <NavLink to={e?.link ?? e.page}>
                          {e.icon && <Icon name={e.icon} />}
                          {e.title && (
                            <div className="text">
                              <span>{e.title}</span>
                            </div>
                          )}
                        </NavLink>
                      </li>
                    )
                )
              ) : (
                <>
                  <li>
                    <NavLink to="/categories">
                      <CatalogIcon />
                      <div className="text">
                        <span>Каталог</span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/promo">
                      <FlameIcon />
                      <div className="text">
                        <span>Акции</span>
                      </div>
                    </NavLink>
                  </li>
                  {options?.cart && (
                    <li>
                      <NavLink to="/cart">
                        <CartIcon />
                        <div className="text">
                          <span>Корзина</span>
                        </div>
                      </NavLink>
                    </li>
                  )}
                </>
              )}
              <li>
                <NavLink to={isAuth ? "/account" : "/login"}>
                  <Icon name="IoPersonOutline" />
                  <div className="text fs-09">
                    <span>Аккаунт</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </nav>
        ) : (
          <div className="desktop">
            <img
              src={
                options?.logo
                  ? getImageURL({
                      path: options.logo,
                      type: "all/web/logo",
                      size: "full",
                    })
                  : "/logo.png"
              }
              alt={options?.title ?? "YOOAPP"}
              className="logo"
            />

            <nav className="ms-5 me-auto">
              <ul className="list-unstyled d-flex">
                <li>
                  <Link className="me-4" to="/">
                    Главная
                  </Link>
                </li>
                {options?.menu?.length > 0 ? (
                  options.menu.map(
                    (e) =>
                      e?.status && (
                        <li>
                          <Link className="me-4" to={e.page}>
                            {e.title}
                          </Link>
                        </li>
                      )
                  )
                ) : (
                  <>
                    <li>
                      <Link to="/categories" className="me-4">
                        Каталог
                      </Link>
                    </li>
                    <li>
                      <Link to="/promo">Акции</Link>
                    </li>
                  </>
                )}
              </ul>
              <Link to="/policy" className="d-inline-block mt-4 me-4">
                Политика конфиденциальности
              </Link>
              <Link to="/contacts" className="d-inline-block mt-4">
                Контакты
              </Link>
            </nav>

            <a href="https://yooapp.ru" target="_blank">
              <div>
                Разработано на платформе <b>YooApp</b>
              </div>
              {/* <img src={LogoTextWhite} alt="yooapp" className="d-block mt-2" /> */}
            </a>
          </div>
        )}
      </Container>
    </footer>
  );
});

export default Footer;
