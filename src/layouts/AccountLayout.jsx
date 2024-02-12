import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import AccountMenu from "../pages/account/AccountMenu";
import { Link } from "react-router-dom";
import NavBreadcrumbs from "../components/utils/NavBreadcrumbs";
import { RxDotFilled } from "react-icons/rx";
import Gear from "../components/svgs/Gear";
import { useSelector } from "react-redux";

const AccountLayout = ({ isMobile }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <main className="account mb-2 mb-sm-3 mb-md-4 mb-xl-5">
      <Container className="pt-4 pt-lg-0">
        {isMobile ? (
          <Outlet />
        ) : (
          <div>
            <h1 className="mb-2">Личный кабинет</h1>
            <NavBreadcrumbs
              breadcrumbs={[{ title: "Аккаунт", link: "/account" }]}
            />
            <div className="account-top">
              <div className="box w-100 h-100 d-flex align-items-center">
                <div className="flex-1">
                  <div>
                    <span>
                      {user.firstName
                        ? user.firstName.slice(0, 1).toUpperCase()
                        : "A"}
                    </span>
                    <RxDotFilled className="primary" />
                    {user?.phone && (
                      <a href={"tel:" + user.phone}>{user.phone}</a>
                    )}
                  </div>
                  {user?.email && (
                    <p className="dark-gray">
                      <a href={"mailer:" + user.email}>{user.email}</a>
                    </p>
                  )}
                </div>
                <Link to="/account/settings" className="btn-gray">
                  <Gear className="fs-15" />
                </Link>
              </div>
              <div className="box">
                <Link
                  to="/account/favorites"
                  className="w-100 h-100 d-flex align-items-center justify-content-between"
                >
                  <span>Избранное</span>
                  <img src="/images/favs.png" alt="favs" />
                </Link>
              </div>
              <div className="box w-100 h-100 d-flex flex-column justify-content-between text-center">
                <p className="fs-09 fw-6">Вы можете потратить</p>
                <p className="secondary">
                  <span className="fs-18">{user.point}</span>&nbsp;
                  <span className="fw-6 fs-11">бонуса</span>
                </p>
              </div>
              {/* <div>
                <img
                  src="/images/kits.jpg"
                  alt="kits"
                  className="img-fluid rounded-3"
                />
              </div> */}
            </div>

            <div className="row gx-3 gx-xl-4">
              <div className="col-4 col-lg-3">
                <AccountMenu />
              </div>
              <div className="col-8 col-lg-9">
                <Outlet />
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
};

export default AccountLayout;
