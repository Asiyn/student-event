import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
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
      { value: "fest-n", label: "Fest-n" },
    ],
  },
  { optgroup: "Stuff", items: [{ value: "skumpa", label: "Skumpa" }] },
  { optgroup: "Consensus", items: [{ value: "sskadat", label: "SSKADAT" }] },
];

type FilterProps = {
  onFakultetChange: (values: string[]) => void;
  onArrangorChange: (values: string[]) => void;
  onClose: () => void;
};

export default function Filter({
  onFakultetChange,
  onArrangorChange,
  onClose,
}: FilterProps) {
  return (
    <div className={styles["filter-container"]}>
      <div className={styles.filterHeader}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faCaretDown} />
        </button>
      </div>
      
      <div>
        <h2>Filtrera</h2>
        <p>Välj vilka event som ska visas i kalendern.</p>
      </div>


      <form className={styles.filters}>
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
      </form>
    </div>
  );
}
