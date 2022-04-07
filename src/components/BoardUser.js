import React, { useState, useEffect } from "react";

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
  return (
    <div className="user">
      <DoughnutChart />
    </div>
  );
};
export default BoardUser;
