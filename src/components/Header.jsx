import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  HiOutlineArrowLeftCircle,
  HiOutlineDevicePhoneMobile,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoCall, IoClose, IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import AppStore from "../assets/images/appstore-black.svg";
import GooglePlay from "../assets/images/googleplay-black.svg";
import Phone from "../assets/images/phone.png";
import { DADATA_TOKEN, DADATA_URL_GEO } from "../config/api";
import { getCount, getImageURL } from "../helpers/all";
import { useGetBannersQuery } from "../services/home";
import { setUser } from "../store/reducers/authSlice";
import { editDeliveryCheckout } from "../store/reducers/checkoutSlice";
import DeliveryBar from "./DeliveryBar";
import ScrollToTop from "./ScrollToTop";
import AppDownload from "./svgs/AppDownload";
import CartIcon from "./svgs/CartIcon";
import MenuDelivery from "./svgs/MenuDelivery";
import MenuDocs from "./svgs/MenuDocs";
import MenuIcon from "./svgs/MenuIcon";
import MenuPhone from "./svgs/MenuPhone";
import YooApp from "./svgs/YooApp";
import Select from "./utils/Select";

const Header = memo(() => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.items);
  const favorite = useSelector((state) => state.favorite.items);
  const affiliate = useSelector((state) => state.affiliate.items);
  const options = useSelector((state) => state.settings.options);
  const delivery = useSelector((state) => state.checkout.delivery);
  const banners = useGetBannersQuery();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [isContacts, setIsContacts] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const count = getCount(cart);

  const defaultCityOptions = user?.options ?? null;
  const mainAffiliate =
    affiliate?.length > 0
      ? defaultCityOptions?.city && defaultCityOptions?.citySave
        ? affiliate.find(
            (e) =>
              e.options.city.toLowerCase() ===
              defaultCityOptions.city.toLowerCase()
          )
        : affiliate.find((e) => e.main)
      : false;

  useEffect(() => {
    if (
      affiliate?.length > 1 &&
      !defaultCityOptions?.city &&
      "geolocation" in navigator
    ) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        if (
          position?.coords?.latitude &&
          position?.coords?.longitude &&
          DADATA_TOKEN &&
          DADATA_URL_GEO
        ) {
          let geo = await axios.post(
            DADATA_URL_GEO,
            JSON.stringify({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }),
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Token " + DADATA_TOKEN,
              },
            }
          );
          if (
            geo?.data?.suggestions &&
            geo?.data?.suggestions[0]?.data?.city &&
            affiliate?.length > 0
          ) {
            let city = affiliate.find(
              (e) =>
                e.options.city.toLowerCase() ===
                geo.data.suggestions[0].data.city.toLowerCase()
            );
            if (city) {
              dispatch(
                setUser({
                  ...user,
                  options: {
                    ...user.options,
                    city: city.options.city,
                  },
                })
              );
            }
          }
        }
      });
    }
  }, []);

  return (
    <>
      <header>
        <Container className="h-100">
          <nav className="h-100">
            <Link to="/">
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
              {/* <span className="ms-3 logo-name">
                {options?.title ?? "YOOAPP"}
              </span> */}
            </Link>
            <ul>
              {affiliate.length > 0 && (
                <li>
                  <Link
                    onClick={() => affiliate?.length > 1 && setShowCity(true)}
                    className="main-color"
                  >
                    {affiliate?.length > 1
                      ? defaultCityOptions?.city ?? "Выберите город"
                      : mainAffiliate?.options?.city ?? ""}
                  </Link>
                  {!defaultCityOptions?.citySave &&
                    defaultCityOptions?.city && (
                      <div className="no-city">
                        <p className="mb-3">
                          Ваш город <b>{defaultCityOptions.city}</b>?
                        </p>
                        <div className="d-flex align-items-center justify-content-center">
                          <Link
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => {
                              dispatch(
                                setUser({
                                  ...user,
                                  options: {
                                    ...user.options,
                                    citySave: true,
                                  },
                                })
                              );
                            }}
                          >
                            Да
                          </Link>
                          <Link
                            className="btn btn-sm btn-light"
                            onClick={() => setShowCity(true)}
                          >
                            Нет
                          </Link>
                        </div>
                      </div>
                    )}
                </li>
              )}
            </ul>
            <ul className="text-menu d-none d-lg-flex">
              {options?.menu?.length > 0 ? (
                options.menu.map(
                  (e) =>
                    e?.status && (
                      <li>
                        <NavLink
                          to={e?.link ?? e.page}
                          // className={e.type == "dark" ? "btn-primary" : ""}
                        >
                          {e.title}
                        </NavLink>
                      </li>
                    )
                )
              ) : (
                <>
                  <li>
                    <Link to="/categories">Каталог</Link>
                  </li>
                  <li>
                    <Link to="/promo">Акции</Link>
                  </li>
                </>
              )}
            </ul>
            {mainAffiliate &&
              mainAffiliate?.options?.phone &&
              mainAffiliate?.options?.phone[0] && (
                <a
                  href={"tel:" + mainAffiliate.options.phone[0]}
                  className="phone"
                >
                  <HiOutlineDevicePhoneMobile className="fs-12" />
                  <span className="ms-1">{mainAffiliate.options.phone[0]}</span>
                </a>
              )}
            <ul className="icons-menu">
              {options?.cart && (
                <li className="d-none d-lg-block">
                  <Link to="/cart" className="position-relative">
                    <HiOutlineShoppingBag size={25} />
                    {count > 0 && (
                      <span className="position-absolute top-100 start-100 translate-middle badge rounded-pill">
                        {count}
                      </span>
                    )}
                  </Link>
                </li>
              )}
              {isAuth && (
                <li className="d-none d-lg-block">
                  <Link to="/account/favorites" className="position-relative">
                    <HiOutlineHeart size={25} />
                    {favorite?.length > 0 && (
                      <span className="position-absolute top-100 start-100 translate-middle badge rounded-pill">
                        {favorite?.length}
                      </span>
                    )}
                  </Link>
                </li>
              )}
              <li className="d-none d-lg-block">
                <Link
                  className="btn btn-primary"
                  to={
                    isAuth
                      ? user?.status === 0
                        ? "/activate"
                        : "/account"
                      : "/login"
                  }
                >
                  {isAuth
                    ? user?.status === 0
                      ? "Активировать"
                      : "Профиль"
                    : "Войти"}
                </Link>
              </li>
              <li className="d-lg-none">
                <button
                  type="button"
                  onClick={() => setShowMenu(!showMenu)}
                  className="btn-menu"
                >
                  {showMenu ? <IoCloseOutline /> : <MenuIcon />}
                </button>
              </li>
            </ul>
          </nav>
        </Container>
      </header>

      <DeliveryBar sum={2500} />

      <Offcanvas
        className="offcanvas-menu"
        show={showMenu}
        onHide={() => setShowMenu(false)}
        placement={"end"}
      >
        <Offcanvas.Body>
          <Container className="h-100">
            {banners?.data?.items?.length > 0 && (
              <img
                src={getImageURL({
                  path: banners.data.items[0].medias,
                  type: "banner",
                  size: "full",
                })}
                className="menu-offer"
              />
            )}
            {options?.cart && (
              <Select
                className="my-3"
                data={[
                  {
                    value: "delivery",
                    title: "Доставка",
                  },
                  {
                    value: "pickup",
                    title: "Самовывоз",
                  },
                ]}
                value={delivery}
                onClick={(e) => dispatch(editDeliveryCheckout(e.value))}
              />
            )}
            <nav>
              <ul>
                <li>
                  <Link to="/contacts" onClick={() => setShowMenu(false)}>
                    <MenuPhone />
                    <span>Контакты</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contacts" onClick={() => setShowMenu(false)}>
                    <MenuDelivery />
                    <span>Оплата и доставка</span>
                  </Link>
                </li>
                <li>
                  <Link to="/policy" onClick={() => setShowMenu(false)}>
                    <MenuDocs />
                    <span>Политика конфиденциальности</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <a href="https://yooapp.ru/" target="_blank">
              <p className="gray text-center mt-4 mt-md-5">
                Разработано на платформе YooApp
              </p>
              {/* <p className="text-center mt-2">
                <YooApp />
              </p> */}
            </a>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
      {options?.appYes && (
        <button
          type="button"
          className="appOffer"
          onClick={() => setShowApp(true)}
        >
          <AppDownload />
        </button>
      )}

      <Offcanvas
        className="offcanvas-app"
        show={showApp}
        onHide={() => setShowApp(false)}
        placement={"top"}
      >
        <Offcanvas.Body>
          <Container className="h-100">
            <section className="sec-4 row">
              <div className="col-12 col-md-7">
                <h3>
                  Заказывать стало <br className="d-lg-none" />
                  ещё&nbsp;удобнее!
                </h3>
                <div className="d-flex align-items-center mb-3 mb-lg-4">
                  <button
                    type="button"
                    className="btn-2 fs-20 py-2 px-3 px-lg-4 me-2 me-md-3"
                  >
                    <span className="d-lg-none">—</span>
                    <span className="d-none d-lg-inline">скидка</span>
                    <span> 15%</span>
                  </button>
                  <p className="fs-16">
                    на&nbsp;первый заказ <br />
                    через&nbsp;приложение
                  </p>
                </div>
                <ul className="logotips mb-3 mb-lg-5">
                  <li>
                    <a href="/">
                      <img src={AppStore} alt="App Store" />
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <img src={GooglePlay} alt="Google Play" />
                    </a>
                  </li>
                </ul>
                <p>Акция действует при заказе на сумму от 1 000 ₽</p>
              </div>
              <div className="d-none d-md-block col-5">
                <img src={Phone} alt="Phone" className="phone" />
              </div>
            </section>
            <button
              type="button"
              onClick={() => setShowApp(false)}
              className="offcanvas-app-close"
            >
              <IoClose />
            </button>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
        size="xl"
        centered
        className="city"
        show={showCity}
        onHide={() => setShowCity(false)}
      >
        <Modal.Body className="p-4">
          <img src="/logo.png" className="logo mb-4" />
          <button
            type="button"
            className="btn-close close"
            aria-label="Close"
            onClick={() => setShowCity(false)}
          ></button>
          {affiliate?.length > 0 && (
            <Row>
              {affiliate.map((e, index) => (
                <Col key={index}>
                  <a
                    onClick={() => {
                      dispatch(
                        setUser({
                          ...user,
                          options: {
                            ...user.options,
                            citySave: true,
                            city: e.options.city,
                          },
                        })
                      );
                      setShowCity(false);
                    }}
                    className={
                      "p-2 fw-6" +
                      (e.options.city === defaultCityOptions?.city
                        ? " active"
                        : "")
                    }
                  >
                    {e.options.city}
                  </a>
                </Col>
              ))}
            </Row>
          )}
        </Modal.Body>
      </Modal>
      <ScrollToTop count={count} />
    </>
  );
});

export default Header;
