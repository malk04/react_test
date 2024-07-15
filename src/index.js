import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TablePage from "./pages/TablePage";
import NotFoundPage from "./pages/NotFoundPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<App/>}/>
              <Route path={"/lk"} element={<TablePage/>}/>
              <Route path={"*"} element={<NotFoundPage/>}/>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
