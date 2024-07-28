export interface ComponentType{
    findIndex(arg0: (item: ComponentType) => boolean): unknown;
    id: string;
    img: string;
    key: string;
    component: JSX.Element;
    innerText: string[];
    index: number;
    length: number;
  };

  export interface PropsType {
    id: string;
    passingComponents: JSX.Element;
    passingImage: string;
    copyText: string[];
  }