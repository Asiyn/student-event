"use client";

import styles from "./filter.module.css";
import Select, { StylesConfig, GroupBase } from "react-select";

export type SelectOption = {
  value: string;
  label: string;
};

export const customStyles: StylesConfig<
  SelectOption,
  boolean,
  GroupBase<SelectOption>
> = {
  control: (base, state) => ({
    ...base,
    backgroundColor:
      "color-mix(in srgb, var(--nav-background) 60%, transparent)",
    borderColor: state.isFocused ? "var(--primary)" : "var(--border)",
    boxShadow: state.isFocused
      ? "0 0 6px color-mix(in srgb, var(--primary) 40%, transparent)"
      : "none",
    borderRadius: "6px",
    color: "var(--text)",
    cursor: "pointer",
    minHeight: "38px",
    transition: "all 0.15s ease-out",
    "&:hover": {
      borderColor: "var(--primary)",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "color-mix(in srgb, var(--text) 60%, transparent)",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "color-mix(in srgb, var(--primary) 25%, transparent)",
    borderRadius: "4px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "var(--text)",
    fontWeight: 500,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "var(--text)",
    ":hover": {
      backgroundColor: "color-mix(in srgb, var(--primary) 40%, transparent)",
      color: "var(--background)",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--text)",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor:
      "color-mix(in srgb, var(--nav-background) 85%, transparent)",
    border: "1px solid var(--border)",
    borderRadius: "6px",
    zIndex: 1000,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: "200px",
    overflowY: "auto",
    zIndex: 1000,
    backdropFilter: "blur(20px)",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected
      ? "color-mix(in srgb, var(--primary) 60%, transparent)"
      : isFocused
        ? "color-mix(in srgb, var(--primary) 20%, transparent)"
        : "transparent",
    color: "var(--text)",
    cursor: "pointer",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "var(--primary)" : "var(--text)",
    transition: "color 0.15s ease",
    ":hover": {
      color: "var(--primary)",
    },
  }),
  input: (base) => ({
    ...base,
    color: "var(--text)",
  }),
};

type FilterPropOption = {
  value?: string;
  label?: string;
  optgroup?: string;
  items?: { value: string; label: string }[];
};

type SelectFilterProps = {
  label: string;
  id: string;
  options: FilterPropOption[];
};

export default function SelectFilter({
  label,
  id,
  options,
}: SelectFilterProps) {
  
  const formattedOptions: (SelectOption | GroupBase<SelectOption>)[] = options.map((opt) => {
    if (opt.optgroup && opt.items) {
      return {
        label: opt.optgroup,
        options: opt.items.map((item) => ({
          value: item.value,
          label: item.label,
        })),
      };
    }
    
    return { 
      value: opt.value ?? "", 
      label: opt.label ?? "" 
    };
  });

  return (
    <div className={styles["filter-group"]}>
      <label className={styles["filter-label"]} htmlFor={id}>
        {label}
      </label>

      <Select
        classNamePrefix="filterselect"
        inputId={id}
        isMulti
        options={formattedOptions}
        placeholder="Välj..."
        menuPlacement="auto"
        styles={customStyles}
      />
    </div>
  );
}