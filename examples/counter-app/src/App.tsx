import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import "./App.css";
import User from "./pages/user/User";

type Props = {};

const App = (props: Props) => {
  return (
    <Routes>
      <Route index Component={Home}></Route>
      <Route path="user" Component={User} />
    </Routes>
  );
};

export default App;
