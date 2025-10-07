
import Header from "../../../components/Header.jsx";
import Userinfo from "../../../components/cards/overview/userinfo.jsx";
import UserEngagement from "../../../components/cards/userengagement/engagement.jsx";
import Topperformingaccounts from "../../../components/cards/topperformingaccounts/topformers.jsx";
import QuickActionsCard from "@/app/components/cards/quickaction/quickaction.jsx";
import SystemStatus from "@/app/components/cards/systemstatus/status.jsx";



const Overview = () => {

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
          <div className="grid md:grid-cols-2 grid-cols-1 mt-10 md:gap-6">
            <QuickActionsCard />
            <SystemStatus/>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
