import React, { useState, useEffect } from "react";
import "./componentCss/BoardUser.css"

import DoughnutChart from "../charts/DoughnutChart";
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  // Timed Popup
  /* useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 3000);
  }, []); */

  return (
    <div className="user">
      <DoughnutChart />
      <br />
      {/* <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
        <h3>Hello there</h3>
        <p>This is a time triggered popup</p>
      </Popup> */}
    </div>
  );
};
export default BoardUser;
