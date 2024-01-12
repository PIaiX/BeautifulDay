import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryCard from "../components/CategoryCard";
import jsonData from "../data/categories";
import { getCategories } from "../services/category";

const Categories = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    getCategories({ size: 50 }).then((res) => setCategories(res));
  }, []);

  return (
    <main>
      <section className="page-catalog mb-6">
        <Container>
          <h1 className="text-center mb-4">Каталог</h1>
          <Row
            xs={2}
            md={3}
            lg={4}
            className="justify-content-center gx-2 gy-3 g-sm-4"
          >
            {categories?.length > 0 &&
              categories.map((obj) => {
                return (
                  <Col key={obj.id}>
                    <CategoryCard data={obj} />
                  </Col>
                );
              })}
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Categories;
