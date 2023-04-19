import React, { useEffect, useRef, useState } from "react";
import Transition from "./Transition";
import { Link } from "react-router-dom";
// import { useUser } from '../../app/useUser';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/useAuth";
import axios from "axios";
import Logout from "./Logout";

const DropdownNavbar = () => {
  const navigate = useNavigate();
  const { auth, name, username, email, photo, getAuthMe } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isImageExists, setIsImageExists] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  const imageExists = async url => {
    try {
      const result = await axios.get(url);
      setIsImageExists(true);
    } catch (error) {
      setIsImageExists(false);
    }
  };
  // useEffect(() => {
  //   if (localStorage.getItem('access_token')) {
  //     if (!auth) {
  //       navigate("/login");
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // }, [localStorage, auth])
  // close on click outside
  useEffect(() => {
    imageExists(photo);
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    getAuthMe();
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const storedDarkMode = localStorage.getItem("dark-mode");
  const [isDarkMode, setIsDarkMode] = useState(
    storedDarkMode === null ? false : storedDarkMode === "true"
  );

  useEffect(() => {
    localStorage.setItem("dark-mode", isDarkMode);
    const html = window.document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  const darkmode = e => {
    if (e.target.checked) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  };

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
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img
          className="w-8 h-8 rounded-full object-cover object-center"
          src={isImageExists ? photo : process.env.API_URL_APP + photo}
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800 dark:text-slate-200 dark:group-hover:text-slate-300">
            {name}
          </span>
          <svg
            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white dark:bg-neutral-900 border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800 dark:text-slate-200">
              {name}
            </div>
            <div className="text-xs text-slate-500 italic">{email}</div>
          </div>
          <ul>
            <li>
              <div className="px-3 py-1">
                <label
                  htmlFor="dark-mode"
                  className="space-x-2 flex items-center justify-start text-sm"
                >
                  <div className="inline-flex relative items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      id="dark-mode"
                      className="sr-only peer"
                      onChange={darkmode}
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                  </div>
                  <span className="dark:text-slate-200">Dark Mode</span>
                </label>
              </div>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li>
              <button className="dark:text-slate-200" onClick={hendelLogout}>
                <Logout />
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
};

export default DropdownNavbar;
