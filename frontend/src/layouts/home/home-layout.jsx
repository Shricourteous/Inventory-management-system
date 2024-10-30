import React from "react";

import NavBarComponent from "../../components/nav.component/nav.component";
import SideBarComponent from "../../components/sidebar/sidebar.component";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/footer.component";

// 6713552c5f652437f796412c Managing Cloud Native Data on Kubernete

const HomeLayout = () => {
  return (
    <>
      <NavBarComponent />
      {/* screen split for side bar */}
      <div className="flex">
        {/* Side bar panel and Outlet(Pages) */}
        <SideBarComponent />

        <div className="w-full">
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HomeLayout;
