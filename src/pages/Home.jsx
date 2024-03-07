import React from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import Meta from "../components/Meta";
import Loader from "../components/utils/Loader";
import Widgets from "../components/Widgets";
import { useGetHomeQuery } from "../services/home";

const Home = () => {
  const home = useGetHomeQuery();
  const options = useSelector((state) => state.settings.options);

  if (home?.isLoading) {
    return <Loader full />;
  }

  return (
    <main>
      <Meta
        title={options?.title ?? "Главная"}
        description={options?.description}
      />

      {home?.data?.widgets?.length > 0 && <Widgets data={home.data.widgets} />}
    </main>
  );
};

export default Home;
