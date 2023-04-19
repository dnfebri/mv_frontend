import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSidebarOpen } from "../../app/Store";
import { SIDEBAR_LINK } from "../../constan/sidebarLink";
import {
  MdMoveToInbox,
  MdDashboard,
  MdAdminPanelSettings,
  MdEmojiEvents,
} from "react-icons/md";
import { AiFillCaretRight } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useUser } from '../../app/useUser';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideBar = () => {
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const Open = useSidebarOpen(state => state.open);
  const SidebarOpen = useSidebarOpen(state => state.setSidebarOpen);
  // const {userRole} = useUser();

  useEffect(() => {
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const hendelLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.API_URL_APP}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      localStorage.removeItem("access_token");
      navigate("/login");
    } catch (error) {
      console.log(error);
      // setMessage(error.response.data);
    }
  };

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`
          fixed inset-0 bg-slate-900 bg-opacity-30 z-40 transition-opacity duration-200
          lg:hidden lg:z-auto
          ${Open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`
          flex flex-col absolute z-40 left-0 top-0 overflow-y-scroll h-screen no-scrollbar w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out
          lg:static lg:left-auto lg:top-auto lg:translate-x-0 lg:overflow-y-auto lg:w-20 lg:sidebar-expanded:!w-64
          2xl:w-64
          ${Open ? "translate-x-0" : "-translate-x-64"}
        `}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-4 pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={SidebarOpen}
            aria-controls="sidebar"
            // aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <a href="/" className="block">
            {/* <img src={'LogoUA'} alt="Logo UA" className={`w-16`} /> */}
            <img src="/images/logo.svg" className="h-10" alt="Flowbite Logo" />
          </a>
        </div>

        {/* Links */}
        <div className="space-y-4 overflow-y-auto no-scrollbar">
          {/* Pages group */}
          {SIDEBAR_LINK.map((row, idx) => (
            <div
              key={idx}
              // className={idx == 1 && userRole !== 1 ? 'hidden' : ''}
              onMouseEnter={() => setSidebarExpanded(true)}
            >
              {Array.isArray(row.item) ? (
                <>
                  <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3 pt-2">
                    <span
                      className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                      ariaHidden="true"
                    >
                      •••
                    </span>
                    <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                      {row.title}
                    </span>
                  </h3>
                  <ul className="mt-3">
                    {row.item.map((rowLink, i) => (
                      <li
                        key={i}
                        className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 `}
                      >
                        <NavLink
                          end
                          to={rowLink.uri}
                          className={({ isActive }) =>
                            "block text-slate-400 hover:text-slate-200 transition duration-150 truncate "
                          }
                        >
                          <div className="flex items-center">
                            {/* <i className="text-2xl"><MdDashboard/></i> */}
                            <i
                              className={`text-2xl hidden ${
                                sidebarExpanded ? "lg:hidden" : "lg:block"
                              }`}
                            >
                              <AiFillCaretRight />
                            </i>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              {rowLink.label}
                            </span>
                          </div>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0`}>
                  <NavLink
                    end
                    to={row.item}
                    className={({ isActive }) =>
                      "block text-slate-400 hover:text-slate-200 transition duration-150 truncate " +
                      (isActive ? "!text-indigo-500" : "")
                    }
                  >
                    <div className="flex items-center">
                      <i
                        className={`text-2xl hidden ${
                          sidebarExpanded ? "lg:hidden" : "lg:block"
                        }`}
                      >
                        <AiFillCaretRight />
                      </i>
                      {/* <i className="text-2xl"><MdMoveToInbox/></i> */}
                      {/* <i className="text-2xl">icon</i> */}
                      <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        {row.title}
                      </span>
                    </div>
                  </NavLink>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expand / collapse button */}
        <div className=" mt-auto">
          <div
            className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0`}
            onMouseEnter={() => setSidebarExpanded(true)}
          >
            <div className="flex items-center text-slate-400 hover:text-slate-200 transition duration-150 truncate">
              <i
                className={`text-2xl hidden ${
                  sidebarExpanded ? "lg:hidden" : "lg:block"
                }`}
              >
                <BiLogOut />
              </i>
              {/* <i className="text-2xl"><MdMoveToInbox/></i> */}
              {/* <i className="text-2xl">icon</i> */}
              <button onClick={hendelLogout}>
                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                  Logout
                </span>
              </button>
              <i
                className={`text-2xl ml-4 ${
                  sidebarExpanded ? "lg:block" : "lg:hidden"
                }`}
              >
                <BiLogOut />
              </i>
            </div>
          </div>
          <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end w-full">
            <div className="px-3 py-2">
              <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                <span className="sr-only">Expand / collapse sidebar</span>
                <svg
                  className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="text-slate-400"
                    d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                  />
                  <path className="text-slate-600" d="M3 23H1V1h2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
