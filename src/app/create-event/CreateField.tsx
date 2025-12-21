"use client";

import { useState, useRef } from "react";
import type { SingleValue, GroupBase, OptionsOrGroups } from "react-select";
import { customStyles } from "../calendar/selectFilter";
import styles from "./eventdetails.module.css";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CreatableSelect from "react-select/creatable";

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
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState("");

  const isColorInput = !dropdown && inputType === "color";
  const isTextarea = !dropdown && inputType === "textarea";

  const colorInputRef = useRef<HTMLInputElement | null>(null);

  const handleCreate = (inputValue: string) => {
    const v = inputValue.trim();
    const opt: Option = { value: v, label: v };
    setSelectedOption(opt);
    setIsCustom(false);
    setCustomValue("");
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
            className={styles["color-input"]}
            value={color}
            onChange={(e) => setColor(e.target.value)}
            maxLength={7}
          />

          {/* Ikonen som öppnar colorpickern */}
          <button
            type="button"
            className={styles["color-icon-button"]}
            onClick={() => colorInputRef.current?.click()}
          >
            <FontAwesomeIcon icon={faPalette} />
          </button>
          {/* hex som skickas med */}
          <input
            ref={colorInputRef}
            type="color"
            id={name}
            name={name}
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
          <CreatableSelect<Option, false, GroupBase<Option>>
            inputId={name}
            instanceId={name} //för att förhindra över-hydration, flera instanser av samma id
            options={dropdownOptions}
            placeholder={placeholder ?? label}
            styles={customStyles}
            value={selectedOption}
            onChange={(opt) => {
              const picked = opt ?? null;
              setSelectedOption(picked);

              if (picked?.value === "__custom__") {
                setIsCustom(true);
                setCustomValue("");
              } else {
                setIsCustom(false);
                setCustomValue("");
              }
            }}
            onCreateOption={handleCreate}
            formatCreateLabel={(input) => `Skriv själv: "${input}"`}
          />
          {isCustom && (
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="Skriv arrangörens namn…"
            />
          )}

          <input
            type="hidden"
            name={name}
            value={isCustom ? customValue : (selectedOption?.value ?? "")}
            required={required}
          />
        </>
      )}
    </div>
  );
}
