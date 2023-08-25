import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store from "./../redux/store";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Spinner from "./Spinner";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ToastContext } from "../contexts/ToastContext";

const Header = lazy(() => import("./Navbar"));
const UsersFeed = lazy(() => import("./pages/UsersFeed"));
const AddPost = lazy(() => import("./pages/AddPost"));
const PostsFeed = lazy(() => import("./pages/PostsFeed"));

const SocialMedia = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <ToastContainer />
          <ToastContext.Provider value={toast}>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<Header />}>
                  <Route index path="/" element={<PostsFeed />} />
                  <Route path="/users-feed" element={<UsersFeed />} />
                  <Route
                    path="/posts-feed/user"
                    element={<PostsFeed value="user" />}
                  />
                  <Route
                    path="/my-posts"
                    element={<PostsFeed value="my-posts" />}
                  />
                  <Route path="/add-post" element={<AddPost />} />
                  <Route path="/edit-post" element={<AddPost value="edit" />} />
                </Route>
              </Routes>
            </Suspense>
          </ToastContext.Provider>
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default SocialMedia;
