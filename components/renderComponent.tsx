// components/renderComponent.tsx
import Hero from "./profile-components/HeroAndBannerSections/Hero";
import Button from "./profile-components/ButtonsAndCallToActions/Button";
import Grid from "./profile-components/Grid";
import RichTextBox from "./profile-components/TextAndContentBlocks/RichTextBox";
import StorySection from "./profile-components/TextAndContentBlocks/StorySection";
import ContainerWidget from "./profile-components/UtilityWidgets/ContainerWidget";

export function renderComponent(type: string, props: any) {
  switch (type) {
    case "hero":
      return <Hero {...props} />;
    case "button":
      return <Button {...props} />;
    case "grid":
      return <Grid {...props} />;
    case "container":
      return <ContainerWidget {...props} />;
    case "richText":
      return <RichTextBox {...props} />;
    case "story":
      return <StorySection {...props} />;
    default:
      return null;
  }
}