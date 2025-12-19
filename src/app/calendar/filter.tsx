import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./filter.module.css";
import SelectFilter from "./selectFilter";
import { useState } from "react";

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
      { value: "fest-n", label: "Fest-n" },
    ],
  },
  { optgroup: "Stuff", items: [{ value: "skumpa", label: "Skumpa" }] },
  { optgroup: "Consensus", items: [{ value: "sskadat", label: "SSKADAT" }] },
];

type FilterProps = {
  onFakultetChange: (values: string[]) => void;
  onArrangorChange: (values: string[]) => void;
};

export default function Filter({
  onFakultetChange,
  onArrangorChange,
}: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${styles["filter-container"]} ${isOpen ? styles.changeGap : ""}`}>
      <button className={styles.closeButton} onClick={() => setIsOpen((v) => !v)}>
        <FontAwesomeIcon className={`${styles["toggle-icon"]} ${isOpen ? styles.open : ""}`} icon={faCaretDown} />
      </button>

      <div>
        <h2>Filtrera</h2>
        <p>Välj vilka event som ska visas i kalendern.</p>
      </div>

      <div>
        <form className={`${styles.filters} ${isOpen ? styles.show : ""}`}>
          <div className={styles.filtersInner}>
          <SelectFilter
            label="Välj fakultet:"
            id="fakultet"
            options={fakultetOptions}
            onChange={onFakultetChange}
          />
          <SelectFilter
            label="Välj arrangör:"
            id="arrangor"
            options={sektionerOptions}
            onChange={onArrangorChange}
          />
          </div>
        </form>
      </div>
    </div>
  );
}
