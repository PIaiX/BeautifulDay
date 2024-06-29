import React, { useLayoutEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProductCard from "../components/ProductCard";
// import BtnFav from "../components/utils/BtnFav";

// icons & images
import { Link, useParams } from "react-router-dom";
import ButtonCart from "../components/ButtonCart";
import Empty from "../components/Empty";
import { ReactComponent as EmptyCatalog } from "../components/empty/catalog.svg";
import Meta from "../components/Meta";
import Loader from "../components/utils/Loader";
import NavTop from "../components/utils/NavTop";
import { customPrice, getImageURL } from "../helpers/all";
import { getProduct } from "../services/product";

// swiper
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperButtonNext from "../components/utils/SwiperButtonNext";
import SwiperButtonPrev from "../components/utils/SwiperButtonPrev";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Callback from "../components/modals/Callback";
import { useSelector } from "react-redux";

const groupByCategoryIdToArray = (modifiers) => {
  const grouped = modifiers.reduce((acc, modifier) => {
    const { categoryId } = modifier;
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(modifier);
    return acc;
  }, {});

  return Object.keys(grouped).map((key, index) => ({
    categoryId: key ?? index,
    modifiers: grouped[key].sort((a, b) => a?.price - b?.price),
  }));
};

const Product = () => {
  const [featuresShow, setFeaturesShow] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { productId } = useParams();
  const multiBrand = useSelector((state) => state.settings.options.multiBrand);
  const title = useSelector((state) => state.settings.options?.title);
  const selectedAffiliate = useSelector((state) => state.affiliate.active);
  const [isRemove, setIsRemove] = useState(false);

  const productEnergyVisible = useSelector(
    (state) => state.settings.options.productEnergyVisible
  );

  const [product, setProduct] = useState({
    loading: true,
    item: {},
  });

  const [data, setData] = useState({
    cart: {
      data: {
        modifiers: [],
        additions: [],
        wishes: [],
      },
    },
  });

  const [prices, setPrices] = useState({
    price: 0,
    discount: 0,
  });

  const onLoad = () => {
    getProduct({
      id: productId,
      affiliateId: selectedAffiliate?.id ?? false,
      view: multiBrand,
      type: "site",
    })
      .then((res) => {
        const modifiers =
          res?.modifiers?.length > 0
            ? groupByCategoryIdToArray(res.modifiers)
            : [];
        setProduct({
          loading: false,
          item: {
            ...res,
            modifiers: modifiers,
          },
        });

        data.cart.data.modifiers =
          modifiers?.length > 0 ? modifiers.map((e) => e.modifiers[0]) : [];
        setData(data);
      })
      .catch(() => setProduct((data) => ({ ...data, loading: false })));
  };

  useLayoutEffect(() => {
    onLoad();
  }, [productId, selectedAffiliate]);

  useLayoutEffect(() => {
    if (product.item) {
      let price = 0;
      let discount = 0;
      if (data.cart.data?.modifiers?.length > 0) {
        if (product.item?.options?.modifierPriceSum) {
          price +=
            data.cart.data.modifiers.reduce(
              (sum, item) => sum + item.price,
              0
            ) + product.item.price;
        } else {
          price += data.cart.data.modifiers.reduce(
            (sum, item) => sum + item.price,
            0
          );
        }
      } else {
        price += product.item.price;
      }

      if (data.cart.data?.modifiers?.length > 0) {
        if (product.item?.options?.modifierPriceSum) {
          discount +=
            data.cart.data.modifiers.reduce(
              (sum, item) => sum + item.discount,
              0
            ) + product.item.discount;
        } else {
          discount += data.cart.data.modifiers.reduce(
            (sum, item) => sum + item.discount,
            0
          );
        }
      } else {
        discount += product.item.discount;
      }

      if (data.cart.data?.additions?.length > 0) {
        price += data.cart.data.additions.reduce(
          (sum, item) => sum + item.price,
          0
        );
      }
      setPrices({ price, discount });
    }
  }, [data, product.item]);

  if (product?.loading) {
    return <Loader full />;
  }

  if (!product?.item?.id) {
    return (
      <Empty
        text={"Такого товара нет"}
        desc={"Возможно вы перепутали ссылку"}
        image={() => <EmptyCatalog />}
        button={
          <Link className="btn-primary" to="/">
            {"Перейти в меню"}
          </Link>
        }
      />
    );
  }

  return (
    <main>
      <Meta
        title={`${
          selectedAffiliate?.title ? selectedAffiliate?.title : title
        } — ${product?.item?.title}`}
        description={`${
          selectedAffiliate?.title ? selectedAffiliate?.title : title
        } — ${product?.item?.title}`}
        image={
          product?.item?.medias[0]?.media
            ? getImageURL({
                path: product.item.medias[0].media,
                size: "full",
                type: "product",
              })
            : false
        }
      />
      <Container>
        <NavTop
          toBack={true}
          breadcrumbs={[
            {
              title: product.item?.category?.title ?? "Нет категории",
              link: product.item?.category?.id
                ? "/category/" + product.item.category.id
                : "/menu",
            },
            {
              title: product.item?.title ?? "Нет названия",
            },
          ]}
        />

        <form className="productPage mb-4 mb-md-5">
          <Row className="gx-4 gx-xl-5">
            <Col xs={12} lg={9}>
              <Row md={2} className="h-100">
                <Col>
                  <div className="productPage-photo">
                    <Swiper
                      className="thumbSlider"
                      modules={[Thumbs, FreeMode]}
                      watchSlidesProgress
                      onSwiper={setThumbsSwiper}
                      direction="vertical"
                      loop={true}
                      spaceBetween={20}
                      slidesPerView={"auto"}
                      freeMode={true}
                    >
                      {product.medias?.length > 0 &&
                        product.medias.map((e) => (
                          <SwiperSlide>
                            <img
                              src={getImageURL({
                                path: e.media,
                                size: "full",
                              })}
                              alt={product.item.title}
                              className="productPage-img"
                            />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                      className="mainSlider"
                      modules={[Thumbs]}
                      loop={true}
                      spaceBetween={20}
                      thumbs={{
                        swiper:
                          thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                      }}
                    >
                      {product.item.medias?.length > 0 &&
                        product.item.medias.map((e) => (
                          <SwiperSlide>
                            <img
                              src={getImageURL({
                                path: e.media,
                                size: "full",
                              })}
                              alt={product.item.title}
                              className="productPage-img"
                            />
                          </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* <BtnFav /> */}
                  </div>
                  {/* <img
                    src={getImageURL({ path: product.medias, size: "full" })}
                    alt={product.title}
                    className="productPage-img"
                  /> */}
                </Col>
                <Col className="d-flex flex-column justify-content-between">
                  <div>
                    <h1>{product.item.title}</h1>
                    {product.item.code && <p>Артикул: {product.item.code}</p>}
                  </div>

                  {product?.item?.modifiers?.length > 0 &&
                    product.item.modifiers.map((modifier) => (
                      <>
                        {modifier.modifiers?.length > 3 ? (
                          <div className="mb-4">
                            <Select
                              data={modifier.modifiers.map((e) => ({
                                title: e.title,
                                value: e,
                              }))}
                              onClick={(e) => {
                                let newData = { ...data };
                                let isModifierIndex =
                                  newData.cart.data.modifiers.findIndex(
                                    (item) =>
                                      item?.categoryId === e.value.categoryId ||
                                      item?.categoryId === 0
                                  );
                                if (isModifierIndex != -1) {
                                  newData.cart.data.modifiers[isModifierIndex] =
                                    e.value;
                                } else {
                                  newData.cart.data.modifiers.push(e.value);
                                }
                                setData(newData);
                              }}
                            />
                          </div>
                        ) : (
                          modifier?.modifiers?.length > 0 && (
                            <div className="d-xxl-flex mb-4">
                              <ul className="inputGroup d-flex w-100">
                                {modifier.modifiers.map((e, index) => (
                                  <li className="d-flex text-center w-100">
                                    <label>
                                      <input
                                        type="radio"
                                        name={e.categoryId ?? 0}
                                        defaultChecked={index === 0}
                                        onChange={() => {
                                          let newData = { ...data };
                                          let isModifierIndex =
                                            newData.cart.data.modifiers.findIndex(
                                              (item) =>
                                                item?.categoryId ===
                                                  e.categoryId ||
                                                item?.categoryId === 0
                                            );
                                          if (isModifierIndex != -1) {
                                            newData.cart.data.modifiers[
                                              isModifierIndex
                                            ] = e;
                                          } else {
                                            newData.cart.data.modifiers.push(e);
                                          }
                                          setData(newData);
                                        }}
                                      />
                                      <div className="text">{e.title}</div>
                                    </label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </>
                    ))}

                  <div className="productPage-price">
                    <div className="me-2 me-xl-3">
                      <div className="fs-12">{customPrice(prices.price)}</div>
                      {prices.discount > 0 && (
                        <div className="gray fs-09 text-decoration-line-through">
                          {customPrice(prices.discount)}
                        </div>
                      )}
                    </div>
                    {prices.price > 0 ? (
                      <ButtonCart
                        full
                        product={product.item}
                        data={data}
                        className="btn-primary ms-2 ms-xl-3"
                      >
                        Заказать
                      </ButtonCart>
                    ) : (
                      <>
                        <button
                          onClick={() => setShowFeedback(true)}
                          type="button"
                          className="btn-secondary"
                        >
                          <HiOutlineShoppingBag className="fs-15" />
                          <span className="ms-2">Заказать</span>
                        </button>
                        <Callback
                          show={showFeedback}
                          product={product.item}
                          setShow={setShowFeedback}
                        />
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
            {/* <Col
              xs={12}
              lg={3}
              className="d-none d-lg-block mt-3mt-sm-4 mt-md-0"
            >
              <div className="box">
                <h6 className="secondary">Доставка:</h6>
                <p className="fs-09 dark-gray">
                  По Казани осуществляется по договорённости с курьером.
                  Минимальная сумма заказа 400 ₽
                </p>
                <p className="fs-09 dark-gray">
                  По России через компанию CDEK или почтой России
                </p>
                <h6 className="mt-4 secondary">Самовывоз:</h6>
                <p className="fs-09 dark-gray">
                  Магазин по адресу: Татарстан, Казань, Рашида Вагопова 3
                </p>
                {options?.payments && (
                  <>
                    <h6 className="mt-4 secondary">Оплата:</h6>
                    <p className="fs-09 dark-gray">
                      {options?.payments?.cash && " Наличными "}
                      {options?.payments?.card && " Банковской картой "}
                      {options?.payments?.online && " Онлайн "}
                    </p>
                  </>
                )}
              </div>
            </Col> */}
          </Row>
        </form>

        <section className="mb-4 mb-md-5">
          <ul className="tabs">
            <li>
              <button
                type="button"
                onClick={() => setFeaturesShow(false)}
                className={featuresShow ? "" : "active"}
              >
                Описание
              </button>
            </li>
            {/* <li>
              <button
                type="button"
                onClick={() => setFeaturesShow(true)}
                className={featuresShow ? "active" : ""}
              >
                Характеристики
              </button>
            </li> */}
          </ul>
          {featuresShow ? (
            <ul className="features px-2 py-3 p-sm-4">
              <li>
                <div>Тип</div>
                <div>Печать</div>
              </li>
              <li>
                <div>Формат</div>
                <div>Ручная</div>
              </li>
              <li>
                <div>Особенности</div>
                <div>Подушка в комплекте</div>
              </li>
            </ul>
          ) : (
            <div className="p-2 p-sm-4 lh-15">{product.item.description}</div>
          )}
        </section>

        {product.item?.recommends?.length > 0 && (
          <section className="mb-6">
            <h2>Вам пригодится</h2>
            <div className="position-relative">
              <Swiper
                className="position-static"
                modules={[Navigation]}
                spaceBetween={15}
                slidesPerView={2}
                breakpoints={{
                  576: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  992: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                  1200: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },
                }}
              >
                {product.item.recommends.map((e) => (
                  <SwiperSlide>
                    <ProductCard data={e} />
                  </SwiperSlide>
                ))}
                <SwiperButtonPrev />
                <SwiperButtonNext />
              </Swiper>
            </div>
          </section>
        )}
      </Container>
    </main>
  );
};

export default Product;
