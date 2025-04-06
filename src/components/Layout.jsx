import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="home-link">
        <Link to="/">Home</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
