import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from "./Pages/Login";
import Layout from "./Layout";
import Index from "./Pages/Index";
import Register from "./Pages/Register";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import Account from "./Pages/Account";
import ViewPlace from "./Pages/ViewPlace";

axios.defaults.baseURL = "http://localhost:4000";                           //Setting up the default url in order to eliminate the need for writing it again and again.
axios.defaults.withCredentials = true;                                      //Setting up deafult credentials as true to enable cookies.

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Account/:subpage?" element={<Account />} />       {/*:subpage for triggering the useParams() used on the Account page (? means optional)*/}
            <Route path="/Account/:subpage/:action" element={<Account />} />
            <Route path="/viewplace/:id" element={<ViewPlace/>}/>
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App