//file: components/profile-components/StorySection.tsx
import React from "react";

type StorySectionProps = {
  heading?: string;
  subheading?: string;
  storyText?: string;
  image?: string;
  layout?: "left" | "right";
  background?: string;
  padding?: string;
  textAlign?: "left" | "center" | "right";
};

const StorySection: React.FC<StorySectionProps> = ({
  heading,
  subheading,
  storyText,
  image,
  layout = "right",
  background = "#fff",
  padding = "2rem",
  textAlign = "left",
}) => {
  const isRight = layout === "right";

  return (
    <section
      style={{ background, padding }}
      className="w-full"
    >
      <div className={`flex flex-col md:flex-row ${isRight ? "md:flex-row-reverse" : ""} items-center gap-6`}>
        {image && (
          <div className="w-full md:w-1/2">
            <img
              src={image}
              alt="Seller Story"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        )}
        <div className={`w-full md:w-1/2 text-${textAlign} space-y-4`}>
          {heading && <h2 className="text-3xl font-bold">{heading}</h2>}
          {subheading && <h4 className="text-xl text-gray-600">{subheading}</h4>}
          {storyText && (
            <p className="text-base text-gray-800 whitespace-pre-line">{storyText}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
