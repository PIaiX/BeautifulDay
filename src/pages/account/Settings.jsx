import moment from "moment";
import React, { useCallback, useLayoutEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Meta from "../../components/Meta";
import Input from "../../components/utils/Input";
import { editAccount } from "../../services/account";
import { setUser } from "../../store/reducers/authSlice";

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
    control,
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm({
    mode: "all",
    reValidateMode: "onSubmit",
    defaultValues: {
      ...user,
      birthday: user?.birthday
        ? moment(user?.birthday).format("YYYY-MM-DD")
        : null,
      phone: user?.phone ?? "",
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
        .catch((error) => {
          NotificationManager.error(
            typeof error?.response?.data?.error === "string"
              ? error.response.data.error
              : "Неизвестная ошибка"
          );
        });
    },
    [user]
  );

  return (
    <>
      <Meta title="Настройки" />
      <Container className="pt-4 pt-lg-0">
        <Row className="g-3 g-xl-4">
          <Col xs={12}>
            <div className="box p-3 p-sm-4">
              <h6 className="mb-3">Настройки</h6>
              <Row className="g-4">
                <Col md={4}>
                  <Input
                    errors={errors}
                    label="Имя"
                    name="firstName"
                    placeholder="Введите имя"
                    register={register}
                    validation={{
                      maxLength: {
                        value: 30,
                        message: "Максимум 30 символов",
                      },
                    }}
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
                    readOnly={user?.birthday ? true : false}
                    errors={errors}
                    register={register}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Номер телефона"
                    type="custom"
                    name="phone"
                    mask="+7(999)999-99-99"
                    readOnly={user?.phone ? true : false}
                    keyboardType="phone-pad"
                    control={control}
                    placeholder="Введите номер телефона"
                    autoCapitalize="none"
                    leftIcon="call-outline"
                    errors={errors}
                    register={register}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Email"
                    name="email"
                    readOnly={user?.email ? true : false}
                    errors={errors}
                    register={register}
                  />
                </Col>
              </Row>
              <button
                type="submit"
                disabled={!isValid}
                onClick={handleSubmit(onSubmit)}
                className="btn-primary mt-4 d-block d-md-flex w-xs-100"
              >
                Сохранить изменения
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Settings;
