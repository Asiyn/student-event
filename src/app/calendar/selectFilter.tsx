import styles from "./filter.module.css";

type Option = {
  value?: string;
  label?: string;
  optgroup?: string;
  items?: { value: string; label: string }[];
};

type SelectFilterProps = {
  label: string;
  id: string;
  options: Option[];
};

export default function SelectFilter({ label, id, options }: SelectFilterProps) {
  return (
    <div className={styles["filter-group"]}>
      <label className={styles["filter-label"]} htmlFor={id}>
        {label}
      </label>
      <select
        className={styles["filter-dropdown"]}
        id={id}
        name={id}
        multiple
        size={1}
      >
        {options.map((opt) =>
          opt.optgroup ? (
            <optgroup key={opt.optgroup} label={opt.optgroup}>
              {opt.items?.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </optgroup>
          ) : (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )
        )}
      </select>
    </div>
  );
}