import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./layout/layout";
import { Home } from "./pages/home/home";
import { Task } from "./pages/task/task";
import { NotFound } from "./pages/notfound/notfound";
import { Charging } from "./pages/charging/charging";

export const Router = memo(() => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="task" element={<Task />} />
        <Route path="charging" element={<Charging />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
});
