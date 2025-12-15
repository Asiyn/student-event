"use client";

import { useState, useRef } from "react";
import Select, { SingleValue, GroupBase, OptionsOrGroups } from "react-select";
import { customStyles } from "../calendar/selectFilter";
import styles from "./eventdetails.module.css";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type Option = {
  value: string;
  label: string;
};

type EventDetailsProps = {
  label: string;
  name: string;
  inputType?: "text" | "date" | "time" | "color" | "textarea" | "url";
  dropdown?: boolean;
  dropdownOptions?: OptionsOrGroups<Option, GroupBase<Option>>;
  placeholder?: string;
  required?: boolean;
  fullWidth?: boolean;
};

const today = new Date().toISOString().split("T")[0];

export default function CreateField({
  label,
  name,
  inputType = "text",
  dropdown = false,
  dropdownOptions = [],
  placeholder,
  required = false,
  fullWidth = false,
}: EventDetailsProps) {
  const [color, setColor] = useState("#202353"); //ändra default färg
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [customText, setCustomText] = useState("");

  const isColorInput = !dropdown && inputType === "color";
  const isTextarea = !dropdown && inputType === "textarea";
  const isCustom = selectedOption?.value === "__custom__";
  const colorInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectChange = (option: SingleValue<Option>) => {
    setSelectedOption(option ?? null);
    if (option?.value !== "__custom__") setCustomText("");
  };

  const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div
      className={styles["field-container"]}
      style={{ gridColumn: fullWidth ? "1 / span 2" : "auto" }}
    >
      <label htmlFor={name}>
        {label}
        {required && <span className={"required-star"}> *</span>}
      </label>

      {/* TEXTAREA */}
      {isTextarea && (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          className={styles["textarea"]}
          placeholder={placeholder ?? label}
        />
      )}

      {/* COLOR PICKER */}
      {isColorInput && (
        <div className={styles["color-field"]}>
          <div
            className={styles["color-preview"]}
            style={{ backgroundColor: color }}
          />
          <input
            type="text"
            className={styles["colorPreview"]}
            value={color}
            onChange={(e) => setColor(e.target.value)}
            maxLength={7}
          />

          {/* Ikonen som öppnar färgväljaren */}
          <button
            type="button"
            className={styles["color-icon-button"]}
            onClick={() => colorInputRef.current?.click()}
          >
            <FontAwesomeIcon icon={faPalette} />
          </button>
          {/* Själva color-inputen som skickas med i formuläret */}
          <input
            ref={colorInputRef}
            type="color"
            id={name}
            name={name} // t.ex. "colorCalendar"
            value={color}
            onChange={onColorChange}
            className={styles["color-hidden"]}
          />
        </div>
      )}

      {/* VANLIGA INPUTS */}
      {!dropdown && !isColorInput && !isTextarea && (
        <input
          type={inputType}
          id={name}
          name={name}
          required={required}
          placeholder={placeholder ?? label}
          min={inputType === "date" ? today : undefined}
        />
      )}

      {/* DROPDOWN */}
      {dropdown && (
        <>
          <Select
            inputId={name}
            options={dropdownOptions}
            placeholder={placeholder ?? label}
            styles={customStyles}
            value={selectedOption}
            onChange={handleSelectChange}
          />

          {/* (valfri) custom text om värdet är "__custom__" */}
          {isCustom && (
            <input
              type="text"
              id={name}
              name={name}
              required={required}
              placeholder="Skriv eget namn…"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className={styles["custom-input"]}
            />
          )}

          {/* Hidden input så att required funkar när man väljer i Select */}
          {!isCustom && (
            <input
              type="hidden"
              name={name}
              required={required}
              value={selectedOption?.value ?? ""}
            />
          )}
        </>
      )}
    </div>
  );
}
