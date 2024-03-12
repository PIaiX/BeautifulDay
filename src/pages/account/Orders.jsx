import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import AccountTitleReturn from "../../components/AccountTitleReturn";
import DataTable from "../../components/DataTable";
import Empty from "../../components/Empty";
import Meta from "../../components/Meta";
import Loader from "../../components/utils/Loader";
import { customPrice, deliveryData } from "../../helpers/all";
import { getOrders } from "../../services/order";
import { ReactComponent as EmptyOrders } from "../../components/empty/order.svg";

const Orders = () => {
  const [orders, setOrders] = useState({
    loading: true,
    items: [],
    pagination: {},
  });

  const orderColumns = [
    {
      name: "Дата",
      selector: "createdAt",
      cell: (row) => moment(row.createdAt).format("DD MMM YYYY kk:mm"),
    },
    {
      name: "Статус",
      selector: "status",
      cell: (row) => (
        <div className="bg-success success rounded-3 px-1">Принят</div>
      ),
    },
    {
      name: "Способ",
      selector: "deliveryType",
      cell: (row) => deliveryData[row.delivery],
    },
    {
      name: "Итого",
      width: "150px",
      align: "right",
      selector: "total",
      cell: (row) => (
        <div className="d-flex align-items-center">
          <span>{customPrice(row.total)}</span>
        </div>
      ),
    },
    {
      width: "50px",
      selector: "action",
      align: "right",
      cell: (row) => (
        <Link to={"/account/orders/" + row.id}>
          <IoEyeOutline size={20} />
        </Link>
      ),
    },
  ];

  useLayoutEffect(() => {
    getOrders()
      .then((res) => setOrders((data) => ({ ...data, loading: false, ...res })))
      .catch(() => setOrders((data) => ({ ...data, loading: false })));
  }, []);

  if (orders?.loading) {
    return <Loader full />;
  }

  if (!Array.isArray(orders.items) || orders.items.length <= 0) {
    return (
      <Empty
        mini
        text="Заказов пока нет"
        desc="Перейдите к меню, чтобы сделать первый заказ"
        image={() => <EmptyOrders />}
        button={
          <Link className="btn-primary" to="/">
            Перейти на главную
          </Link>
        }
      />
    );
  }

  return (
    <section className="sec-orders">
      <Meta title="Заказы" />
      <AccountTitleReturn link={"/account"} title={"Заказы"} />

      <DataTable
        columns={orderColumns}
        data={orders.items}
        pagination={orders.pagination}
      />
    </section>
  );
};

export default Orders;
