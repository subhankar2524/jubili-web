//file: components/profile-components/RichTextBox.tsx
import React from "react";

type RichTextBoxProps = {
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  layout?: "left" | "right"; // image position
  textAlign?: "left" | "center" | "right";
  background?: string;
  padding?: string;
};

const RichTextBox: React.FC<RichTextBoxProps> = ({
  title,
  subtitle,
  content,
  image,
  layout = "left",
  textAlign = "left",
  background = "#ffffff",
  padding = "2rem",
}) => {
  const isRight = layout === "right";

  return (
    <div
      style={{
        background,
        padding,
      }}
      className="w-full"
    >
      <div
        className={`flex flex-col md:flex-row ${
          isRight ? "md:flex-row-reverse" : ""
        } items-center gap-6`}
      >
        {image && (
          <div className="w-full md:w-1/2">
            <img
              src={image}
              alt="Rich Text Visual"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <div
          className={`w-full md:w-1/2 text-${textAlign} space-y-4`}
        >
          {title && <h2 className="text-3xl font-bold">{title}</h2>}
          {subtitle && <h4 className="text-xl text-gray-600">{subtitle}</h4>}
          {content && <p className="text-base text-gray-800 whitespace-pre-line">{content}</p>}
        </div>
      </div>
    </div>
  );
};

export default RichTextBox;
