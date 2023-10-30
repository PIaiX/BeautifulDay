import React, { useCallback, useLayoutEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useForm, useWatch } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountTitleReturn from "../../components/AccountTitleReturn";
import Meta from "../../components/Meta";
import Input from "../../components/utils/Input";
import NavBreadcrumbs from "../../components/utils/NavBreadcrumbs";
import { editAccount } from "../../services/account";
import { setUser } from "../../store/reducers/authSlice";
import moment from "moment";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useLayoutEffect(() => {
    if (user?.status === 0) {
      return navigate("/activate");
    }
  }, [user]);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onSubmit",
    defaultValues: {
      ...user,
      birthday: user?.birthday
        ? moment(user?.birthday).format("YYYY-MM-DD")
        : null,
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      await editAccount(data)
        .then((res) => {
          res?.user && dispatch(setUser(res.user));

          if (data.email != user.email || !user.email) {
            navigate("email", { state: { email: data.email } });
          } else {
            NotificationManager.success("Данные успешно обновлены");
            navigate(-1);
          }
        })
        .catch((err) => {
          NotificationManager.error(
            err?.response?.data?.error ?? "Ошибка при сохранении"
          );
        });
    },
    [user]
  );

  return (
    <section>
      <Meta title="Настройки" />
      <Container className="pt-4 pt-lg-0">
        <AccountTitleReturn
          link="/account"
          title="Настройки"
        />

        <label className="mb-3">
          <span className="me-1 me-sm-3">Включить пуш-уведомления</span>
          <input
            type="checkbox"
            role="switch"
            {...register("notification")}
          />
        </label>
        <label className="mb-4">
          <span className="me-1 me-sm-3">Подписаться на рассылку</span>
          <input
            type="checkbox"
            role="switch"
            {...register("followEmail")}
          />
        </label>
        <div className="box p-3 p-sm-4">
          <form action="">
            <h6 className="mb-3">Внесите изменения</h6>
            <Row className="fs-11 g-4">
              <Col md={4}>
                <Input
                  label="Имя"
                  name="firstName"
                  errors={errors}
                  register={register}
                />
              </Col>
              <Col md={4}>
                <Input
                  label="Фамилия"
                  name="lastName"
                  errors={errors}
                  register={register}
                />
              </Col>
              <Col md={4}>
                <Input
                  type="date"
                  label="День рождения"
                  name="birthday"
                  readOnly={!!user?.birthday}
                  errors={errors}
                  register={register}
                />
              </Col>
              <Col md={6}>
                <Input
                  mask="7(999)999-99-99"
                  label="Номер телефона"
                  name="phone"
                  errors={errors}
                  register={register}
                  validation={{ required: "Обязательное поле" }}
                />
              </Col>
              <Col md={6}>
                <Input
                  label="Email"
                  name="email"
                  errors={errors}
                  register={register}
                />
              </Col>
            </Row>
            <button
              type="submit"
              disabled={!isValid}
              onClick={handleSubmit(onSubmit)}
              className="btn-success mt-4 d-block d-md-flex w-xs-100"
            >
              Сохранить изменения
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Settings;
