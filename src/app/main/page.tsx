"use client";

import React, { useContext, useState } from "react";
import {
  MainDiv,
  ComponentsDIv,
  AddSection,
  PreviewButton,
} from "./MainStylled";
import eyeIcon from "../../../img/eye.png";
import add from "../../../img/add.png";
import Image from "next/image";
import NewSection from "@/common_components/Add New Section/NewSection";
import Sidebar from "@/common_components/sidebar/Sidebar";
import { MyContext } from "../layout";

const MainComponent = () => {
  const [isCreateNewSection, setCreateNewSection] = useState(false);

  const componentsArray: [] = useContext(MyContext);

  function createNewSection() {
    setCreateNewSection(!isCreateNewSection);
  }

  console.log(componentsArray);

  return (
    <MainDiv>
      <PreviewButton>
        <Image width={15} height={15} src={eyeIcon} alt="" />
        preview
      </PreviewButton>

      {componentsArray.map((item, i: number) => {
        return (
          <ComponentsDIv style={{ width: "100%" }} key={i}>
            {item}
          </ComponentsDIv>
        );
      })}

      {isCreateNewSection && componentsArray.push(<NewSection />)}
      <AddSection onClick={createNewSection}>
        <Image width={15} height={15} src={add} alt="" />
        Add Section
      </AddSection>

      <Sidebar />
    </MainDiv>
  );
};

export default MainComponent;
