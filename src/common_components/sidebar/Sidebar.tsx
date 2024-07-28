import React,{useRef} from "react";
import { Body } from "./SidebarStylled";

const Sidebar: any = ({ children }: { children: React.ReactNode }) => {

  return (
    <Body>
        {children}
    </Body>
  );
};

export default Sidebar;