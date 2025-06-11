// components/profile-components/Hero.tsx
import React from "react";
import Button from "../ButtonsAndCallToActions/Button";

type HeroProps = {
  title: string;
  subtitle: string;
  image: string;
  ctaText?: string;
};

const Hero: React.FC<HeroProps> = ({ title, subtitle, image, ctaText }) => (
  <div
    className="relative text-center py-20 px-6 text-white"
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "320px",
    }}
  >
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-lg mb-4">{subtitle}</p>
      {ctaText && <Button text={ctaText} color="blue" />}
    </div>
  </div>
);

export default Hero;
