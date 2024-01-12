import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Story from "./Story";
import StoryBig from "./StoryBig";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Scrollbar } from "swiper";
import { HiXMark } from "react-icons/hi2";

import SwiperButtonNext from "./utils/SwiperButtonNext";
import SwiperButtonPrev from "./utils/SwiperButtonPrev";

const StoriesSection = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [story, setStory] = useState(false);

  const closeStory = () => setStory(false);
  const showStory = (index) => {
    setStory(true);
    setActiveSlide(index);
  };

  return (
    <>
      <Swiper
        className="swiper-stories"
        modules={[Navigation, FreeMode]}
        speed={750}
        spaceBetween={10}
        slidesPerView={"auto"}
        watchOverflow={true}
        freeMode={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          576: {
            spaceBetween: 15,
          },
          768: {
            spaceBetween: 30,
          },
          1200: {
            spaceBetween: 50,
          },
        }}
      >
        {data.map((e, index) => (
          <SwiperSlide>
            <Story onClick={() => showStory(index)} data={e} />
          </SwiperSlide>
        ))}

        <SwiperButtonPrev />
        <SwiperButtonNext />
      </Swiper>

      <Modal show={story} onHide={closeStory} className="story-modal">
        <Modal.Body>
          <Swiper
            className="swiper-stories-modal"
            modules={[Scrollbar, Navigation]}
            slidesPerView={1}
            scrollbar={{ draggable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            onSwiper={(swiper) =>
              activeSlide && swiper.slideTo(activeSlide, 50)
            }
          >
            {data.map((e, index) => (
              <SwiperSlide>
                <StoryBig onClick={() => showStory(index)} data={e} />
              </SwiperSlide>
            ))}

            <SwiperButtonPrev />
            <SwiperButtonNext />
          </Swiper>
          <button className="close" onClick={closeStory}>
            <HiXMark />
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StoriesSection;
