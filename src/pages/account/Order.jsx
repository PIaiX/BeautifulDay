import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Empty from "../../components/Empty";
import { ReactComponent as EmptyOrders } from "../../components/empty/order.svg";
import OrderItem from "../../components/OrderItem";
import socket from "../../config/socket";
import { customPrice, deliveryData, paymentData } from "../../helpers/all";
import { getOrder } from "../../services/order";
import AccountTitleReturn from "../../components/AccountTitleReturn";
import { RxDotFilled } from "react-icons/rx";

const Order = () => {
  const { orderId } = useParams();
  const affiliates = useSelector((state) => state.affiliate.items);

  const [order, setOrder] = useState({
    loading: true,
    item: {},
  });

  const affiliate =
    order.item.delivery === "pickup" &&
    order.item.affilateId &&
    affiliates?.length > 0
      ? affiliates.find((e) => e.id === order.item.affilateId)
      : false;

  const deliveryText = deliveryData[order.item.delivery];
  const paymentText = paymentData[order.item.payment];

  const status =
    order?.item?.statuses?.length > 0
      ? order.item.statuses.find((e) => e.end === null)?.status
      : false;

  useLayoutEffect(() => {
    getOrder(orderId)
      .then((res) => setOrder({ loading: false, item: res }))
      .catch(() => setOrder((data) => ({ ...data, loading: false })));
  }, [orderId]);

  useEffect(() => {
    socket.on("order/" + order.item.id, (data) => {
      if (data?.statuses?.length > 0) {
        setStatus(data.statuses[0]);
      }
    });
    return () => {
      socket.off("order/" + order.item.id);
    };
  }, []);

  if (!order?.item?.id) {
    return (
      <Empty
        mini
        text="Такого заказа нет"
        desc="Возможно вы перепутали ссылку"
        image={() => <EmptyOrders />}
        button={
          <Link className="btn-primary" to="/">
            Перейти в меню
          </Link>
        }
      />
    );
  }
  console.log(status);
  return (
    <section>
      <AccountTitleReturn
        link={"/account/orders"}
        title={"Заказ № " + order.item.id}
      />

      <Row>
        <Col lg={8} className="mb-4 mb-lg-0">
          <ul className="order-list">
            {order.item.products.map((e) => (
              <li>
                <OrderItem data={e} />
              </li>
            ))}
          </ul>
        </Col>
        <Col lg={4}>
          <div className="box">
            <div className="p-2 p-xl-3">
              <p className="fs-09 d-flex align-items-center mb-3">
                <span>Оформлен</span>
                <span className="dark-gray ms-3">
                  {moment(order.item.createdAt).format("DD.MM.YYYY HH:mm")}
                </span>
              </p>
              {order.item.serving && (
                <p className="fs-09 d-flex align-items-center mb-3">
                  <span>Ко времени</span>
                  <span className="ms-3">
                    {moment(order.item.serving).format("DD.MM.YYYY HH:mm")}
                  </span>
                </p>
              )}
              <div className="w-fit bg-success success rounded-2 px-2 mb-3">
                {status?.name ?? "Принят"}
              </div>
              <div className="order-card-delivery">
                {deliveryText} <RxDotFilled className="primary ms-1" />
              </div>
              {order.item.delivery == "delivery" ? (
                <address className="d-block fs-09 dark-gray">
                  {`${order.item.street} ${order.item.home}${
                    order.item.block ? " (корпус " + order.item.block + ")" : ""
                  }, подъезд ${order.item.apartment}, этаж ${
                    order.item.floor
                  }, кв ${order.item.apartment}`}
                </address>
              ) : (
                <address className="d-block fs-09 dark-gray">
                  {affiliate && affiliate?.full
                    ? affiliate.full
                    : "Нет информации"}
                  {affiliate && affiliate?.comment
                    ? "(" + affiliate.comment + ")"
                    : ""}
                </address>
              )}
              {order.item.description && (
                <>
                  <div className="primary mt-4 mt-xxl-5 mb-1">Комментарий</div>
                  <textarea
                    disabled
                    className="fs-09"
                    value={order.item.description}
                  />
                </>
              )}
              {/* <div className="d-flex justify-content-between align-items-center mt-3">
                <p>Количество персон</p>
                <div className="input w-50p py-1 px-2 rounded-4 w-fit text-center">
                  {order.item.person}
                </div>
              </div> */}

              {/* <div className="d-flex justify-content-between mt-3">
                <p>Доставка</p>
                <p className="secondary">бесплатно</p>
              </div> */}
            </div>
            <hr className="my-0" />
            <div className="fw-6 p-2 px-xl-3 d-flex justify-content-between">
              <p>Итоговая сумма</p>
              <p>{customPrice(order.item.total)}</p>
            </div>
            {/* <div className="btn-green rounded-0 w-100 justify-content-start">
              Списано 33 бонуса
            </div> */}
            <div className="p-2 px-xl-3">
              {/* <p className="fs-09 secondary">
                34 бонуса будут начислены за этот заказ
              </p> */}
              <button
                type="submit"
                disabled
                className="btn-secondary w-100 mt-2"
              >
                Отменить заказ
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Order;
