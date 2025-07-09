

export function Item({ item, onDelete, itemToggle }) {


  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => { itemToggle(item.id); }} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDelete(item.id)}>❌</button>
    </li>
  );
}
