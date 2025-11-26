// src/helpers/dropdownHelpers.ts

export type Option = {
  value: string;
  label: string;
};

export type OptionGroupDef = {
  optgroup: string;
  items: Option[];
};

// --- raw data ---

export const sektionerDef: OptionGroupDef[] = [
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
  {
    optgroup: "Stuff",
    items: [{ value: "skumpa", label: "Skumpa" }],
  },
  {
    optgroup: "Consensus",
    items: [{ value: "skadat", label: "SSKADAT" }],
  },
];

// example “flat” list for fakultet
export const fakultetDef: Option[] = [
  { value: "lintek", label: "LinTek" },
  { value: "stuff", label: "Stuff" },
  { value: "consensus", label: "Consensus" },
  { value: "ingen", label: "Fakultetslös" },
  // ...
];

export const buildGroupedOptions = (
  groups: OptionGroupDef[],
  allowCustom = false,
  customLabel = "Annan (skriv själv)"
) => {
  const mapped = groups.map((g) => ({
    label: g.optgroup,
    options: g.items,
  }));

  if (allowCustom) {
    mapped.unshift({
      label: "",
      options: [{ value: "__custom__", label: customLabel }],
    });
  }

  return mapped;
};

export const buildFlatOptions = (
  items: Option[],
  allowCustom = false,
  customLabel = "Annan (skriv själv)…"
) => {
  const mapped = [...items];

  if (allowCustom) {
    mapped.unshift({ value: "__custom__", label: customLabel });
  }

  return mapped;
};