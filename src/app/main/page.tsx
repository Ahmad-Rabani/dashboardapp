"use client";

import React from "react";
import {
  MainDiv,
  AddSection,
  PreviewButton,
} from "./MainStylled";
import eyeIcon from "../../../img/eye.png";
import add from "../../../img/add.png";
import Image from "next/image";
import LexicalTextEditor from "@/plugins/LexicalTextEditor/page";
import NewSection from "@/common_components/Add New Section/NewSection";
import Sidebar from "@/common_components/sidebar/Sidebar";

const MainComponent = () => {
  return (
    <MainDiv>
      <PreviewButton >
        <Image width={15} height={15} src={eyeIcon} alt="" />
        preview
        </PreviewButton>

      <LexicalTextEditor />
      <NewSection />

      <AddSection>
        <Image width={15} height={15} src={add} alt="" />
        Add Section
      </AddSection>

      <Sidebar />
    </MainDiv>
  );
};

export default MainComponent;
