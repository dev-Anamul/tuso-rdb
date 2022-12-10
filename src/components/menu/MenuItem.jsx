import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BsHouseFill,
  BsWalletFill,
  BsPeopleFill,
  BsGearFill,
} from "react-icons/bs";
import useMainMenuActive from "../../customHooks/useMainMenuActive";
import { Monitor } from "react-feather";

function MenuItem() {
  const loggedInuser = useSelector((state) => state.login.data);
  const active = useMainMenuActive();

  return (
    <>
      <Link
        className="d-flex flex-column py-2 px-lg-3 mx-lg-3 text-decoration-none text-black text-center font-fallback text-muted default-fz"
        to="/"
      >
        <p className="mb-0">
          <BsHouseFill
            size={28}
            className={active.dashBoard ? "orange-500" : ""}
          />
        </p>
        <p className={`mb-0 ${active.dashBoard ? "orange-500" : ""} `}>Home</p>
      </Link>
      <Link
        className="d-flex flex-column py-2 default-fz px-lg-3 mx-lg-3 text-decoration-none text-black text-center font-fallback text-muted"
        to={`/ticket/${loggedInuser?.role?.toLowerCase()}/list`}
      >
        <p className={`mb-0`}>
          <BsWalletFill
            size={28}
            className={active.ticket ? "orange-500" : ""}
          />
        </p>
        <p className={`mb-0 ${active.ticket ? "orange-500" : ""} `}>Ticket</p>
      </Link>
      <Link
        className="d-flex flex-column py-2 default-fz px-lg-3 mx-lg-3 text-decoration-none text-black text-center font-fallback text-muted"
        to={"/user/list"}
      >
        <p className="mb-0 menu-user-icon">
          <BsPeopleFill size={28} className={active.user ? "orange-500" : ""} />
        </p>
        <p className={`mb-0 ${active.user ? "orange-500" : ""} `}>User</p>
      </Link>
      <Link
        className="d-flex flex-column py-2 default-fz px-lg-3 px-md-2 mx-lg-3 text-decoration-none text-black text-center font-fallback text-muted"
        to="/config/g/country"
      >
        <p className="mb-0 ">
          <BsGearFill
            size={28}
            className={active.configure ? "orange-500" : ""}
          />
        </p>
        <p className={`mb-0 ${active.configure ? "orange-500" : ""} `}>
          Settings
        </p>
      </Link>
      <Link
        className="d-flex flex-column py-2 default-fz px-lg-3 px-md-2 mx-lg-3 text-decoration-none text-black text-center font-fallback text-muted"
        to="/device/list"
      >
        <p className="mb-0 ">
          <Monitor size={28} className={active.device ? "orange-500" : ""} />
        </p>
        <p className={`mb-0 ${active.device ? "orange-500" : ""}`}>Device</p>
      </Link>
    </>
  );
}

export default MenuItem;
