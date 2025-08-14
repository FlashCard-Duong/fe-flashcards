import React, { useEffect } from "react";
import { useState, useRef, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Sidenav.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LogoutIcon from "@mui/icons-material/Logout";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useLocation, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/auth-hook/logout-hook";
import NavBarLogo from "../../assets/logo-white.png";
import NavBarIcon from "../../assets/NESTME-2.png";
const cx = classNames.bind(styles);
function Sidenav() {
  const locate = window.location.pathname;
  const { logout } = useLogout();
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex" }}>
      <div className={cx("sidenav")}>
        <div className={cx("sidenav__logo__icon")}>
          <img
            style={{
              cursor: "pointer",
              width: "27px",
              height: "27px",
              borderRadius: "5px",
            }}
            onClick={() => {
              navigate("/", { replace: true });
            }}
            className={cx("sidenav__logo")}
            src={NavBarIcon}
            alt="NestMe Icon"
          />
        </div>

        <div className={cx("sidenav__title")}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/", { replace: true });
            }}
            className={cx("sidenav__logo")}
            src={NavBarLogo}
            alt="NestMe Logo"
          />
        </div>

        <div className={cx("sidenav__buttons")}>
          <button
            onClick={() => {
              navigate("/", { replace: true });
            }}
            className={cx("sidenav__button")}
            style={
              locate === "/"
                ? { background: "rgba(255, 255, 255, 0.128)" }
                : null
            }
          >
            {locate === "/" ? (
              <HomeIcon
                className={cx("sidenav__icon")}
                style={{ width: "27px", height: "27px" }}
              />
            ) : (
              <HomeOutlinedIcon
                className={cx("sidenav__icon")}
                style={{ width: "27px", height: "27px" }}
              />
            )}
            <span className={cx("span")}>Home</span>
          </button>
          <button
            onClick={() => {
              navigate("/saved", { replace: true });
            }}
            className={cx("sidenav__button")}
            style={
              locate === "/searchStudent"
                ? { background: "rgba(255, 255, 255, 0.128)" }
                : null
            }
          >
            {locate === "/saved" ? (
              <BookmarkBorderIcon
                className={cx("sidenav__icon")}
                style={{ width: "27px", height: "27px" }}
              />
            ) : (
              <BookmarkAddedIcon
                className={cx("sidenav__icon")}
                style={{ width: "27px", height: "27px" }}
              />
            )}

            <span className={cx("span")}>Saved</span>
          </button>
          <div className={cx("sidenav__more")}>
            <button className={cx("sidenav__button")} onClick={logout}>
              <LogoutIcon
                className={cx("sidenav__icon")}
                style={{ width: "27px", height: "27px" }}
              />
              <span className={cx("sidenav__buttonText span")}>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
