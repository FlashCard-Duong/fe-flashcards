import classNames from 'classnames/bind';
import React from "react";
import styles from "./PostLoading.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles)

function PostLoading() {
  return (
    <div style={{width: "100%",
                maxWidth: "550px",
                height: "180px"}}
              >
      <div className={cx("open__user")}>
          <span
              className={cx("open__user_avatar")}
              style={{width: "44px",
                height: "44px",borderRadius: "50%"}}
              >
          </span>  
          <div className={cx("open__user__info")}>
              <span className={cx("open__username")} >
               </span>
          </div>
      </div>
      <div className={cx("flahcard_loading")}>
      </div>
    </div>
  );
}

export default PostLoading;