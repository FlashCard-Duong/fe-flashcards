import { Routes, Route } from "react-router-dom";
import { RequireAuth, PersistLogin } from "./components/Auth";
import { publicRoutes, privateRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Page />
              }
            />
          );
        })}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth roles={["USER", "ADMIN"]} />}>
            {privateRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Page />
                  }
                />
              );
            })}
          </Route>

          <Route
            element={
              <RequireAuth roles={["ADMIN", "ACADEMIC_AFFAIRS_OFFICE"]} />
            }
          >
            
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
        limit={3}
      />
    </div>
  );
}

export default App;
