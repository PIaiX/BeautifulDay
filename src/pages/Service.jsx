import React, { useLayoutEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProductCard from "../components/ProductCard";
import BtnFav from "../components/utils/BtnFav";

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
import { useSelector } from "react-redux";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperButtonNext from "../components/utils/SwiperButtonNext";
import SwiperButtonPrev from "../components/utils/SwiperButtonPrev";

const Service = () => {
  const [featuresShow, setFeaturesShow] = useState(false);
  const options = useSelector((state) => state.settings.options);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { productId } = useParams();

  const [product, setProduct] = useState({
    loading: true,
    item: {},
    recommends: [],
  });

  var [data, setData] = useState({
    cart: {
      data: {
        modifiers: {},
        additions: [],
        wishes: [],
      },
    },
  });

  useLayoutEffect(() => {
    getProduct(productId)
      .then((res) => {
        setProduct({ ...res, loading: false });
      })
      .catch(() => setProduct((data) => ({ ...data, loading: false })));
  }, [productId]);

  if (product?.loading) {
    return <Loader full />;
  }

  if (!product?.id) {
    return (
      <Empty
        text="Такого товара нет"
        desc="Возможно вы перепутали ссылку"
        image={() => <EmptyCatalog />}
        button={
          <Link className="btn-primary" to="/">
            Перейти на главную
          </Link>
        }
      />
    );
  }

  return (
    <main>
      <Meta
        title={product?.title ?? "Товар"}
        description={product?.description}
        image={
          product?.medias[0]?.media
            ? getImageURL({
                path: product.medias[0].media,
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
              title: product?.title ?? "Нет названия",
            },
          ]}
        />

        <section className="article-page pt-4 pt-lg-0 mb-6">
          <img
            src={getImageURL({
              path: product.medias[0]?.media,
              size: "full",
            })}
            alt={product.title}
            className="article-page-imgMain mb-4 mb-sm-5"
          />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
        </section>
      </Container>
    </main>
  );
};

export default Service;
