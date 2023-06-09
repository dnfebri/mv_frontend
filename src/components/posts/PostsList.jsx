import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import PostsListItem from "./PostsListItem";
import { useNavigate } from "react-router-dom";
import { useStoreApp } from "../../app/Store";
import { useAuth } from "../../app/useAuth";
import { useLocation } from "react-router-dom";

const PostsList = () => {
  const {
    isLoading,
    isSuccess,
    message,
    setIsLoading,
    setProses,
    isError,
    setIsError,
    setMessage,
    isShowModal,
    setIsShowModal,
  } = useStoreApp();
  const { idUser, auth } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [searchKey, setSearctKey] = useState("");
  const getPosts = async (p = 0) => {
    let url = `${
      process.env.API_URL_APP
    }/post?page=${p}&limit=${limit}&search=${searchKey.replaceAll("#", "")}`;
    if (pathname.includes("post")) {
      url = `${
        process.env.API_URL_APP
      }/post/user/${idUser}?page=${p}&limit=${limit}&search=${searchKey.replaceAll(
        "#",
        ""
      )}`;
    }
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const result = await response.data;
      setPosts(result.data.result);
      setLimit(result.data.pagination.limit);
      setPage(result.data.pagination.page);
      setPages(result.data.pagination.pages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      const status = await error.response.status;
      if (status === 403 || status === 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    if (isSuccess) {
      getPosts(page);
      setProses(false, "");
    }
    if (auth) getPosts(page);
  }, [isSuccess, auth]);

  const hendelSearch = e => {
    e.preventDefault();
    setIsLoading(true);
    setPage(0);
    getPosts(0);
  };

  const pageChange = ({ selected }) => {
    setPage(selected);
    getPosts(selected);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="pb-4 pt-2 bg-white dark:bg-gray-900">
        <div className="relative mt-1 mx-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <form onSubmit={hendelSearch}>
            <input
              type="text"
              id="search"
              name="search"
              onChange={e => setSearctKey(e.target.value)}
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by tag and caption"
            />
          </form>
        </div>
        <div className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <PostsListItem data={posts} />
        </div>
        <div
          className="my-8 flex justify-center"
          role="navigation"
          aria-label="pagination"
        >
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"next >"}
            pageCount={pages}
            onPageChange={pageChange}
            containerClassName={"paginate-container"}
            pageLinkClassName={"paginate-page-button"}
            previousClassName={"paginate-page-button"}
            nextLinkClassName={"paginate-page-button"}
            activeClassName={"paginate-activeLink"}
            disabledLinkClassName={"paginate-disabledLink"}
          />
        </div>
      </div>
    </div>
  );
};

export default PostsList;
