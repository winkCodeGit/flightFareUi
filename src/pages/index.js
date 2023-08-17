/*******************************************************
 * UI work
 * Sarfraz siddiqui ()
 * October, 2022
 * Version 1
 *******************************************************/
import React, { lazy, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useRecoilValue } from "recoil";
import { loginApplied } from "../recoil/atom/dashboardAtom";
import Login from "../components/login/Login";

const Home= lazy(() => import("./home/Home"));
const Support = lazy(()=> import("./support/Support"))
const MyTrip = lazy(()=> import("./myTrip/MyTrip"))
const CheckIn = lazy(()=> import("./checkin/CheckIn"))
const SearchResult = lazy(()=> import("./searchResult/SearchResult"))
const BookTicket = lazy(()=> import("./bookTicket/BookTicket"))


const PageRout = () => {
const isLogin = useRecoilValue(loginApplied);


  return (
    <>
 
 
<BrowserRouter>
<Header />
{isLogin && <Login />}  
<Routes>

      <Route path="/" element={
         <React.Suspense fallback={<>...</>}>
              <Home/>
         </React.Suspense>
     } />
      <Route
          path="/support"
          element={
            <React.Suspense fallback={<>...</>}>
              <Support />
            </React.Suspense>
          }
        />
        <Route
          path="/myTrip"
          element={
            <React.Suspense fallback={<>...</>}>
              <MyTrip />
            </React.Suspense>
          }
        />
        <Route
          path="/checkin"
          element={
            <React.Suspense fallback={<>...</>}>
              <CheckIn />
            </React.Suspense>
          }
        />
        <Route
          path="/bookTicket"
          element={
            <React.Suspense fallback={<>...</>}>
              <BookTicket />
            </React.Suspense>
          }
        />
        <Route
          path="/searchResult"
          element={
            <React.Suspense fallback={<>...</>}>
              <SearchResult />
            </React.Suspense>
          }
        />
        
</Routes>
  <Footer /> 
</BrowserRouter>

    </>
  )
}

export default PageRout