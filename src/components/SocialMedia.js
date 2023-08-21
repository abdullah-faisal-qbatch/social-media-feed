import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store from "./../redux/store";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Spinner from "./Spinner";

const Header = lazy(() => import("./Navbar"));
const UsersFeed = lazy(() => import("./UsersFeed"));
const AddPost = lazy(() => import("./AddPost"));
const PostsFeed = lazy(() => import("./PostsFeed"));

const SocialMedia = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Suspense fallback={<Spinner></Spinner>}>
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
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default SocialMedia;
