import React, { useCallback, useLayoutEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "../components/CategoryCard";
import Empty from "../components/Empty";
import EmptyCatalog from "../components/empty/catalog";
import ProductCard from "../components/ProductCard";
import Filter from "../components/svgs/Filter";
import PrevIcon from "../components/svgs/PrevIcon";
import Loader from "../components/utils/Loader";
import MultyRangeCustom from "../components/utils/MultyRangeCustom";
import NavTop from "../components/utils/NavTop";
import SwiperButtonNext from "../components/utils/SwiperButtonNext";
import SwiperButtonPrev from "../components/utils/SwiperButtonPrev";
import { childrenArray } from "../helpers/all";
import { getCategory } from "../services/category";
import { useGetCategoriesQuery } from "../services/home";

const Category = () => {
  const { categoryId } = useParams();
  const { search } = useLocation();
  console.log(search);
  const [searchParams, setSearchParams] = useSearchParams(search);
  const [show, setShow] = useState(false);
  const categories = useGetCategoriesQuery();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [category, setCategory] = useState({
    loading: true,
    item: {},
  });

  // function handleFilter(event) {
  //   event.preventDefault();
  //   var data = new FormData(event.target);
  //   let formObject = Object.fromEntries(data.entries());
  //   console.log(formObject);
  //   // setSearchParams((prevParams) => {
  //   //   if (value === null) {
  //   //     prevParams.delete(key);
  //   //   } else {
  //   //     prevParams.append(key, value); // <-- append key-value pair
  //   //   }
  //   //   return prevParams;
  //   // });
  // }

  const onLoad = useCallback(() => {
    getCategory(categoryId)
      .then((res) => {
        res.params = childrenArray(res.params, "id", "parent");
        setCategory({ loading: false, item: res });
      })
      .catch(() => setCategory((data) => ({ ...data, loading: false })));
  }, [categoryId]);

  useLayoutEffect(() => {
    onLoad();
  }, [categoryId]);

  if (category?.loading) {
    return <Loader full />;
  }

  if (
    !Array.isArray(category.item.products) ||
    category.item.products.length <= 0
  ) {
    return (
      <Empty
        text="Товаров нет"
        desc="Меню уже скоро появится"
        image={() => <EmptyCatalog />}
        button={
          <Link className="btn-primary" to="/">
            Перейти в меню
          </Link>
        }
      />
    );
  }
  return (
    <main>
      <section className="category mb-5">
        <Container>
          <NavTop toBack={true} breadcrumbs={true} />
          {categories?.data?.length > 0 && (
            <Swiper
              className="category-topSlider mb-5"
              spaceBetween={10}
              slidesPerView={2}
              speed={750}
              breakpoints={{
                576: {
                  spaceBetween: 16,
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
                992: {
                  slidesPerView: 5,
                  spaceBetween: 16,
                },
                1200: {
                  slidesPerView: 6,
                  spaceBetween: 16,
                },
              }}
            >
              {categories.data.map((obj) => {
                return (
                  <SwiperSlide key={obj.id}>
                    <CategoryCard data={obj} />
                  </SwiperSlide>
                );
              })}
              <SwiperButtonPrev />
              <SwiperButtonNext />
            </Swiper>
          )}

          <h1 className="mb-4 mb-lg-5">{category.item.title ?? "Категория"}</h1>
          <Row className="gx-5 mb-5">
            <Col lg={3} className="position-relative">
              <Offcanvas
                show={show}
                onHide={handleClose}
                className="offcanvas-filter"
                responsive="lg"
              >
                <Offcanvas.Body>
                  <div className="filter">
                    <div className="filter-heading">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="d-flex fs-15"
                      >
                        <PrevIcon className="svgSW" />
                      </button>
                      <h5 className="ms-2 mb-0">Фильтры</h5>
                      <button type="reset" className="ms-auto">
                        очистить
                      </button>
                    </div>

                    <fieldset>
                      <legend>Цена, ₽</legend>
                      <MultyRangeCustom
                        minRange="0"
                        maxRange="1000"
                        valueMin="150"
                        valueMax="650"
                      />
                    </fieldset>
                    <Accordion defaultActiveKey="0">
                      {category.item?.params?.length > 0 &&
                        category.item?.params.map((e) =>
                          e.type === "select" && e?.children?.length > 0 ? (
                            <fieldset>
                              <legend>{e.title}</legend>
                              <select
                                onChange={(e) => {
                                  if (e.target.value) {
                                    searchParams.set("select", e.target.value);
                                  } else {
                                    searchParams.delete("select");
                                  }
                                  setSearchParams(searchParams);
                                }}
                                name="select"
                                className="w-100 mb-2"
                              >
                                {e.children.map((item) => (
                                  <option value={item.id}>{item.value}</option>
                                ))}
                              </select>
                            </fieldset>
                          ) : e.type === "checkbox" &&
                            e?.children?.length > 0 ? (
                            <Accordion.Item
                              as="fieldset"
                              defaultValue={0}
                              eventKey="0"
                            >
                              <Accordion.Header as="legend">
                                {e.title}
                              </Accordion.Header>
                              <Accordion.Body>
                                <ul>
                                  {e.children.map((item) => (
                                    <li>
                                      <label>
                                        <input
                                          type="checkbox"
                                          name="checkbox"
                                          onChange={(e) => {
                                            if (e.target.value) {
                                              searchParams.set("checkbox", [
                                                e.target.value,
                                              ]);
                                            } else {
                                              searchParams.delete("checkbox");
                                            }
                                            setSearchParams(searchParams);
                                          }}
                                          value={item.id}
                                        />
                                        <span>{item.value}</span>
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                {/* <button type="button" className="more">
                                  показать все
                                </button> */}
                              </Accordion.Body>
                            </Accordion.Item>
                          ) : null
                        )}
                    </Accordion>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </Col>
            <Col lg={9}>
              <div className="d-md-flex justify-content-between align-items-stretch mb-5">
                {category?.item?.child?.length > 0 && (
                  <Swiper
                    className="subcategories-slider"
                    spaceBetween={10}
                    slidesPerView={"auto"}
                    speed={750}
                    breakpoints={{
                      576: {
                        spaceBetween: 15,
                      },
                      992: {
                        spaceBetween: 20,
                      },
                    }}
                  >
                    {category.item.child.map((e) => (
                      <SwiperSlide>
                        <Link to={"/category/" + e.id}>{e.title}</Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
                <div className="d-flex">
                  <select name="sort" className="flex-1">
                    <option value="">Популярное</option>
                    <option value="new">Новое</option>
                    <option value="old">Старое</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleShow}
                    className="input d-lg-none p-2 ms-3 w-fit"
                  >
                    <Filter className="fs-14 dark-gray" />
                  </button>
                </div>
              </div>
              <Row xs={2} sm={3} xxl={4} className="gx-4 gy-5">
                {category.item.products.map((e) => (
                  <Col>
                    <ProductCard data={e} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <h5>Загловок для сео</h5>
          <hr />
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </p>
          <button type="button" className="secondary mt-3">
            показать полностью
          </button>
        </Container>

        {/* <div className="sticky-box mb-3 mb-sm-4 mb-md-5">
          <Categories/>
        </div> */}
        {/* <div className="categories-box">
          <CategoryGroup/>
          <CategoryGroup/>
        </div> */}
      </section>
    </main>
  );
};

export default Category;
