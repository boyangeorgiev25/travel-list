import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];


export default function App() {
  const [items, setItems] = useState([]);

  function handlAddItem(item) {
   setItems(items => [...items, item]);
}

  return (
    <div className="app">
     <Logo />
     <Form  onAdItem={handlAddItem}/>
     <PackingList items={items} modifyItem={setItems} />
     <Stats />
    </div>
  );

}


function Logo() {
  return(
    <h1> Far Away </h1>
  )
}

function Form({onAdItem}) {

const [description, setDescription] = useState("");
const [quantity, setQuantity] = useState(1);

  function handleSubmit(event ) {
    event.preventDefault();

    if(!description || quantity <= 0) return;
      
    const newItem = {description, quantity, packed: false, id: Date.now()};
    onAdItem(newItem);
    setDescription("");
    setQuantity(1);
  }

  return(
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
      <select value={quantity} onChange={e => setQuantity(+e.target.value)}>
       {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
         <option value={num } key={num}>{num} </option>
       ))}
        </select>

      <input type="text" placeholder="Item..." value={description} onChange={e=>setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  )
}

function PackingList({ items , modifyItem }) {
  return(
  <div className="list">
    <ul >
      {items.map(item => 
        ( <Item item={item} key={item.id} modifyItem={modifyItem}/> ))}
    </ul>
  </div>
  )
}

function Item({ item  , modifyItem }) {
  function toggleItem() {
    modifyItem(items => items.map(i => i.id === item.id ? { ...i, packed: !i.packed } : i));
  }
  
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" }: {}}>
      {item.description} {item.quantity}
      </span>
      <button onClick={toggleItem}>❌</button>
      </li>
  )
}


function Stats() {
  return(
    <footer className="stats">
      <em>You have X items, and you alrady packed X</em>
      </footer>
  )
}
