import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useSelector } from "react-redux";
import EmptyWork from "../components/empty/work";
import Empty from "../components/Empty";

const Contact = () => {
  const affiliate = useSelector((state) => state.affiliate.items);

  const [mainAffiliate, setMainAffiliate] = useState(
    affiliate?.length > 0 ? affiliate.find((e) => e.main) : false
  );
  console.log(mainAffiliate);
  if (!mainAffiliate || !mainAffiliate?.phone?.length > 0) {
    return (
      <Empty
        text="В данный момент контактов нет"
        desc="Вернитесь на эту страницу чуть позже"
        image={() => <EmptyWork />}
        button={
          <a
            className="btn-primary"
            onclick={() => {
              location.reload();
              return false;
            }}
          >
            Обновить страницу
          </a>
        }
      />
    );
  }

  return (
    <main>
      <section className="sec-7 mb-5">
        <Container>
          <Row>
            <Col md={4}>
              <div className="box">
                <div className="d-flex align-items-baseline mb-5">
                  <h1 className="mb-0">Контакты </h1>
                  <h5 className="mb-0">
                    <span className="mx-3">•</span>
                    {mainAffiliate.options.city}
                  </h5>
                </div>

                <h6 className="mb-3">{mainAffiliate.full}</h6>
                {mainAffiliate?.phone[0] && (
                  <>
                    <p className="mb-3">
                      <a
                        href={"tel:" + mainAffiliate.phone[0]}
                        className="d-flex"
                      >
                        <HiOutlineDevicePhoneMobile className="fs-15 secondary" />
                        <span className="fs-11 ms-2 secondary">
                          Горячая линия
                        </span>
                        <span className="fs-11 ms-2">
                          {mainAffiliate.phone[0]}
                        </span>
                      </a>
                    </p>
                    {/* <a
                      href={"tel:" + mainAffiliate.phone[0]}
                      type="button"
                      className="btn-primary"
                    >
                      Позвонить
                    </a> */}
                  </>
                )}
                <button type='button' className='btn-primary'>Заказать звонок</button>

                <ul className="list-unstyled mt-2 mt-md-4">
                  {affiliate.map((e) => (
                    <li>
                      <a onClick={() => setMainAffiliate(e)}>
                        <address className='mb-2 mb-sm-3'><span className='secondary'>•</span> {e.full}</address>
                        <p className="secondary mt-2 mb-1">
                          Доставка и самовывоз
                        </p>
                        <p>{e.desc}</p>
                        {e.phone[0] && (
                          <>
                            <p className="secondary mt-2 mb-1">
                              Номер телефона
                            </p>
                            <p>{e.phone[0]}</p>
                          </>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col md={8}>
              {mainAffiliate?.options?.coordinates?.lat &&
                mainAffiliate?.options?.coordinates?.lon && (
                  <YMaps>
                    <Map
                      className="map"
                      state={{
                        center: [
                          mainAffiliate.options.coordinates.lat,
                          mainAffiliate.options.coordinates.lon,
                        ],
                        zoom: 17,
                      }}
                      width="100%"
                      height="100%"
                    >
                      <Placemark
                        options={{
                          iconLayout: "default#image",
                          iconImageHref: "imgs/marker.png",
                          iconImageSize: [38, 54],
                        }}
                        geometry={[
                          mainAffiliate.options.coordinates.lat,
                          mainAffiliate.options.coordinates.lon,
                        ]}
                      />
                    </Map>
                  </YMaps>
                )}
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Contact;
