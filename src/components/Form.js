import { useState } from "react";

export function Form({ onAdItem }) {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();

    if (!description || quantity <= 0) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAdItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
      <select value={quantity} onChange={e => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>{num} </option>
        ))}
      </select>

      <input type="text" placeholder="Item..." value={description} onChange={e => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
}
