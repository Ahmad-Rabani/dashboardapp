import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Fdiv, TextEditor } from "./LexicalStylled";
import { useState, useContext, useEffect } from "react";
import ExampleTheme from "@/ExampleTheme";
import ToolbarPlugin from "@/plugins/ToolbarPlugin";
import { MyContext } from "@/app/layout";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { StateTypes, EditorStateType, ChildItemType } from "../../../types";
import { EditorState } from "lexical";

const placeholder = "Enter some rich text...";

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [],
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme,
};

export default function LexicalTextEditor({
  innerText,
}: {
  innerText: string;
}) {
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

  const [editorState, setEditorState] = useState(initial);

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

  type OnChangeProps = {
    onChange: any;
  };

  const OnChangePlugin: React.FC<OnChangeProps> = ({ onChange }) => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      const unregister = editor.registerUpdateListener(({ editorState }) => {
        onChange(editorState);
      });

      return () => unregister();
    }, [editor, onChange]);

    return null;
  };

  const onChange = (state: StateTypes) => {
    try {
      // Assuming state.toJSON() returns a JSON-compatible structure for EditorStateType
      const editorStateJSON = state.toJSON() as EditorStateType;
      setEditorState(editorStateJSON);
    } catch (error) {
      console.error("Error processing editor state:", error);
    }
  };

  useEffect(() => {
    setEditorText(editorState);
  }, [editorState, setEditorText]);

  return (
    <Fdiv>
      <TextEditor>
        <div>
          {isPreview ? (
            <div style={{ padding: "20px", backgroundColor: "#fdc386" }}>
              {editorText.root.children[0].children.map(
                (item: ChildItemType, index: number) => (
                  <p key={index}>{item.text}</p>
                )
              )}
            </div>
          ) : (
            <LexicalComposer
              initialConfig={{
                ...editorConfig,
                editorState: JSON.stringify(editorState),
              }}
            >
              <div className="editor-container">
                <ToolbarPlugin />
                <div className="editor-inner">
                  <RichTextPlugin
                    contentEditable={
                      <ContentEditable
                        className="editor-input"
                        style={{
                          border: "0.5px solid black",
                          minHeight: "200px",
                        }}
                        aria-placeholder={placeholder}
                      />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                    placeholder={
                      <div className="editor-placeholder">{placeholder}</div>
                    }
                  />
                  <HistoryPlugin />
                  <AutoFocusPlugin />
                  <OnChangePlugin onChange={onChange} />
                </div>
              </div>
            </LexicalComposer>
          )}
        </div>
      </TextEditor>
    </Fdiv>
  );
}
