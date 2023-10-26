import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Empty from "../../components/Empty";
import EmptyFavorite from "../../components/empty/favorite";
import ProductCard from "../../components/ProductCard";
import AccountTitleReturn from '../../components/AccountTitleReturn';

const Favorites = () => {
  const data = useSelector((state) => state.favorite.items);

  if (!Array.isArray(data) || data.length <= 0) {
    return (
      <Empty
        mini
        text="Избранных товаров нет"
        desc="Вернитесь в меню и добавляйте интересующие товары в этот список"
        image={() => <EmptyFavorite />}
        button={
          <Link className="btn-primary" to="/menu">
            Перейти в меню
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <AccountTitleReturn link={'/account'} title={'Избранное'}/>
      <ul className="list-unstyled row row-cols-2 row-cols-sm-2 row-cols-lg-3 gx-4 gx-xl-4 gy-5">
        {data.map((e) => (
          <li>
            <ProductCard data={e} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
