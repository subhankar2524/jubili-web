import React from "react";
import { renderComponent } from "@/components/renderComponent";

type GridItem = {
  type: string;
  props: Record<string, any>;
  gridArea?: {
    colSpan?: number;
    rowSpan?: number;
  };
};

type GridProps = {
  columns?: { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number;
  items: GridItem[];
};

const Grid: React.FC<GridProps> = ({ columns = {}, gap = 4, items }) => {
  const gridCols = [
    columns.base ? `grid-cols-${columns.base}` : "grid-cols-1",
    columns.sm ? `sm:grid-cols-${columns.sm}` : "",
    columns.md ? `md:grid-cols-${columns.md}` : "",
    columns.lg ? `lg:grid-cols-${columns.lg}` : "",
    columns.xl ? `xl:grid-cols-${columns.xl}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`grid ${gridCols} gap-${gap}`}>
      {items.map((item, idx) => {
        const { colSpan = 1, rowSpan = 1 } = item.gridArea || {};
        const spanClass = `col-span-${colSpan} row-span-${rowSpan}`;
        return (
          <div key={idx} className={spanClass}>
            {renderComponent(item.type, item.props)}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
