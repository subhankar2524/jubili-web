import React from "react";
import { renderComponent } from "@/components/renderComponent";

type ContainerWidgetProps = {
  children?: any[]; // array of JSON component definitions
  backgroundColor?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  isHorizontal?: boolean;
  gap?: string;
};

const ContainerWidget: React.FC<ContainerWidgetProps> = ({
  children = [],
  backgroundColor = "transparent",
  padding = "1rem",
  margin = "0",
  borderRadius = "0",
  isHorizontal = false,
  gap = "1rem",
}) => {
  return (
    <div
      style={{
        backgroundColor,
        padding,
        margin,
        borderRadius,
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        gap,
      }}
      className="w-full"
    >
      {children.map((child, idx) => (
        <div key={idx}>{renderComponent(child.type, child.props)}</div>
      ))}
    </div>
  );
};

export default ContainerWidget;
