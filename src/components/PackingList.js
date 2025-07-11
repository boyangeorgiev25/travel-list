import { useState } from "react";
import { Item } from "./Item";

export function PackingList({ setItems, items, onDelete, itemToggle }) {


  function ClearList() {
    setItems([]);
  }

  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (<Item item={item} key={item.id} onDelete={onDelete} itemToggle={itemToggle} />))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button onClick={ClearList}>Clear</button>
      </div>





    </div>


  );
}
