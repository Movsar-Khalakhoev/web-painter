export enum ElementType {
  Circle,
  Rectangle,
  Line,
  FreeDrawn,
}

export type FreeDrawnElement = {
  id: string;
  type: ElementType.FreeDrawn;
  points: number[];
};

export type DrawnElement = FreeDrawnElement;
