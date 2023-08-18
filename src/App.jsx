import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import PostsFeed from "./components/PostsFeed";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import UsersFeed from "./components/UsersFeed";
import { useEffect } from "react";
import { fetchAllComments } from "./redux/user-comments/actionCreator";
import { fetchAllPosts } from "./redux/posts/actionCreator";
import { fetchAllUsers } from "./redux/users/actionCreator";
import { Route,Routes,BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import PostsFeedUser from './components/PostsFeedUser';

function App() {
  return (
 <div> 
      <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index path="/posts-feed" element={<PostsFeed />} />
            <Route path="/users-feed" element={<UsersFeed />} />
            <Route path="/posts-feed/user" element={<PostsFeedUser />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
     </div>
      );
    }

export default App;
