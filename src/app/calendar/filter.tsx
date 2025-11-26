import styles from "./filter.module.css";
import SelectFilter from "./selectFilter";

export const fakultetOptions = [
  { value: "lintek", label: "LinTek" },
  { value: "stuff", label: "Stuff" },
  { value: "consensus", label: "Consensus" },
];

export const sektionerOptions = [
  {
    optgroup: "LinTek",
    items: [
      { value: "legionen", label: "Legionen" },
      { value: "skurkeriet", label: "Skurkeriet" },
      { value: "kretsn", label: "Kretsn" },
      { value: "familjen", label: "Familjen" },
      { value: "3cant", label: "3CANT" },
      { value: "tryckbar", label: "Tryckbar" },
      { value: "festn", label: "Fest-n" },
    ],
  },
  { optgroup: "Stuff", items: [{ value: "skumpa", label: "Skumpa" }] },
  { optgroup: "Consensus", items: [{ value: "skadat", label: "SSKADAT" }] },
];

export default function Filter() {
  return (
    <div className={styles["filter-container"]}>
      <div>
        <h2>Filtrera</h2>
        <p>Välj vilka event som ska visas i kalendern.</p>
      </div>

      <form className={styles.filters}>
        <SelectFilter
          label="Välj fakultet:"
          id="fakultet"
          options={fakultetOptions}
        />
        <SelectFilter
          label="Välj arrangör:"
          id="arrangor"
          options={sektionerOptions}
        />

        <input
          className={styles["submit-filter"]}
          type="submit"
          value="Filtrera"
        />
      </form>
    </div>
  );
}
