import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../../../img/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SideBarData } from "../../../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const sidebarVariants = {
    true: { left: "0" },
    false: { left: "-60%" },
  };

  return (
    <>
      {/* Menu Icon */}
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>

      {/* Sidebar */}
      <motion.div
        className="SideBar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 764 ? (expanded ? "true" : "false") : ""}
      >
        {/* Logo */}
        <div className="Logo">
          <img src={Logo} alt="logo" />
          <span>
            RETO
          </span>
        </div>

        {/* Menu */}
        <div className="Menu">
          {SideBarData.map((item, index) => (
            <div
              className={selected === index ? "MenuItem active" : "MenuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          ))}

          {/* Sign Out Icon */}
          <div className="MenuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
