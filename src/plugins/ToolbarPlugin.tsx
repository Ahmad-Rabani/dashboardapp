import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
} from "@lexical/selection";
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
import { Baseline, Highlighter, Strikethrough } from "lucide-react";
import Image from "next/image";
import italic from "../../img/type-italic.svg";
import undo from "../../img/arrow-clockwise.svg";
import redo from "../../img/arrow-counterclockwise.svg";
import bold from "../../img/type-bold.svg";
import underline from "../../img/type-underline.svg";
import right from "../../img/text-right.svg";
import center from "../../img/text-center.svg";
import left from "../../img/text-left.svg";
import ToolbarColorControl, { preventEditorFocusLoss } from "./ToolbarColorControl";
import {
  UndoRedoDiv,
  TextStyle,
  TextAllignment,
  TextColors,
  ToolbarWrapper,
  ToolbarDivider,
} from "./ToolBarStylled";

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
  const [fontColor, setFontColor] = useState("");
  const [bgColor, setBgColor] = useState("");

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setFontColor($getSelectionStyleValueForProperty(selection, "color", ""));
      setBgColor(
        $getSelectionStyleValueForProperty(selection, "background-color", "")
      );
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
        () => {
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

  const applyStyle = useCallback(
    (styles: Record<string, string | null>) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
      editor.focus();
    },
    [editor]
  );

  return (
    <ToolbarWrapper className="toolbar" ref={toolbarRef}>
      <UndoRedoDiv>
        <button
          disabled={!canUndo}
          onMouseDown={preventEditorFocusLoss}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          className="toolbar-item spaced"
          aria-label="Undo"
        >
          <Image width={20} height={20} src={undo} alt="" />
        </button>
        <button
          disabled={!canRedo}
          onMouseDown={preventEditorFocusLoss}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          className="toolbar-item"
          aria-label="Redo"
        >
          <Image width={20} height={20} src={redo} alt="" />
        </button>
      </UndoRedoDiv>
      <ToolbarDivider />
      <Divider />
      <TextStyle>
        <button
          onMouseDown={preventEditorFocusLoss}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
          className={"toolbar-item spaced " + (isBold ? "active" : "")}
          aria-label="Format Bold"
        >
          <Image width={20} height={20} src={bold} alt="" />
        </button>
        <button
          onMouseDown={preventEditorFocusLoss}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
          className={"toolbar-item spaced " + (isItalic ? "active" : "")}
          aria-label="Format Italics"
        >
          <Image width={20} height={20} src={italic} alt="" />
        </button>
        <button
          onMouseDown={preventEditorFocusLoss}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
          className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
          aria-label="Format Underline"
        >
          <Image width={20} height={20} src={underline} alt="" />
        </button>
        <button
          onMouseDown={preventEditorFocusLoss}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          }}
          className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
          aria-label="Format Strikethrough"
        >
          <Strikethrough size={18} strokeWidth={2} />
        </button>
      </TextStyle>

      <ToolbarDivider />

      <TextColors>
        <ToolbarColorControl
          label="Text color"
          icon={<Baseline size={16} strokeWidth={2} />}
          value={fontColor}
          onChange={(color) => applyStyle({ color })}
          onClear={() => applyStyle({ color: null })}
        />
        <ToolbarColorControl
          label="Highlight color"
          icon={<Highlighter size={16} strokeWidth={2} />}
          value={bgColor}
          onChange={(color) => applyStyle({ "background-color": color })}
          onClear={() => applyStyle({ "background-color": null })}
          allowTransparent
        />
      </TextColors>

      <ToolbarDivider />

      <Divider />
      <TextAllignment>
        <button
          onMouseDown={preventEditorFocusLoss}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
          }}
          className="toolbar-item spaced"
          aria-label="Left Align"
        >
          <Image width={20} height={20} src={left} alt="" />
        </button>
        <button
          onMouseDown={preventEditorFocusLoss}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
          }}
          className="toolbar-item spaced"
          aria-label="Center Align"
        >
          <Image width={20} height={20} src={center} alt="" />
        </button>
        <button
          onMouseDown={preventEditorFocusLoss}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
          }}
          className="toolbar-item spaced"
          aria-label="Right Align"
        >
          <Image width={20} height={20} src={right} alt="" />
        </button>
        <button
          onMouseDown={preventEditorFocusLoss}
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
          }}
          className="toolbar-item"
          aria-label="Justify Align"
        >
          <i className="format justify-align" />
        </button>
      </TextAllignment>
      <ToolbarDivider />
    </ToolbarWrapper>
  );
}
