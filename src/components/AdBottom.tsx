"use client";

import { useEffect } from "react";

export default function AdBottom() {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);

  return (
    <section className="w-screen px-5 py-12 flex justify-center border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-4xl w-full">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-4882312961880141"
          data-ad-slot="1434975946"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </section>
  );
}
