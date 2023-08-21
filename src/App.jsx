import React from "react";
import PostsFeed from "./components/PostsFeed";
import { Provider } from "react-redux";
import store from "./redux/store";
import UsersFeed from "./components/UsersFeed";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import AddPost from "./components/AddPost";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index path="/posts-feed" element={<PostsFeed />} />
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
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
