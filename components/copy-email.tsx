"use client";

import { useEffect, useRef, useState } from "react";

export function CopyEmail() {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText("tharinduxn@gmail.com");
      setStatus("Email copied to clipboard.");
      timer.current = setTimeout(() => setStatus(""), 4000);
    } catch {
      setStatus("Couldn’t copy. Select the email address above, or use it to open your email app.");
    }
  }

  return <div className="copy-email"><button className="copy-button" type="button" onClick={copy}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M15 8V4H4v11h4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>Copy email address</button><p className="copy-status" role="status" aria-live="polite">{status}</p></div>;
}
