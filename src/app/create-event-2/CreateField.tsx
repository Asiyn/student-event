"use client";

import { useState } from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import CreatableSelect from "react-select/creatable";
import { customStyles } from "../calendar/selectFilter";
import styles from "./eventdetails.module.css";

export type Option = {
  value: string;
  label: string;
};

type EventDetailsProps = {
  label: string;
  name: string;
  inputType?: "text" | "date" | "time" | "color" | "textarea"; 
  dropdown?: boolean;
  dropdownOptions?: OptionsOrGroups<Option, GroupBase<Option>>;
  placeholder?: string;
};

export default function CreateField({
  label,
  name,
  inputType = "text",
  dropdown = false,
  dropdownOptions = [],
  placeholder,
}: EventDetailsProps) {
  const [color, setColor] = useState("#ffffff");

  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const isColorInput = !dropdown && inputType === "color";
  const isTextarea = !dropdown && inputType === "textarea";

  return (
    <div className={styles["field-container"]}>
      <label htmlFor={name}>{label}</label>

      {/* ---------- TEXTAREA ---------- */}
      {isTextarea && (
        <textarea
          id={name}
          name={name}
          rows={4}
          className={styles["textarea"]}
          placeholder={placeholder ?? label}
        />
      )}

      {/* ---------- COLOR PICKER ---------- */}
      {isColorInput && (
        <div className={styles["color-field"]}>
          <div
            className={styles["color-preview"]}
            style={{ backgroundColor: color }}
          />

          <input
            type="text"
            className={styles["color-text"]}
            value={color}
            onChange={(e) => setColor(e.target.value)}
            maxLength={7}
          />

          <input
            type="color"
            id={name}
            name={name}
            value={color}
            onChange={onColorChange}
            className={styles["color-hidden"]}
          />
        </div>
      )}

      {/* ---------- NORMAL INPUTS ---------- */}
      {!dropdown && !isColorInput && !isTextarea && (
        <input
          type={inputType}
          id={name}
          name={name}
          placeholder={placeholder ?? label}
        />
      )}

      {/* ---------- DROPDOWN ---------- */}
      {dropdown && (
        <Select
          inputId={name}
          name={name}
          options={dropdownOptions}
          placeholder={placeholder ?? label}
          styles={customStyles}
        />
      )}
    </div>
  );
}
