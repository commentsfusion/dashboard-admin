import { FiUsers } from "react-icons/fi";
import { HiArrowUp } from "react-icons/hi";
import { FiDollarSign } from "react-icons/fi";
import { MdOutlineShowChart } from "react-icons/md";

export const statsData = [
  {
    id: 1,
    title: "Total Users",
    value: "12,847",
    growth: "+12.5%",
    description: "Active users this month",
    icon: FiUsers,
    growthIcon: HiArrowUp,
  },
  {
    id: 2,
    title: "Monthly Revenue",
    value: "$54,300",
    growth: "+8.2%",
    description: "MMP Growth",
    icon: FiDollarSign,
    growthIcon: HiArrowUp,
  },
  // {
  //   id: 3,
  //   title: "Comment Proceed",
  //   value: "9,234",
  //   growth: "+10.1%",
  //   description: "Comments handled this month",
  //   icon: MdOutlineShowChart,
  //   growthIcon: HiArrowUp,
  // },
  //   {
  //   id: 4,
  //   title: "Conversation rate",
  //   value: "9,224",
  //   growth: "+18.1%",
  //   description: "Free to paid conversion",
  //   icon: MdOutlineShowChart,
  //   growthIcon: HiArrowUp,
  // },
];
