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

export type RectangleElement = {
  id: string;
  type: ElementType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
};

export type LineElement = {
  id: string;
  type: ElementType.Line;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export type DrawnElement = FreeDrawnElement | EllipseElement | RectangleElement | LineElement;
