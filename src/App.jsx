import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layouts/Layout";
import Index from "./views/dashboard/Index";
import routes from "./routes/routes";
import { SidebarProvider } from "./context/SidebarContex";
import Error from "./views/Error/Error";
import SignUpForm from "./views/Auth/SignUpForm";
import SignInForm from "./views/Auth/SignInForm";
import OTPPage from "./views/Auth/OtpPage";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoutes";

function RenderRoutes(routeList) {
  return routeList.map(({ path, component: Component, children }, index) => (
    <Route key={index} path={path} element={<Component />}>
      {children && RenderRoutes(children)}{" "}
      {/* Recursively handle child routes */}
    </Route>
  ));
}

function App() {
  return (
    <SidebarProvider>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            {/* The Layout should wrap all routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                {/* Add other routes here */}
                {/* {routes.map(({ path, component: Component }, index) => (
              <Route key={index} path={path} element={<Component />} />
            ))} */}
                {RenderRoutes(routes)}
              </Route>
            </Route>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/otp" element={<OTPPage />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SidebarProvider>
  );
}

export default App;
