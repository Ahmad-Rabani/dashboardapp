"use client"

import React,{useEffect, useRef, useState} from "react";
import { Body } from "./SidebarStylled";
import OutsideClick from "@/customHook/OutsideClickHook";

const Sidebar: any = ({ children }: { children: React.ReactNode }) => {

  const refSidebar = useRef<any>();
  const [isOutside,setOutside] = useState(false);

  const boxOutsideClick = OutsideClick(refSidebar);

  useEffect(() => {
    {boxOutsideClick ? setOutside(true) : "inside click"}
  },[boxOutsideClick])

  return (
    <Body ref={refSidebar} $outside={isOutside}>
        {children}
    </Body>
  );
};

export default Sidebar;