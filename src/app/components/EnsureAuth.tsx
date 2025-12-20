"use client";

import { useEffect } from "react";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase/firebase";

export default function EnsureAuth() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await signInAnonymously(auth);
      }
    });
    return () => unsub();
  }, []);

  return null;
}
