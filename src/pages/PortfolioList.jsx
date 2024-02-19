import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Offer from "../components/Offer";
import ArticlePreview from "../components/ArticlePreview";

const PortfolioList = () => {
  return (
    <main className="inner">
      <Container>
        <section className="sec-6 pt-4 pt-lg-0 mb-5">
          <h1 className="inner mb-4">Портфолио</h1>
          <Row className="gx-4 gx-lg-5">
            <Col lg={3}>
              <Offer
                blackText={false}
                img={"images/offers/offer1.jpg"}
                title={"Весна пришла"}
                subtitle={"А с ней новые вкусы роллов!"}
              />
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default PortfolioList;
