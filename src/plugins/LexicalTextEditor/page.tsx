import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Fdiv, TextEditor, PreviewContent } from "./LexicalStylled";
import { useState, useContext, useEffect, useCallback, useRef } from "react";
import ExampleTheme from "@/ExampleTheme";
import ToolbarPlugin from "@/plugins/ToolbarPlugin";
import { MyContext } from "@/context/MyContext";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { StateTypes, EditorStateType, ComponentType } from "../../../types";
import { createDefaultEditorContent, extractInnerText } from "@/types/dashboard";

const placeholder = "Enter some rich text...";

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [],
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme,
};

type OnChangeProps = {
  onChange: (state: StateTypes) => void;
};

const OnChangePlugin: React.FC<OnChangeProps> = ({ onChange }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState as unknown as StateTypes);
    });

    return () => unregister();
  }, [editor, onChange]);

  return null;
};

export default function LexicalTextEditor({
  sectionKey,
  innerText,
  editorContent,
  height,
}: {
  sectionKey?: string;
  innerText?: string;
  editorContent?: EditorStateType;
  height?: number;
}) {
  const [editorState, setEditorState] = useState<EditorStateType>(() =>
    editorContent ?? createDefaultEditorContent(innerText ?? "")
  );
  const [composerKey, setComposerKey] = useState(0);
  const lastExternalContentRef = useRef<string>(
    JSON.stringify(editorContent ?? createDefaultEditorContent(innerText ?? ""))
  );

  const [, setComponentsArray, , , , , , , isPreview] = useContext(MyContext);

  useEffect(() => {
    if (!editorContent) return;

    const serialized = JSON.stringify(editorContent);
    if (serialized === lastExternalContentRef.current) return;

    lastExternalContentRef.current = serialized;
    setEditorState(editorContent);
    setComposerKey((key) => key + 1);
  }, [editorContent]);

  const persistSectionContent = useCallback(
    (nextState: EditorStateType) => {
      if (!sectionKey) return;

      setComponentsArray((prev: ComponentType[]) =>
        prev.map((item) =>
          item.key === sectionKey
            ? {
                ...item,
                editorContent: nextState,
                innerText: extractInnerText(nextState),
              }
            : item
        )
      );
    },
    [sectionKey, setComponentsArray]
  );

  const onChange = useCallback(
    (state: StateTypes) => {
      try {
        const editorStateJSON = state.toJSON() as EditorStateType;
        setEditorState(editorStateJSON);
        lastExternalContentRef.current = JSON.stringify(editorStateJSON);
        persistSectionContent(editorStateJSON);
      } catch (error) {
        console.error("Error processing editor state:", error);
      }
    },
    [persistSectionContent]
  );

  return (
    <Fdiv $height={height}>
      <TextEditor $height={height}>
        <div style={{ height: height ? "100%" : undefined, minHeight: 0 }}>
          {isPreview ? (
            <PreviewContent $height={height}>
              <LexicalComposer
                initialConfig={{
                  ...editorConfig,
                  editorState: JSON.stringify(editorState),
                  editable: false,
                }}
              >
                <div className="editor-container editor-preview">
                  <div className="editor-inner">
                    <RichTextPlugin
                      contentEditable={
                        <ContentEditable
                          className="editor-input editor-input-readonly"
                          aria-readonly
                        />
                      }
                      ErrorBoundary={LexicalErrorBoundary}
                      placeholder={null}
                    />
                  </div>
                </div>
              </LexicalComposer>
            </PreviewContent>
          ) : (
            <LexicalComposer
              key={`${sectionKey}-${composerKey}`}
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
