import { Button } from "flowbite-react";
import React from "react";
import lostinspace from "../../assets/lostinspace.jpg";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

export default function PromotionSlider({ data = [] }) {
  return (
    <Swiper
      className="mySwiper"
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
    >
      {data.map((_d, index) => (
        <SwiperSlide key={`${_d.movieName}-${index}`}>
          <div
            style={{
              backgroundImage: `url(${_d.bannerLink})`,
              backgroundSize: "cover",
              minHeight: "70vh",
              display: "flex",
              alignItems: "center",
            }}
            alt="banner image"
          ></div>
          <div className="absolute w-full h-full left-0 right-0 top-0 bottom-0 bg-black/49"></div>
          <div className="w-full h-auto px-[50px] absolute top-[40%]">
            <div className="w-full md:w-[50%]">
              <h1 className="text-white font-bold text-4xl tracking-[10px] mb-2">
                {_d.movieName}
              </h1>
              <p className="text-white font-light mb-5">
                {_d.movieDescription}
              </p>
              <div className="flex gap-x-5">
                <Button className="bg-red-600 rounded-3xl">Watch Now</Button>
                <Button className="bg-gray-700 rounded-3xl">
                  Add to watch list
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
