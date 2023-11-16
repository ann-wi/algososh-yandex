import { ElementStates } from "../../types/element-states";

export type TListElement = {
  item: string;
  state: ElementStates;
  position?: number;
};
