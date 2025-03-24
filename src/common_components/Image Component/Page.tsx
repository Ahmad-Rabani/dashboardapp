import React, { useState, useRef, useEffect, useContext } from "react";
import Sidebar from "../sidebar/Sidebar";
import {
  SidebarDiv,
  BackgroundColor,
  BackgroundColorsDiv,
  ButtonText,
  MainDivOfImage,
} from "./ImageStylled";
import { MyContext } from "@/app/layout";

const ImageComponent = ({ passTheImage }: { passTheImage: string }) => {
  const [backgroundColor, setBackgroundColor] = useState("#ececff");
  const [isBackroundButton, setBackgroundButton] = useState(false);
  const [isBackground, setBackground] = useState(false);
  const [colors, setColor] = useState([]);
  const imageRef = useRef(null);

  const [
    componentsArray,
    setComponentsArray,
    isNewSection,
    setNewSection,
    editorText,
    setEditorText,
    ,
    ,
    isPreview,
    setIsPreview,
  ] = useContext(MyContext);

  function selectBackgroundButtonColor() {
    setBackgroundButton(!isBackroundButton);
  }

  function sectionMainDiv(e: React.MouseEvent<HTMLElement>) {
    setBackground(!isBackground);
  }

  function selectBackgroundColor(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | any
  ) {
    setBackgroundColor(e.target.textContent);
  }

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

  return (
    <div>
      {isPreview ? (
        <MainDivOfImage $backgroundColor={backgroundColor} $preview={isPreview}>
          <img ref={imageRef} src={passTheImage} alt="" />
        </MainDivOfImage>
      ) : (
        <MainDivOfImage $backgroundColor={backgroundColor} $preview={false}>
          <div onClick={sectionMainDiv}>
            <img ref={imageRef} src={passTheImage} alt="" />
          </div>
          {isBackground && (
            <Sidebar>
              <SidebarDiv>
                <BackgroundColor
                  onClick={selectBackgroundButtonColor}
                  $backgroundColor={backgroundColor}
                  $preview={false}
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
              </SidebarDiv>
            </Sidebar>
          )}
        </MainDivOfImage>
      )}
    </div>
  );
};

export default ImageComponent;