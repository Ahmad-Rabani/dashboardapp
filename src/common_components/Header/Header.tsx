/* eslint-disable react/jsx-key */
"use client";

import React, { useEffect, useState, useContext } from "react";
import {
  MainDiv,
  HeaderDiv,
  HeaderText,
  SidebarHeading,
  StoreBranding,
  Alignment,
  AllignmentInnerDiv,
  TextSize,
  TextRangeDiv,
  TextAndBackgroundDiv,
  TextColor,
  ColorsDiv,
  ButtonText,
  BackgroundColor,
  BackgroundColorsDiv,
} from "./HeaderStylled";
import left from "../../../img/align-left.png";
import right from "../../../img/align-right.png";
import center from "../../../img/format.png";
import arrow from "../../../img/left-arrow.png";
import Image from "next/image";
import Sidebar from "../sidebar/Sidebar";
import { MyContext } from "@/app/layout";

const Header = () => {
  const [isHeader, setHeader] = useState(false);
  const [headerText, setHeaderText] = useState("Header");
  const [alignment, setAlignment] = useState<string>("center");
  const [textSize, setTextSize] = useState<string>("25");
  const [colors, setColor] = useState([]);
  const [isColor, setIsColor] = useState<boolean>(false);
  const [textColor, setTextColor] = useState<string>("black");
  const [isBackroundButton, setBackgroundButton] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [hideColors, setHideColors] = useState(false);

  const [
    componentsArray,
    setComponentsArray,
    isNewSection,
    setNewSection,
    editorText,
    setEditorText,
    addNewSection,
    setAddNewSection,
    isPreview,
  ] = useContext(MyContext);

  useEffect(() => {
    let colorArray: any = [
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF",
    ];

    setColor(colorArray);
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setHeaderText(e.target.value);
  }

  function setRange(e: React.ChangeEvent<HTMLInputElement>) {
    setTextSize(e.target.value);
  }

  function handleHeader() {
    setHeader(!isHeader);
  }

  function closeBar() {
    setHeader(!isHeader);
  }

  function selectColor() {
    setBackgroundButton(false);
    setIsColor(!isColor);
  }

  function selectedColor(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) {
    setTextColor(e.target.textContent);
  }

  function selectBackgroundColor(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) {
    setBackgroundColor(e.target.textContent);
  }

  function selectBackgroundButtonColor() {
    setIsColor(false);
    setBackgroundButton(!isBackroundButton);
  }

  function colorsDivClicked() {
    setHideColors(true);
  }

  function handleColors() {
    if (hideColors) {
      setBackgroundButton(false);
      setIsColor(false);
      setHideColors(false);
    }
  }

  return (
    <MainDiv onClick={handleColors}>
      {isPreview ? (
        <HeaderDiv
          $preview={isPreview}
          $HeaderBackgroundColor={backgroundColor}
          onClick={handleHeader}
        >
          <HeaderText
            $textColor={textColor}
            $Aligment={alignment}
            $TextSize={textSize}
          >
            {headerText}
          </HeaderText>
        </HeaderDiv>
      ) : (
        <>
          <HeaderDiv
            $preview={false}
            $HeaderBackgroundColor={backgroundColor}
            onClick={handleHeader}
          >
            <HeaderText
              $textColor={textColor}
              $Aligment={alignment}
              $TextSize={textSize}
            >
              {headerText}
            </HeaderText>
          </HeaderDiv>

          {isHeader && (
            <Sidebar>
              <SidebarHeading>
                <Image
                  onClick={closeBar}
                  width={20}
                  height={20}
                  src={arrow}
                  alt=""
                />
                <h3>Header</h3>
                <div></div>
              </SidebarHeading>

              <hr style={{ width: "100%" }} />

              <StoreBranding>
                <h3>Store Branding</h3>
                <input
                  placeholder="Header"
                  type="text"
                  onChange={handleInput}
                />
              </StoreBranding>

              <hr style={{ width: "100%" }} />

              <Alignment>
                <h3>Alignment</h3>

                <AllignmentInnerDiv>
                  <button onClick={() => setAlignment("start")}>
                    <Image width={20} height={20} src={left} alt="" />
                  </button>
                  <button onClick={() => setAlignment("center")}>
                    <Image width={20} height={20} src={center} alt="" />
                  </button>
                  <button onClick={() => setAlignment("end")}>
                    <Image width={20} height={20} src={right} alt="" />
                  </button>
                </AllignmentInnerDiv>
              </Alignment>

              <TextSize>
                <h3>Text size</h3>
                <TextRangeDiv>
                  <input
                    onChange={setRange}
                    type="range"
                    id="vol"
                    name="vol"
                    min="0"
                    max="50"
                  />
                  <p>{textSize}px</p>
                </TextRangeDiv>
              </TextSize>

              <hr style={{ width: "100%" }} />

              <TextAndBackgroundDiv onClick={colorsDivClicked}>
                <div>
                  <TextColor
                    onClick={selectColor}
                    $TextColor={textColor}
                  ></TextColor>
                  {isColor && (
                    <ColorsDiv>
                      {colors.map((item, i) => (
                        <ButtonText
                          onClick={selectedColor}
                          key={i}
                          $allColors={item}
                        >
                          <p style={{ display: "none" }}>{item}</p>
                        </ButtonText>
                      ))}
                    </ColorsDiv>
                  )}
                  <h2>Text Color</h2>
                </div>

                <div>
                  <BackgroundColor
                    onClick={selectBackgroundButtonColor}
                    $backgroundColor={backgroundColor}
                  ></BackgroundColor>
                  {isBackroundButton && (
                    <BackgroundColorsDiv>
                      {colors.map((item, i) => (
                        <ButtonText
                          key={i}
                          onClick={selectBackgroundColor}
                          $allColors={item}
                        >
                          <p style={{ display: "none" }}>{item}</p>
                        </ButtonText>
                      ))}
                    </BackgroundColorsDiv>
                  )}
                  <h2>Background</h2>
                </div>
              </TextAndBackgroundDiv>
            </Sidebar>
          )}
        </>
      )}
    </MainDiv>
  );
};

export default Header;
