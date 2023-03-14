export enum ElementType {
  Ellipse,
  Rectangle,
  Line,
  FreeDrawn,
}

export type FreeDrawnElement = {
  id: string;
  type: ElementType.FreeDrawn;
  points: number[];
};

export type EllipseElement = {
  id: string;
  type: ElementType.Ellipse;
  startX: number;
  startY: number;
  centerX: number;
  centerY: number;
  endX: number;
  endY: number;
  radiusX: number;
  radiusY: number;
};

export type DrawnElement = FreeDrawnElement | EllipseElement;
