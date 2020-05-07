import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import Promotions from "views/Promotions/Promotions.js";
// core components/views for RTL layout
import SvgIcon from "@material-ui/core/SvgIcon";
import React from "react";

function PromotionsIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12.049,2 L21.171,11.112 L14.982,17.3 L6,8.194 L6,2 L12.049,2 Z M12.876,0 L4,0 L4,9.015 L14.973,20.139 L24,11.111 L12.876,0 Z M10.561,6.561 C9.975,7.147 9.026,7.147 8.44,6.561 C7.854,5.975 7.854,5.026 8.44,4.44 C9.026,3.854 9.975,3.854 10.561,4.44 C11.146,5.025 11.146,5.975 10.561,6.561 Z M11.603,19.564 L10.234,21 L0,10.743 L0,3 L2,3 L2,9.891 L11.603,19.564 Z" />
    </SvgIcon>
  );
}

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    layout: "/promociones"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    layout: "/promociones"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    layout: "/promociones"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    layout: "/promociones"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    layout: "/promociones"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    layout: "/promociones"
  },
  {
    path: "",
    name: "Promociones",
    icon: PromotionsIcon,
    component: Promotions,
    layout: "/promociones"
  }
];

export default dashboardRoutes;
