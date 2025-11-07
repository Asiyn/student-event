import styles from "./filter.module.css";
import SelectFilter from "./selectFilter";

export default function Filter() {
  const fakultetOptions = [
    { value: "lintek", label: "LinTek" },
    { value: "stuff", label: "Stuff" },
    { value: "consensus", label: "Consensus" },
  ];

  const sektionerOptions = [
    {
      optgroup: "LinTek",
      items: [
        { value: "mt", label: "Medieteknik" },
        { value: "gdk", label: "Grafisk Design" },
        { value: "bygg", label: "Bygg" },
      ],
    },
    { optgroup: "Stuff", items: [] },
    { optgroup: "Consensus", items: [] },
  ];

  // const festeriOptions = [
  //   {
  //     optgroup: "LinTek",
  //     items: [
  //       { value: "3cant", label: "3cant" },
  //       { value: "tryckbar", label: "Tryckbar" },
  //       { value: "festn", label: "Fest-n" },
  //     ],
  //   },
  //   { optgroup: "Stuff", items: [] },
  //   { optgroup: "Consensus", items: [] },
  // ];

  // const fadderiOptions = [
  //   {
  //     optgroup: "LinTek",
  //     items: [
  //       { value: "legionen", label: "Legionen" },
  //       { value: "skurkeriet", label: "Skurkeriet" },
  //       { value: "kretsn", label: "Kretsn" },
  //       { value: "familjen", label: "Familjen" },
  //       { value: "nphadderiet", label: "N-phadderiet" },
  //     ],
  //   },
  //   { optgroup: "Stuff", items: [] },
  //   { optgroup: "Consensus", items: [] },
  // ];

  // const foreningOptions = [
  //   { value: "stubinen", label: "Stubinen" },
  //   { value: "vargtass", label: "Vargtass" },
  // ];

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
          label="Välj sektion:"
          id="sektion"
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
