import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "swiper/css";
import Empty from "../components/Empty";
import { ReactComponent as EmptyCatalog } from "../components/empty/catalog.svg";
import Meta from "../components/Meta";
import ProjectItem from "../components/ProjectItem";
import Loader from "../components/utils/Loader";
import { getServices } from "../services/service";
import { updateFilter } from "../store/reducers/settingsSlice";

const Services = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [services, setServices] = useState({
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
    getServices()
      .then((res) => {
        setServices({ ...res, loading: false });
      })
      .catch(() => setServices((res) => ({ ...res, loading: false })));
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

  if (services?.loading) {
    return <Loader full />;
  }

  return (
    <main>
      <Meta title="Услуги" />
      <section className="category mb-5">
        <Container>
          {/* <NavTop toBack={true} breadcrumbs={true} /> */}

          <h1 className="mb-4 mb-lg-5">Услуги</h1>

          {!Array.isArray(services?.items) ||
            (services.items.length <= 0 && (
              <Empty
                text="Услуг нет"
                image={() => <EmptyCatalog />}
                button={
                  <Link className="btn-primary" to="/">
                    Перейти на главную
                  </Link>
                }
              />
            ))}
          <Row xs={2} sm={3} xxl={4} className="gx-4 gy-5">
            {services?.items?.length > 0 &&
              services.items.map((e) => (
                <Col>
                  <ProjectItem data={e} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Services;
