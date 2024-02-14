import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

import Offer from "../components/Offer";
// import ProductCardMini from "../components/ProductCardMini";
import CategoryCard from "../components/CategoryCard";
import Callback from "../components/modals/Callback";
import StoriesSection from "../components/StoriesSection";
// import ArticleCard from "../components/ArticleCard";
// import EmptyCatalog from "../components/empty/catalog";

import { Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperButtonNext from "../components/utils/SwiperButtonNext";
// import SwiperButtonPrev from "../components/utils/SwiperButtonPrev";

// import ArticlesMore from "../assets/images/articlesMore.jpg";
// import ArticlesCover from "../assets/images/articlesCover.jpg";
// import jsonData from "../data/categories";
// import jsonArticles from "../data/articles";
// import isMobile from "../hooks/isMobile";

// import Empty from "../components/Empty";
import { useSelector } from "react-redux";
import Meta from "../components/Meta";
import Loader from "../components/utils/Loader";
import { getImageURL } from "../helpers/all";
import {
  useGetBannersQuery,
  useGetCategoriesQuery,
  useGetSalesQuery,
  useGetStoriesQuery,
} from "../services/home";
import Widgets from "../components/Widgets";

const Home = () => {
  const banners = useGetBannersQuery();
  const sales = useGetSalesQuery();
  const stories = useGetStoriesQuery();
  const categories = useGetCategoriesQuery();
  const options = useSelector((state) => state.settings.options);

  if (
    categories.isLoading ||
    sales.isLoading ||
    banners.isLoading ||
    stories.isLoading
  ) {
    return <Loader full />;
  }

  // if (!Array.isArray(categories.data) || categories.data.length <= 0) {
  //   return (
  //     <Empty
  //       text="Нет товаров"
  //       desc="Временно товары отсуствуют"
  //       image={() => <EmptyCatalog />}
  //       button={
  //         <a
  //           className="btn-primary"
  //           onСlick={() => {
  //             location.reload();
  //             return false;
  //           }}
  //         >
  //           Обновить страницу
  //         </a>
  //       }
  //     />
  //   );
  // }

  return (
    <main className="pb-0">
      <Meta
        title={options?.title ?? "Главная"}
        description={options?.description}
      />
      {banners?.data?.items?.length > 0 && (
        <section className="sec-1 mb-6">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-11 col-lg-9 col-xl-8">
                <Swiper
                  className="main-slider paginated"
                  modules={[Pagination]}
                  loop={true}
                  spaceBetween={15}
                  slidesPerView={1}
                  initialSlide={0}
                  loopedSlides={1}
                  centeredSlides={true}
                  speed={750}
                  pagination={{ clickable: true }}
                >
                  {banners.data.items.map((e, index) => (
                    <SwiperSlide key={index}>
                      <Link>
                        <img
                          src={getImageURL({
                            path: e?.medias,
                            type: "banner",
                            size: "full",
                          })}
                          alt={e?.title}
                          className="img-fluid"
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      )}
      {stories?.data?.items?.length > 0 && (
        <section className="sec-2 mb-6">
          <Container className="position-relative">
            <StoriesSection data={stories.data.items} />
          </Container>
        </section>
      )}

      {options?.widget?.length > 0 && <Widgets data={options.widget} />}

      {/* <section className="sec-3">
        <Container>
          <Row className="justify-content-end">
            <Col xs={12} md={8} lg={6}>
              <h2 className="text-center">
                Сделайте праздник по‑настоящему ярким
              </h2>
              <p className="text-center">
                Скорее заказывайте воздушные шары, они понравятся как взрослым,
                так и малышам
              </p>
              <Callback
                btnText={"Заказать"}
                btnClass={"btn-info mx-auto mt-4"}
              />
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* {Array.isArray(categories.data) && categories.data.length > 0 && (
        <section className="sec-4 mb-6">
          <Container>
            <h2 className="mb-0">Часто заказывают</h2>
            <div className="position-relative">
              <Swiper
                className="product-slider"
                spaceBetween={15}
                slidesPerView={"auto"}
                speed={750}
                breakpoints={{
                  576: {
                    spaceBetween: 20,
                    slidesPerView: "auto",
                  },
                  992: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
              >
                <SwiperSlide>
                  <ProductCardMini />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardMini />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardMini />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardMini />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardMini />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardMini />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardMini />
                </SwiperSlide>
                <SwiperSlide>
                  <ProductCardMini />
                </SwiperSlide>
                <SwiperButtonPrev />
                <SwiperButtonNext />
              </Swiper>
            </div>
          </Container>
        </section>
      )} */}

      {/* <section className="sec-5 mb-6">
        <Container>
          <Row className="gx-4 gy-5">
            <Col xs={12} lg={8} xl={6}>
              <img src={ArticlesCover} alt="Cover" className="cover" />
            </Col>
            {!isMobileLG && (
              <>
                {jsonArticles.map((obj) => {
                  return (
                    <Col key={obj.id} md={4} xl={3}>
                      <ArticleCard data={obj} />
                    </Col>
                  );
                })}
                <Col md={4} xl={3}>
                  <Link to="/articles" className="more">
                    <img src={ArticlesMore} alt="more" className="img" />
                  </Link>
                </Col>
              </>
            )}
          </Row>
          {isMobileLG && (
            <Swiper
              className="articles-slider"
              spaceBetween={20}
              slidesPerView={"auto"}
            >
              {jsonArticles.map((obj) => {
                return (
                  <SwiperSlide key={obj.id}>
                    <ArticleCard data={obj} />
                  </SwiperSlide>
                );
              })}
              <SwiperSlide>
                <Link to="/articles" className="more">
                  <img src={ArticlesMore} alt="more" className="img" />
                </Link>
              </SwiperSlide>
            </Swiper>
          )}
        </Container>
      </section> */}

      {sales?.data?.items?.length > 0 && (
        <section className="sec-6 mt-5 mb-5">
          <Container>
            <Swiper
              className="sw-offers"
              spaceBetween={20}
              slidesPerView={"auto"}
              speed={750}
              breakpoints={{
                576: {
                  slidesPerView: "auto",
                },
                768: {
                  slidesPerView: "auto",
                },
                992: {
                  slidesPerView: 3,
                },
              }}
            >
              {sales.data.items.map((e, index) => (
                <SwiperSlide key={index}>
                  <Offer data={e} />
                </SwiperSlide>
              ))}
            </Swiper>

            <Link to="/promo" className="btn-primary mt-4 mt-sm-5 mx-auto">
              смотреть все акции
            </Link>
          </Container>
        </section>
      )}
    </main>
  );
};

export default Home;
