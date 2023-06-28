import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import { Stage } from "konva/lib/Stage";
import { Layer } from "konva/lib/Layer";
import { Rect } from "konva/lib/shapes/Rect";
import { Circle } from "konva/lib/shapes/Circle";
import { Line } from "konva/lib/shapes/Line";
import { Group } from "konva/lib/Group";
import { Text } from "konva/lib/shapes/Text";

@customElement("sp-universe")
export class SpUniverse extends LitElement {
  stage?: Stage;
  layer?: Layer;
  rect?: Rect;

  constructor() {
    super();
  }

  firstUpdated() {
    // Create a new stage
    const stage = new Stage({
      container: this.renderRoot.querySelector("#render") as HTMLDivElement, // container id
      width: 500,
      height: 500,
    });

    // Create a new layer
    const layer = new Layer();

    // Create the three anchor points in the middle of the stage
    const anchors = [
      new Circle({ x: stage.width() / 2, y: stage.height() / 2, radius: 2, fill: "white" }),
      new Circle({ x: stage.width() / 2 - 50, y: stage.height() / 2, radius: 2, fill: "white" }),
      new Circle({ x: stage.width() / 2 + 50, y: stage.height() / 2, radius: 2, fill: "white" }),
    ];

    // For each anchor, create a line, a shape, and a text
    anchors.forEach((anchor, i) => {
      // Calculate position for shape and text
      const shapeX = anchor.x() + Math.cos(i * ((2 * Math.PI) / 3)) * 100;
      const shapeY = anchor.y() + Math.sin(i * ((2 * Math.PI) / 3)) * 100;

      // Create a line from the anchor to the shape
      const line = new Line({
        points: [anchor.x(), anchor.y(), anchor.x() + 20, anchor.y() + 20, shapeX, shapeY],
        stroke: "gray",
        strokeWidth: 1,
      });

      // Create a shape
      const shape = new Circle({
        x: shapeX,
        y: shapeY,
        radius: 20,
        fill: "yellow",
      });

      // Create a text
      const text = new Text({
        x: shapeX,
        y: shapeY,
        text: `Link ${i + 1}`,
        fontSize: 12,
        align: "center",
        verticalAlign: "middle",
      });

      // Add mouse events to shape and text for creating links
      [shape, text].forEach((element) => {
        element.on("mouseover", () => {
          document.body.style.cursor = "pointer";
        });
        element.on("mouseout", () => {
          document.body.style.cursor = "default";
        });
        element.on("click", () => {
          window.open(`http://example.com/link${i + 1}`, "_blank");
        });
      });

      // Create a group and add line, shape, and text to it
      const group = new Group();
      group.add(line, shape, text);

      // Add group to the layer
      layer.add(group);
    });

    // Add the anchors to the layer
    layer.add(...anchors);

    // Add the layer to the stage
    stage.add(layer);
  }

  render() {
    return html`<div id="render"></div>`;
  }
}
