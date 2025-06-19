//file: app/profile/[query]/page.tsx
"use client";

import styles from "./ProfilePage.module.css"; 
import { useParams } from "next/navigation";

export default function ProfilePage() {
  const { query } = useParams();

  return (
    <div className={styles.wrapper}>
    {/* hero section */}
      <div className={styles.heroImage}>
        <img src="https://www.colorbarcosmetics.com/media/wysiwyg/UnlockingSecrets/10_copy.jpg?auto=webp&format=pjpg&quality=85" alt="hero-bg-image" />
      </div>
    </div>
  );
}
