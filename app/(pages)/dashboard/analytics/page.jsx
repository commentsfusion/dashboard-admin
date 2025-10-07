import React from "react";
import Header from "../../../components/Header.jsx";
import Userinfo from "../../../components/cards/overview/userinfo.jsx";
import UserEngagement from "../../../components/cards/userengagement/engagement.jsx";
import Topperformingaccounts from "../../../components/cards/topperformingaccounts/topformers.jsx";

const Analytics = () => {
  return (
    <div>
      <Header />
      <div className="mt-4">
        <h1 className="font-bold text-2xl sm:text-2xl">
          User & Platform Analytics
        </h1>
        <p className="text-md text-gray-600 mt-1">
          Comprehensive insights into user behavior, growth patterns, and
          platform performance.
        </p>

        <div className="mt-5">
          <Userinfo />
          <UserEngagement />
          <Topperformingaccounts />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
