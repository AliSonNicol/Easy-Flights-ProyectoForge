import Select from "react-select";
import { useState } from "react";

const opcionesCiudades = [
  { label: "Lima – Perú (LIM)", value: "LIM" },
  { label: "Bogotá – Colombia (BOG)", value: "BOG" },
  { label: "Santiago – Chile (SCL)", value: "SCL" },
  { label: "Buenos Aires – Argentina (EZE)", value: "EZE" }
];

export default function AutoCompleteOrigen({ onSelect }) {
  const [valor, setValor] = useState(null);

  const handleChange = (selected) => {
    setValor(selected);
    onSelect(selected.value); // devuelve "LIM", "BOG", etc.
  };

  return (
    <Select
      options={opcionesCiudades}
      value={valor}
      onChange={handleChange}
      placeholder="Escribe tu ciudad de origen..."
      isSearchable={true}
    />
  );
}
