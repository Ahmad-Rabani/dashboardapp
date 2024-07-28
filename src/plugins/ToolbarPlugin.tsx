import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import italic from "../../img/type-italic.svg";
import Image from "next/image";
import undo from "../../img/arrow-clockwise.svg";
import redo from "../../img/arrow-counterclockwise.svg";
import bold from "../../img/type-bold.svg";
import underline from "../../img/type-underline.svg";
import right from "../../img/text-right.svg";
import center from "../../img/text-center.svg";
import left from "../../img/text-left.svg";
import { UndoRedoDiv,TextStyle,TextAllignment } from "./ToolBarStylled";

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div
      className="toolbar"
      ref={toolbarRef}
      style={{
        display: "flex",
        justifyContent: "start",
        gap: "5px",
      }}
    >
      <UndoRedoDiv>
        <button
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          className="toolbar-item spaced"
          aria-label="Undo"
        >
          <Image width={20} height={20} src={undo} alt="" />
          <i className="format undo" />
        </button>
        <button
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          className="toolbar-item"
          aria-label="Redo"
        >
          <Image width={20} height={20} src={redo} alt="" />
          <i className="format redo" />
        </button>
      </UndoRedoDiv>
      <hr style={{margin: "0",}}/>
      <Divider />
      <TextStyle>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <Image width={20} height={20} src={bold} alt="" />
        <i className="format bold" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <Image width={20} height={20} src={italic} alt="" />
        <i className="format italic" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <Image width={20} height={20} src={underline} alt="" />
        <i className="format underline" />
      </button>
      {/* <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        <i className="format strikethrough" />
      </button> */}
      </TextStyle>

      <hr  style={{margin: "0px",}}/>

      <Divider />
      <TextAllignment>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="toolbar-item spaced"
        aria-label="Left Align"
      >
        <Image width={20} height={20} src={left} alt="" />
        <i className="format left-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="toolbar-item spaced"
        aria-label="Center Align"
      >
        <Image width={20} height={20} src={center} alt="" />
        <i className="format center-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <Image width={20} height={20} src={right} alt="" />
        <i className="format right-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="toolbar-item"
        aria-label="Justify Align"
      >
        <i className="format justify-align" />
      </button>{" "}
      </TextAllignment>
      <hr  style={{margin: "0px",}}/>
    </div>
  );
}







/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
// import {mergeRegister} from '@lexical/utils';
// import {
//   $getSelection,
//   $isRangeSelection,
//   CAN_REDO_COMMAND,
//   CAN_UNDO_COMMAND,
//   FORMAT_ELEMENT_COMMAND,
//   FORMAT_TEXT_COMMAND,
//   REDO_COMMAND,
//   SELECTION_CHANGE_COMMAND,
//   UNDO_COMMAND,
// } from 'lexical';
// import {useCallback, useEffect, useRef, useState} from 'react';

// const LowPriority = 1;

// function Divider() {
//   return <div className="divider" />;
// }

// export default function ToolbarPlugin() {
//   const [editor] = useLexicalComposerContext();
//   const toolbarRef = useRef(null);
//   const [canUndo, setCanUndo] = useState(false);
//   const [canRedo, setCanRedo] = useState(false);
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);
//   const [isStrikethrough, setIsStrikethrough] = useState(false);

//   const $updateToolbar = useCallback(() => {
//     const selection = $getSelection();
//     if ($isRangeSelection(selection)) {
//       // Update text format
//       setIsBold(selection.hasFormat('bold'));
//       setIsItalic(selection.hasFormat('italic'));
//       setIsUnderline(selection.hasFormat('underline'));
//       setIsStrikethrough(selection.hasFormat('strikethrough'));
//     }
//   }, []);

//   useEffect(() => {
//     return mergeRegister(
//       editor.registerUpdateListener(({editorState}) => {
//         editorState.read(() => {
//           $updateToolbar();
//         });
//       }),
//       editor.registerCommand(
//         SELECTION_CHANGE_COMMAND,
//         (_payload, _newEditor) => {
//           $updateToolbar();
//           return false;
//         },
//         LowPriority,
//       ),
//       editor.registerCommand(
//         CAN_UNDO_COMMAND,
//         (payload) => {
//           setCanUndo(payload);
//           return false;
//         },
//         LowPriority,
//       ),
//       editor.registerCommand(
//         CAN_REDO_COMMAND,
//         (payload) => {
//           setCanRedo(payload);
//           return false;
//         },
//         LowPriority,
//       ),
//     );
//   }, [editor, $updateToolbar]);

//   return (
//     <div className="toolbar" ref={toolbarRef}>
//       <button
//         disabled={!canUndo}
//         onClick={() => {
//           editor.dispatchCommand(UNDO_COMMAND, undefined);
//         }}
//         className="toolbar-item spaced"
//         aria-label="Undo">
//         <i className="format undo" />
//       </button>
//       <button
//         disabled={!canRedo}
//         onClick={() => {
//           editor.dispatchCommand(REDO_COMMAND, undefined);
//         }}
//         className="toolbar-item"
//         aria-label="Redo">
//         <i className="format redo" />
//       </button>
//       <Divider />
//       <button
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
//         }}
//         className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
//         aria-label="Format Bold">
//         <i className="format bold" />
//       </button>
//       <button
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
//         }}
//         className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
//         aria-label="Format Italics">
//         <i className="format italic" />
//       </button>
//       <button
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
//         }}
//         className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
//         aria-label="Format Underline">
//         <i className="format underline" />
//       </button>
//       <button
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
//         }}
//         className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
//         aria-label="Format Strikethrough">
//         <i className="format strikethrough" />
//       </button>
//       <Divider />
//       <button
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
//         }}
//         className="toolbar-item spaced"
//         aria-label="Left Align">
//         <i className="format left-align" />
//       </button>
//       <button
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
//         }}
//         className="toolbar-item spaced"
//         aria-label="Center Align">
//         <i className="format center-align" />
//       </button>
//       <button
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
//         }}
//         className="toolbar-item spaced"
//         aria-label="Right Align">
//         <i className="format right-align" />
//       </button>
//       <button
//         onClick={() => {
//           editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
//         }}
//         className="toolbar-item"
//         aria-label="Justify Align">
//         <i className="format justify-align" />
//       </button>{' '}
//     </div>
//   );
// }