"use client";

import React, { useContext, useState } from "react";
import { MainDiv, AddSection, PreviewButton } from "./MainStylled";
import eyeIcon from "../../../img/eye.png";
import add from "../../../img/add.png";
import Image from "next/image";
import LexicalTextEditor from "@/plugins/LexicalTextEditor/page";
import NewSection from "@/common_components/Add New Section/NewSection";
import Sidebar from "@/common_components/sidebar/Sidebar";
import { MyContext } from "../layout";

const MainComponent = () => {
  const[isCreateNewSection, setCreateNewSection] = useState(false);

  const { settingIndex, settingHammer } : any = useContext(MyContext);
  const [index, setIndex] = settingIndex;
  const [Hammer, setHammer] = settingHammer;

  console.log(Hammer);
  console.log(index);

  function checkIndex() {
    setIndex("Hamid");
    setHammer("Craze");
  }

  function createNewSection() {
    setCreateNewSection(true);
  }

  return (
    <MainDiv>
      <PreviewButton onClick={checkIndex}>
        <Image width={15} height={15} src={eyeIcon} alt="" />
        preview
      </PreviewButton>

      <LexicalTextEditor />
      <NewSection />
      {isCreateNewSection && <NewSection />}

      <AddSection onClick={createNewSection}>
        <Image width={15} height={15} src={add} alt="" />
        Add Section
      </AddSection>

      <Sidebar />
    </MainDiv>
  );
};

export default MainComponent;
