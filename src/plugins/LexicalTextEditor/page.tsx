import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {Fdiv, DeleteButton, CopyButton,DragButton, TextEditor } from "./LexicalStylled";
import copy from "../../../img/copy-link.png";
import deleteIcon from "../../../img/delete.png"
import Image from "next/image";
import dragIcon from "../../../img/drag.png"

import ExampleTheme from "@/ExampleTheme";
import ToolbarPlugin from "@/plugins/ToolbarPlugin";

const placeholder = "Enter some rich text...";

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};

export default function LexicalTextEditor() {
  return (
    <Fdiv>
    <TextEditor>
      <DragButton draggable>
        <Image src={dragIcon} width={15} height={15} alt=""/>
      </DragButton>

      <CopyButton>
        <Image src={copy} width={15} height={15} alt="" />
      </CopyButton>

      <DeleteButton>
        <Image src={deleteIcon} width={15} height={15} alt=""/>
      </DeleteButton>

      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  style={{ border: "0.5px solid black", minHeight: "200px" }}
                  aria-placeholder={placeholder}
                  placeholder={
                    <div className="editor-placeholder">{placeholder}</div>
                  }
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
              placeholder={null}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
          </div>
        </div>
      </LexicalComposer>
    </TextEditor>
    </Fdiv>
  );
}
