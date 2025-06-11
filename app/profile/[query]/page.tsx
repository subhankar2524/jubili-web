//file: app/profile/[query]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { renderComponent } from "@/components/renderComponent";

type ComponentItem = {
  type: string;
  props: Record<string, any>;
};

export default function ProfilePage() {
  const { query } = useParams();
  const [components, setComponents] = useState<ComponentItem[]>([]);

  useEffect(() => {
    // Demo data — later fetch from DB/API
    setComponents([
      {
        type: "grid",
        props: {
          columns: { base: 1, md: 2, lg: 3 },
          gap: 6,
          items: [
            {
              type: "button",
              props: { text: "Buy Now", color: "#008000" },
              gridArea: { colSpan: 1 },
            },
            {
              type: "hero",
              props: {
                title: "Hello!",
                subtitle: "Welcome to my store",
                image: "https://picsum.photos/800/600"
              },
              gridArea: { colSpan: 2 },
            },
            {
              type: "button",
              props: { text: "Contact", color: "red" },
              gridArea: { colSpan: 1 },
            },
          ]
        }
      },
            {
              type: "richText",
              props: {
                title: "About Our Store",
                subtitle: "Handcrafted with love",
                content: "We believe in high-quality, sustainable fashion.\nEach item is unique and made with care.",
                image: "https://picsum.photos/800/620",
                layout: "right",
                textAlign: "left",
                background: "#f9f9f9",
                padding: "2rem"
              }
            },
            {
  type: "story",
  props: {
    heading: "Our Journey",
    subheading: "Built from passion",
    storyText: "Started in a small studio, we now reach thousands of happy customers.\nEvery piece tells a story.",
    image: "https://picsum.photos/800/621",
    layout: "right",
    background: "#fefefe",
    padding: "2rem",
    textAlign: "left"
  }
},
{
  type: "container",
  props: {
    backgroundColor: "grey",
    // padding: "2rem",
    // margin: '2rem', 
    // borderRadius: "12px",
    isHorizontal: true,

    // gap: "1.5rem",
    children: [
      {
        type: "button",
        props: {
          text: "Shop Now",
          color: "#ff5733",
        },
      },
      {
        type: "button",
        props: {
          text: "Contact Us",
          color: "blue",
        },
      },
      {
        type: "hero",
        props: {
          title: "Welcome!",
          subtitle: "Explore the collection",
          image: "https://picsum.photos/800/621",
        },
      },
      {
        type: "button",
        props:{
          text: "Demo",
        }
      }
    ],
  },
}


    ]);
  }, [query]);

  return (
    <div>
      {components.map((item, idx) => (
        <div key={idx}>{renderComponent(item.type, item.props)}</div>
      ))}
    </div>
  );
}
