
// data.js
import { LuDollarSign } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";

export const campaignData = [
  {
    id: 1,
    title: "Total Ad Spend",
    value: "$12,847",
    growth: "+15.3%",
    period: "This month",
    icon: <LuDollarSign className="text-gray-400" />,
  },
  {
    id: 2,
    title: "Total Conversions",
    value: "3,420",
    growth: "+9.1%",
    period: "This month",
    icon: <FaChartLine className="text-gray-400" />,
  },
  {
    id: 3,
    title: "CTR",
    value: "4.8%",
    growth: "-1.2%",
    period: "This month",
    icon: <BsGraphUpArrow className="text-gray-400" />,
  },
];

