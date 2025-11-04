import styles from "./filter.module.css";

export default function Filter() {
  return (
    <div className={styles["filter-container"]}>
      <div>
        <h2>Filtrera</h2>
        <p>Välj vilka event som ska visas i kalendern.</p>
      </div>

      <form action="" className={styles["filters"]}>
        <div className={styles["filter-group"]}>
          <label className={styles["filter-label"]} htmlFor="fakultet">
            Välj fakultet:
          </label>
          <select
            className={styles["filter-dropdown"]}
            name="fakultet"
            id="fakultet"
            multiple
            size={1}
          >
            <option value="lintek">LinTek</option>
            <option value="stuff">Stuff</option>
            <option value="consensus">Consensus</option>
          </select>
        </div>

        <div className={styles["filter-group"]}>
          <label className={styles["filter-label"]} htmlFor="festeri">
            Välj Festeri:
          </label>
          <select
            className={styles["filter-dropdown"]}
            name="festeri"
            id="festeri"
            multiple
            size={1}
          >
            <optgroup label="LinTek">
              <option value="3cant">3cant</option>
              <option value="tryckbar">Tryckbar</option>
              <option value="festn">Fest-n</option>
            </optgroup>
            <optgroup label="Stuff"></optgroup>
            <optgroup label="Consensus"></optgroup>
          </select>
        </div>

        <div className={styles["filter-group"]}>
          <label className={styles["filter-label"]} htmlFor="fadderi">
            Välj Fadderi:
          </label>
          <select
            className={styles["filter-dropdown"]}
            name="festeri"
            id="festeri"
            multiple
            size={1}
          >
            <optgroup label="LinTek">
              <option value="legionen">Legionen</option>
              <option value="skurkeriet">Skurkeriet</option>
              <option value="kretsn">Kretsn</option>
              <option value="familjen">Familjen</option>
              <option value="nphadderiet">N-phadderiet</option>
            </optgroup>
            <optgroup label="Stuff"></optgroup>
            <optgroup label="Consensus"></optgroup>
          </select>
        </div>

        <input className={styles['submit-filter']} type="submit" value="Tillämpa filtrering" />
      </form>
    </div>
  );
}
