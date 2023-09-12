import React, { memo } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import AppStore from "../assets/imgs/appstore.svg";
import GooglePlay from "../assets/imgs/googleplay.svg";
import LogoTextWhite from "../assets/imgs/logo-text-white.svg";
import LogoWhite from "../assets/imgs/logo-white.svg";
import useIsMobile from "../hooks/isMobile";
import BellIcon from "./svgs/BellIcon";
import CartIcon from "./svgs/CartIcon";
import FlameIcon from "./svgs/FlameIcon";
import HomeIcon from "./svgs/HomeIcon";
import UserIcon from "./svgs/UserIcon";

const Footer = memo(() => {
  const isMobileLG = false;
  const { auth, options } = useSelector(({ auth, settings: { options } }) => ({
    auth,
    options,
  }));

  return (
    <footer>
      <Container className="h-100">
        {isMobileLG ? (
          <nav className="h-100 mobile">
            <ul>
              <li>
                <NavLink to="/">
                  <HomeIcon />
                  <div className="text ms-2 fs-09">
                    <span>Главная</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/notifications">
                  <BellIcon />
                  <div className="text ms-2 fs-09">
                    <span>Уведомления</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/promo">
                  <FlameIcon />
                  <div className="text ms-2 fs-09">
                    <span>Акции</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart">
                  <CartIcon />
                  <div className="text ms-2 fs-09">
                    <span>Корзина</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to={auth.isAuth ? "/account" : "/login"}>
                  <UserIcon size={50} />
                  <div className="text ms-2 fs-09">
                    <span>Аккаунт</span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </nav>
        ) : (
          <div className="desktop">
            <img src={LogoWhite} alt="yoo.app" className="logo" />

            <nav>
              <ul className="list-unstyled d-flex">
                <li className="me-4">
                  <Link to="/contact">Контакты</Link>
                </li>
                <li>
                  <Link to="/">Политика конфиденциальности</Link>
                </li>
              </ul>
            </nav>

            <div>
              <p>Заказывать через приложение ещё удобнее</p>
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

            <div>
              <a href="https://yooapp.ru/" target="_blank">
                <div>Разработано на платформе</div>
                <img
                  src={LogoTextWhite}
                  alt="yoo.app"
                  className="d-block mt-2"
                />
              </a>
            </div>
          </div>
        )}
      </Container>
    </footer>
  );
});

export default Footer;
