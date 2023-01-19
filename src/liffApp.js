import React, { useEffect, useState } from "react";
import { useLiff } from "react-liff";
import "./style.css";
import ListItem from "./ListItem.js";
import FirstPage from "./FirstPage.js";
import SecondPage from "./SecondPage.js";
import AddMemberPage from "./addMemberpage.js";
import SummaryPage from "./SummaryPage.js";
import SeperateBill from "./seperateBillPage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

const App = () => {
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState({});
  const [context, setContext] = useState({});
  const { error, liff, isLoggedIn, ready } = useLiff();

  useEffect(() => {
    if (!isLoggedIn) return;
    liff.ready.then(() => {
      if (liff.isInClient()) {
        liff.getProfile().then((profile) => {
          console.log(profile);
          setProfile(profile);
        });
      }
    });
    liff
      .init({
        liffId: "1657560711-7MgLg4Ld",
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
      })
      .catch((e) => {
        setMessage("LIFF init failed.");
      });
    console.log(message);
  }, [liff, isLoggedIn]);

  return (
    <div className="App">
      <p>{message}</p>
      <p>{JSON.stringify(profile)}</p>
      {/* <FirstPage /> */}
      {/*<SecondPage/>*/}
      {/* <AddMemberPage /> */}
      {/* <SummaryPage/> */}
      {/* <Link to="/add_member"> add</Link> */}
    </div>
  );
};

export default App;
