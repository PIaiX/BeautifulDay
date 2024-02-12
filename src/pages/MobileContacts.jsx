import React from "react";
import MobilePromo from "../assets/images/bg/mobilePromo.jpg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import WhatsAppIcon from "../components/svgs/WhatsAppIcon";

const MobileContacts = () => {
  return (
    <main>
      <section className="mobileOnly">
        <figure className="mobileOnly-img">
          <img src={MobilePromo} alt="Наборы в наличии и под заказ" />
          <figcaption>
            <Link to="/menu" className="btn-aqua fs-09 mx-auto">
              В каталог
            </Link>
          </figcaption>
        </figure>

        <Container>
          <ul>
            <li>
              <Link to="tel:+79600555160">Позвонить</Link>
            </li>
            <li>
              <a href="https://vk.com/bdkzn" target="_blank">
                Вконтакте
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/presents_beautifulday/"
                target="_blank"
              >
                Нельзяграм
              </a>
            </li>
            <li>
              <Link to="tel:+7 9600-555-160">Написать в Telegram</Link>
            </li>
          </ul>
          <a href="" className="mt-3 btn-dark w-100 justify-content-start px-4">
            <WhatsAppIcon />
            <span className="ms-2">Написать в WhatsApp</span>
          </a>
        </Container>
      </section>
    </main>
  );
};

export default MobileContacts;
