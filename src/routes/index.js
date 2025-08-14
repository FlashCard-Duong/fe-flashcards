import AuthPage, { UnauthorizedPage, Error404Page, SignUpPage, OTPForm } from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import SavedPage from "../pages/SavedPage";

// public Routes
const publicRoutes = [
  { path: "/accounts/login", component: AuthPage },
  { path: "/accounts/signup", component: SignUpPage },
  { path: "/accounts/otp", component: OTPForm },
  { path: "/unauthorized", component: UnauthorizedPage },
  { path: "/error-404", component: Error404Page },
];
// Private Routes
const privateRoutes = [
  { path: "/", component: HomePage },
  { path: "/saved", component: SavedPage },
];



export { publicRoutes, privateRoutes };
