export interface ComponentType {
  [x: string]: any;
  findIndex(arg0: (item: ComponentType) => boolean): unknown;
  id: string;
  img: string;
  key: string;
  component: JSX.Element;
  innerText: string[];
  index: number;
  length: number;
  prevItems?: any;
}

export interface PropsType {
  id: string;
  passingComponents: JSX.Element;
  passingImage: string;
  copyText: string[];
}

// DND kit types
import {
  Active,
  Collision,
  DndContextProps,
  DndContext as OriginalDndContext,
  Over,
  Translate,
  UseDraggableArguments,
  UseDroppableArguments,
  useDraggable as useOriginalDraggable,
  useDroppable as useOriginalDroppable,
} from "@dnd-kit/core";

interface DroppableData {
  id: string;
  position: string;
}
interface UseDroppableTypesafeArguments
  extends Omit<UseDroppableArguments, "data"> {
  data: DroppableData;
}
export function useDroppable(props: UseDroppableTypesafeArguments) {
  return useOriginalDroppable(props);
}

interface DraggableData {
  element: Element;
}
interface UseDraggableTypesafeArguments
  extends Omit<UseDraggableArguments, "data"> {
  data: DraggableData;
}
export function useDraggable(props: UseDraggableTypesafeArguments) {
  return useOriginalDraggable(props);
}

interface TypesafeActive extends Omit<Active, "data"> {
  data: React.MutableRefObject<DraggableData | undefined>;
}
interface TypesafeOver extends Omit<Over, "data"> {
  data: React.MutableRefObject<DroppableData | undefined>;
}
export interface DragEvent {
  activatorEvent: Event;
  active: TypesafeActive;
  collisions: Collision[] | null;
  delta: Translate;
  over: TypesafeOver;
}
export interface DragStartEvent extends Pick<DragEvent, "active"> {}
export interface DragMoveEvent extends DragEvent {}
export interface DragOverEvent extends DragMoveEvent {}
export interface DragEndEvent extends DragEvent {}
export interface DragCancelEvent extends DragEndEvent {}
export interface DndContextTypesafeProps
  extends Omit<
    DndContextProps,
    "onDragStart" | "onDragMove" | "onDragOver" | "onDragEnd" | "onDragCancel"
  > {
  onDragStart?(event: DragStartEvent): void;
  onDragMove?(event: DragMoveEvent): void;
  onDragOver?(event: DragOverEvent): void;
  onDragEnd?(event: DragEndEvent): void;
  onDragCancel?(event: DragCancelEvent): void;
}

// Lexical editor types
export interface NodeMAp {
  _readOnly: boolean;
  clear: void;
  delete: void;
  set: void;
}

export interface Anchor {
  key: string;
  offset: number;
  type: string;
}

interface Focus {
  key: string;
  offset: number;
  type: string;
}
export interface Selection {
  anchor: Anchor;
  dirty: boolean;
  focus: Focus;
  format: number;
  style: string;
  _cachedNodes: null;
}
export interface StateTypes {
  _nodeMap: NodeMAp;
  toJSON(): unknown;
  _flushSync: boolean;
  _readOnly: boolean;
  _selection: Selection;
}

// ////////////

export type ChildItemType = {
  detail: number;
  format: number;
  mode: string;
  style: string;
  text: string;
  type: string;
  version: number;
};

export type EditorStateType = {
  root: {
    children: {
      children: {
        detail: number;
        format: number;
        mode: string;
        style: string;
        text: string;
        type: string;
        version: number;
      }[];
      direction: string;
      format: string;
      indent: number;
      type: string;
      version: number;
    }[];
    direction: string;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
};
