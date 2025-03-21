import { Provider } from "react-redux";
import { Outlet } from "react-router";
import store from "../../Redux/Store.jsx";
import AuthNavbar from "../Login_Signup_Page/AuthNavbar";

function MainLayout() {
  // const location = useLocation();
  // const isAuthRoute =
  //   location.pathname === "/auth/login" || location.pathname === "/auth/signup";
  return (
    <>
      <Provider store={store}>
        {/* {isAuthRoute ? ( */}
        <nav
          className="auth-navbar "
        >
          <AuthNavbar />
        </nav>

        {/* //   <nav className="main-navbar w-full">
        //     <Navbar />
        //   </nav> */}

        <Outlet />
      </Provider>
    </>
  );
}

export default MainLayout;
