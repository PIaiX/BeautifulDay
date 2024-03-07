import React, { memo } from "react";
import { Pagination } from "swiper";
import { Link } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { getImageURL } from "../../helpers/all";

const WidgetBanners = memo((data) => {
  if (!data?.items || data?.items?.length === 0) {
    return null;
  }
  return (
    <section className="sec-1 mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-11 col-lg-9 col-xl-8">
            <Swiper
              className="main-slider paginated"
              modules={[Pagination]}
              loop={true}
              spaceBetween={15}
              slidesPerView={1}
              initialSlide={0}
              loopedSlides={1}
              centeredSlides={true}
              speed={750}
              pagination={{ clickable: true }}
            >
              {data.items.map((e, index) => (
                <SwiperSlide key={index}>
                  <Link>
                    <img
                      src={getImageURL({
                        path: e?.medias,
                        type: "banner",
                        size: "full",
                      })}
                      alt={e?.title}
                      className="img-fluid"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
});

export default WidgetBanners;
