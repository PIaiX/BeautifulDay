import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/home";
import CategoryCard from "../CategoryCard";
import Callback from "../modals/Callback";

const WidgetContact = memo((data) => {
  return (
    <section className="sec-3">
      <Container>
        <Row className="justify-content-end">
          <Col xs={12} md={8} lg={6}>
            <h2 className="text-center">{data?.title ?? "Оформите заявку"}</h2>
            {data?.desc && <p className="text-center">{data.desc}</p>}
            <Callback btnText={"Заказать"} btnClass={"btn-info mx-auto mt-4"} />
          </Col>
        </Row>
      </Container>
    </section>
  );
});

export default WidgetContact;
