import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/home";
import CategoryCard from "../CategoryCard";

const WidgetProjects = memo((data) => {
  const categories = useGetCategoriesQuery();
  return (
    <section className="sec-catalog mb-6">
      <Container>
        <h2 className="text-center">{data.title}</h2>
        <Row
          xs={2}
          md={3}
          lg={4}
          className="justify-content-center gx-2 gy-3 g-sm-4"
        >
          {categories.data.length > 0 &&
            categories.data.map((obj) => {
              return (
                <Col key={obj.id}>
                  <CategoryCard data={obj} />
                </Col>
              );
            })}
        </Row>
        <Link to="/categories" className="btn-primary mx-auto mt-4">
          Показать все
        </Link>
      </Container>
    </section>
  );
});

export default WidgetProjects;
