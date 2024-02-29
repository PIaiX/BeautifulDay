import React, { memo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Callback from "../modals/Callback";

const WidgetContact = memo((data) => {
  const [show, setShow] = useState(false);
  return (
    <section className="sec-3">
      <Container>
        <Row className="justify-content-end">
          <Col xs={12} md={8} lg={6}>
            <h2 className="text-center">{data?.title ?? "Оформите заявку"}</h2>
            {data?.desc && <p className="text-center">{data.desc}</p>}
            <button
              type="button"
              className="btn-info mx-auto mt-4"
              onClick={() => setShow(true)}
            >
              Заказать
            </button>
            <Callback show={show} setShow={setShow} />
          </Col>
        </Row>
      </Container>
    </section>
  );
});

export default WidgetContact;
