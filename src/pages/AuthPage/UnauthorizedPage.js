import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div style={{ fontFamily: "inherit", color: "inherit" }}>
        <h2 style={{ fontFamily: "inherit", color: "inherit" }}>
          Lỗi 403 không có quyền truy cập <a href="/accounts/login">Trở về đăng nhập</a>
        </h2>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
