"use client";

import { useState } from "react";
import Select, { SingleValue, GroupBase, OptionsOrGroups } from "react-select";
import { customStyles } from "../calendar/selectFilter";
import styles from "./eventdetails.module.css";

export type Option = {
  value: string;
  label: string;
};

type EventDetailsProps = {
  label: string;
  name: string;
  inputType?: "text" | "date" | "time" | "color";
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
  const [selected, setSelected] = useState<SingleValue<Option>>(null);
  const [customValue, setCustomValue] = useState("");

  const handleChange = (option: SingleValue<Option>) => {
    setSelected(option);

    // Reset custom value when switching away
    if (option?.value !== "__custom__") {
      setCustomValue("");
    }
  };

  const isCustom = selected?.value === "__custom__";

  return (
    <div className={styles["field-container"]}>
      <label htmlFor={name}>{label}</label>

      {!dropdown && (
        <input
          type={inputType}
          id={name}
          name={name}
          placeholder={placeholder ?? label}
        />
      )}

      {dropdown && (
        <>
          <Select
            inputId={name}
            name={name}
            options={dropdownOptions}
            value={selected}
            onChange={handleChange}
            placeholder={placeholder ?? label}
            styles={customStyles}
          />

          {isCustom && (
            <input
              type="text"
              className={styles["custom-input"]}
              placeholder="Skriv eget alternativ…"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
            />
          )}
        </>
      )}
    </div>
  );
}
