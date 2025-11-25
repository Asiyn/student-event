"use client";

import { useState, ChangeEvent, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./createevent2.module.css";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const removeImage = () => {
    setPreview(null);
    setError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // allow selecting same file again
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1) Check MIME type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG, WEBP and GIF are allowed.");
      setPreview(null);
      return;
    }

    setError(null);

    // 2) Preview (optional)
    const url = URL.createObjectURL(file);
    setPreview(url);

    // 3) Here you can upload `file` to your server / API / FormData
  };

  return (
    <div className={styles["upload-sub-container"]}>
      {error && <p style={{ color: "var(--warning)" }}>{error}</p>}

      {!preview && (
        <label className={styles["upload"]}>
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className={styles["upload-icon"]}
          />
          Ladda upp bild
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
          />
        </label>
      )}

      {preview && (
        <>
        <div className={styles['preview-img-wrapper']}>
          <Image
            src={preview}
            alt="Preview"
            fill
            className={styles["preview-img"]}
            onClick={removeImage}
          />
          </div>
        </>
      )}
    </div>
  );
}
