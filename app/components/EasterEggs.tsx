"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./EasterEggs.module.css";

type EggId = "cute" | "swinging" | "upsideDown";

const eggs: Record<EggId, { src: string; alt: string; className: string }> = {
  cute: {
    src: "/easter-eggs/cutu.jpg",
    alt: "Cute hidden Spider-Man sticker",
    className: styles.cute,
  },
  swinging: {
    src: "/easter-eggs/swingang.jpg",
    alt: "Swinging hidden Spider-Man sticker",
    className: styles.swinging,
  },
  upsideDown: {
    src: "/easter-eggs/upsidedown.jpg",
    alt: "Upside-down hidden Spider-Man sticker",
    className: styles.upsideDown,
  },
};

const spellCode = "spidey";

export function EasterEggs() {
  const [visible, setVisible] = useState<Record<EggId, boolean>>({
    cute: false,
    swinging: false,
    upsideDown: false,
  });
  const [tapCounts, setTapCounts] = useState<Record<EggId, number>>({
    cute: 0,
    swinging: 0,
    upsideDown: 0,
  });
  const [typed, setTyped] = useState("");
  const [burst, setBurst] = useState<EggId | null>(null);

  const burstEgg = useMemo(() => (burst ? eggs[burst] : null), [burst]);

  const reveal = useCallback((id: EggId) => {
    setVisible((current) => ({ ...current, [id]: true }));
  }, []);

  const handleHotspot = useCallback(
    (id: EggId) => {
      setTapCounts((current) => {
        const nextCount = current[id] + 1;
        if (nextCount >= 3) {
          reveal(id);
          return { ...current, [id]: 0 };
        }

        return { ...current, [id]: nextCount };
      });
    },
    [reveal],
  );

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const cornerSize = window.matchMedia("(max-width: 640px)").matches ? 64 : 72;
      const nearTop = event.clientY <= cornerSize;
      const nearBottom = window.innerHeight - event.clientY <= cornerSize;
      const nearLeft = event.clientX <= cornerSize;
      const nearRight = window.innerWidth - event.clientX <= cornerSize;

      if (nearTop && nearLeft) handleHotspot("cute");
      if (nearTop && nearRight) handleHotspot("swinging");
      if (nearBottom && nearRight) handleHotspot("upsideDown");
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.length !== 1) return;

      setTyped((current) => {
        const next = `${current}${event.key.toLowerCase()}`.slice(-spellCode.length);

        if (next === spellCode) {
          const allEggs = Object.keys(eggs) as EggId[];
          const randomEgg = allEggs[Math.floor(Math.random() * allEggs.length)];
          setBurst(randomEgg);
          reveal(randomEgg);
        }

        return next;
      });
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [handleHotspot, reveal]);

  return (
    <div className={styles.layer}>
      {(Object.keys(eggs) as EggId[]).map((id) => {
        const egg = eggs[id];
        if (!visible[id]) return null;

        return (
          <div key={id} className={`${styles.sticker} ${egg.className}`}>
            <button
              type="button"
              aria-label="Hide easter egg"
              onClick={() => setVisible((current) => ({ ...current, [id]: false }))}
            >
              <Image src={egg.src} alt={egg.alt} fill sizes="180px" />
            </button>
          </div>
        );
      })}

      {burstEgg && (
        <div className={styles.burst}>
          <button type="button" aria-label="Hide easter egg" onClick={() => setBurst(null)}>
            <Image src={burstEgg.src} alt={burstEgg.alt} fill sizes="220px" priority={false} />
          </button>
        </div>
      )}
    </div>
  );
}
