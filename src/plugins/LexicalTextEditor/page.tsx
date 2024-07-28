import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { Fdiv, TextEditor } from "./LexicalStylled";
import { useState, useContext, useEffect } from "react";

import ExampleTheme from "@/ExampleTheme";
import ToolbarPlugin from "@/plugins/ToolbarPlugin";
import { MyContext } from "@/app/layout";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { json } from "stream/consumers";

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

export default function LexicalTextEditor({ innerText }: {innerText: string}) {
  const initial = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "color: black;",
              text: innerText ? innerText : "",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };

  const [editorState, setEditorState] = useState(JSON.stringify(initial));

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

  const OnChangePlugin = ({ onChange }) => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        onChange(editorState);
      });
    }, [editor, onChange]);
  };

  const onChange = (state) => {
    const editorStateJSON = state.toJSON();
    setEditorState(editorStateJSON);
  };

  useEffect(() => {
    setEditorText(editorState);
  }, [editorState]);


  return (
    <Fdiv>
      <TextEditor>
        <div>
          {isPreview ? 
          <div style={{padding:"20px"}}> 
          {editorText.root.children[0].children.map(
              (item) => item.text
            )}
          </div>:
          <LexicalComposer
            initialConfig={{
              ...editorConfig,
              editorState: editorState,
            }}
          >
            <div className="editor-container">
              <ToolbarPlugin />
              <div className="editor-inner">
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable
                      defaultValue={editorState}
                      className="editor-input"
                      style={{
                        border: "0.5px solid black",
                        minHeight: "200px",
                      }}
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
                <OnChangePlugin onChange={onChange} />
              </div>
            </div>
          </LexicalComposer>}
        </div>
      </TextEditor>
    </Fdiv>
  );
}