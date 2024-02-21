import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "swiper/css";
import Empty from "../components/Empty";
import EmptyCatalog from "../components/empty/catalog";
import Meta from "../components/Meta";
import ProjectItem from "../components/ProjectItem";
import Filter from "../components/svgs/Filter";
import PrevIcon from "../components/svgs/PrevIcon";
import Loader from "../components/utils/Loader";
import NavTop from "../components/utils/NavTop";
import { getProjects } from "../services/project";
import { updateFilter } from "../store/reducers/settingsSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projects, setProjects] = useState({
    loading: true,
    items: [],
  });

  const {
    control,
    formState: { isValid, errors },
    handleSubmit,
    setValue,
    reset,
    trigger,
    register,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: { options: [] },
  });

  const data = useWatch({ control });

  const onLoad = useCallback(() => {
    getProjects()
      .then((res) => {
        setProjects({ ...res, loading: false });
      })
      .catch(() => setProjects((res) => ({ ...res, loading: false })));
  }, []);

  useLayoutEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    dispatch(updateFilter({ ...data }));
  }, [data]);

  const onFilter = useCallback(
    (option) => {
      let isOption =
        data?.options && data?.options?.length > 0
          ? option?.type == "select"
            ? data.options.findIndex(
                (e) =>
                  e.type == option.type && Number(e.id) == Number(option.id)
              )
            : data.options.findIndex(
                (e) =>
                  e.type == option.type &&
                  Number(e.value) == Number(option.value) &&
                  Number(e.id) == Number(option.id)
              )
          : -1;

      return isOption == -1 ? false : data?.options[isOption]?.value;
    },
    [data?.options]
  );

  const onChangeFilter = useCallback(
    (option) => {
      if (option) {
        if (data?.options?.length > 0) {
          if (option?.type == "checkbox") {
            let isOption = data.options.findIndex(
              (e) =>
                e.type == option.type &&
                Number(e.value) == Number(option.value) &&
                Number(e.id) == Number(option.id)
            );
            if (isOption >= 0 && isOption != -1) {
              setValue(
                "options",
                data.options.filter((e) => e.value != option.value)
              );
            } else {
              setValue("options", [...data.options, option]);
            }
          } else if (option?.type == "select") {
            let isOption = data.options.findIndex(
              (e) => e.type == option.type && Number(e.id) == Number(option.id)
            );

            if (
              option?.id &&
              (!option?.value || option.value == null || option.value == "NaN")
            ) {
              setValue(
                "options",
                data.options.filter((e) => e.value == null)
              );
            } else {
              if (isOption >= 0 && isOption != -1) {
                let options = [...data.options];
                options[isOption] = option;
                setValue("options", options);
              } else {
                setValue("options", [...data.options, option]);
              }
            }
          }
        } else {
          setValue("options", [option]);
        }
      }
    },
    [data?.options]
  );

  if (projects?.loading) {
    return <Loader full />;
  }

  return (
    <main>
      <Meta title="Проекты" />
      <section className="category mb-5">
        <Container>
          {/* <NavTop toBack={true} breadcrumbs={true} /> */}

          <h1 className="mb-4 mb-lg-5">Проекты</h1>
          <Row className="gx-5 mb-5">
            <Col lg={3} className="position-relative">
              <Offcanvas
                show={show}
                onHide={handleClose}
                className="offcanvas-filter"
                responsive="lg"
              >
                <Offcanvas.Body>
                  <form className="filter">
                    <div className="filter-heading">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="d-flex fs-15"
                      >
                        <PrevIcon className="svgSW" />
                      </button>
                      <h5 className="ms-2 mb-0">Фильтры</h5>
                      {/* <button
                        type="reset"
                        className="ms-auto"
                        onClick={() => {
                          dispatch(removeFilter());
                          reset({
                            min: category.item?.min ?? 0,
                            max: category.item?.max ?? 100,
                          });
                        }}
                      >
                        очистить
                      </button> */}
                    </div>

                    {/* <fieldset>
                      <legend>Цена, ₽</legend>
                      <MultyRangeCustom
                        minRange={category.item?.min ?? 0}
                        maxRange={category.item?.max ?? 100}
                        valueMin={data?.min ?? category.item?.min ?? 0}
                        valueMax={data?.max ?? category.item?.max ?? 100}
                        onChange={(e) => e && reset({ ...data, ...e })}
                      />
                    </fieldset>
                    <Accordion defaultActiveKey="0">
                      {category.item?.params?.length > 0 &&
                        category.item?.params.map((e) => {
                          return e.type === "select" &&
                            e?.children?.length > 0 ? (
                            <fieldset>
                              <legend>{e.title}</legend>
                              <select
                                name="select"
                                className="w-100 mb-2"
                                onChange={(s) =>
                                  onChangeFilter({
                                    type: e.type,
                                    id: Number(e.id),
                                    value: Number(s.target.value),
                                  })
                                }
                                defaultValue={onFilter({
                                  type: e.type,
                                  id: e.id,
                                })}
                              >
                                <option>Не выбрано</option>
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
                                          value={item.id}
                                          defaultChecked={onFilter({
                                            type: e.type,
                                            id: e.id,
                                            value: item.id,
                                          })}
                                          onChange={() =>
                                            onChangeFilter({
                                              type: e.type,
                                              id: Number(e.id),
                                              value: Number(item.id),
                                            })
                                          }
                                        />
                                        <span>{item.value}</span>
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                         
                              </Accordion.Body>
                            </Accordion.Item>
                          ) : null;
                        })}
                    </Accordion> */}
                    <Button
                      variant="primary"
                      className="w-100 rounded-3"
                      onClick={() => onLoad()}
                    >
                      Применить
                    </Button>
                  </form>
                </Offcanvas.Body>
              </Offcanvas>
            </Col>
            <Col lg={9}>
              <div className="d-md-flex justify-content-between align-items-stretch mb-5">
                <select className="flex-1" {...register("sort")}>
                  <option value="">Сортировать по</option>
                  <option value="new">Новое</option>
                  <option value="old">Старое</option>
                  <option value="cheaper">Дешевле</option>
                  <option value="expensive">Дороже</option>
                </select>
                <button
                  type="button"
                  onClick={handleShow}
                  className="input d-lg-none p-2 ms-3 w-fit"
                >
                  <Filter className="fs-14 dark-gray" />
                </button>
              </div>
              {!Array.isArray(projects?.items) ||
                (projects.items.length <= 0 && (
                  <Empty
                    text="Проектов нет"
                    image={() => <EmptyCatalog />}
                    button={
                      <Link className="btn-primary" to="/">
                        Перейти в меню
                      </Link>
                    }
                  />
                ))}
              <Row xs={2} sm={3} xxl={4} className="gx-4 gy-5">
                {projects?.items?.length > 0 &&
                  projects.items.map((e) => (
                    <Col>
                      <ProjectItem data={e} />
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>

          {/* <h5>Загловок для сео</h5>
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
          </button> */}
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

export default Projects;
