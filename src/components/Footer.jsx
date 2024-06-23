import React, { memo } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import AppStore from "../assets/imgs/appstore.svg";
import GooglePlay from "../assets/imgs/googleplay.svg";
import { getCount, getImageURL } from "../helpers/all";
import CartIcon from "./svgs/CartIcon";
import FlameIcon from "./svgs/FlameIcon";
import HomeIcon from "./svgs/HomeIcon";
import UserIcon from "./svgs/UserIcon";
import { useTranslation } from "react-i18next";

const Footer = memo(() => {
  const { t } = useTranslation();

  const isAuth = useSelector((state) => state.auth.isAuth);
  const cart = useSelector((state) => state.cart.items);
  const options = useSelector((state) => state.settings.options);
  const count = getCount(cart);

  return (
    <footer>
      <Container className="h-100">
        <nav className="h-100 mobile d-lg-none">
          <ul>
            <li>
              <NavLink to="/">
                <HomeIcon />
                <div className="text fs-09">
                  <span>{t("Главная")}</span>
                </div>
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/notifications">
                <BellIcon />
                <div className="text fs-09">
                  <span>&nbsp;Уведомления</span>
                </div>
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/promo">
                <FlameIcon />
                <div className="text fs-09">
                  <span>{t("Акции")}</span>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="position-relative">
                <CartIcon />
                <div className="text fs-09">
                  <span>{t("Корзина")}</span>
                </div>
                {count > 0 && (
                  <span className="position-absolute translate-middle badge rounded-pill">
                    {count}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to={isAuth ? "/account" : "/login"}>
                <UserIcon size={50} />
                <div className="text fs-09">
                  <span>{t("Аккаунт")}</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="desktop d-none d-lg-flex">
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
          <nav>
            <ul className="list-unstyled d-flex">
              <li className="me-4">
                <Link to="/contact">{t("Контакты")}</Link>
              </li>
              <li>
                <Link to="/policy">{t("Политика конфиденциальности")}</Link>
              </li>
            </ul>
          </nav>
          {options?.appYes && (
            <div>
              <p>{t("Заказывать через приложение ещё удобнее")}</p>
              <ul className="list-unstyled d-flex mt-2">
                <li>
                  <a href="/">
                    <img src={AppStore} alt="App Store" />
                  </a>
                </li>
                <li className="ms-3">
                  <a href="/">
                    <img src={GooglePlay} alt="Google Play" />
                  </a>
                </li>
              </ul>
            </div>
          )}
          {!options?.copyright && (
            <div>
              <a href="https://yooapp.ru" target="_blank">
                <div>
                  {t("Разработано на платформе")} <b>YooApp</b>
                </div>
                {/* <img src={LogoTextWhite} alt="yooapp" className="d-block mt-2" /> */}
              </a>
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
});

export default Footer;
