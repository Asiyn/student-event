"use client";

import { useState, ChangeEvent, useRef, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./createevent2.module.css";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 10;

type ImageUploaderProps = {
  onFileChange?: (file: File | null, dataUrl: string | null) => void;
  resetKey?: number;
  onMobileDeleteToggle?: (value: boolean) => void;
};

export default function ImageUploader({
  onFileChange,
  resetKey,
  onMobileDeleteToggle,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const removeImage = () => {
    setPreview(null);
    setError(null);
    onFileChange?.(null, null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [resetKey]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Filen är för stor! Max är ${MAX_SIZE_MB} MB.`);
      setPreview(null);
      onFileChange?.(null, null);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Endast JPG, PNG, WEBP och GIF är tillåtna.");
      setPreview(null);
      onFileChange?.(null, null);
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onFileChange?.(file, result);
    };
    reader.readAsDataURL(file);
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const visible = Boolean(preview && isMobile);
    onMobileDeleteToggle?.(visible);
  }, [preview, isMobile, onMobileDeleteToggle]);

  return (
    <>
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
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
            />
          </label>
        )}

        {preview && (
          <div className={styles["preview-img-wrapper"]}>
            <Image
              src={preview}
              alt="Preview"
              fill
              className={styles["preview-img"]}
              onClick={removeImage}
            />
          </div>
        )}
      </div>
      {preview && isMobile && (
        <button className={styles["delete-img-mobile"]} onClick={removeImage}>
          <FontAwesomeIcon icon={faSquareXmark} className={styles.btnIcon} /> Ta
          bort bild
        </button>
      )}
    </>
  );
}
