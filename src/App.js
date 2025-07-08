import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];


export default function App() {
  const [items, setItems] = useState([initialItems]);

  function handlAddItem(item) {
   setItems(items => [...items, item]);
}

function onDelete(id) {
    setItems(items => items.filter(i => i.id !== id ));
  }

function toggleItem(id) {
    setItems(items => items.map(item =>item.id === id ? { ...item, packed: !item.packed } : item));
    };

  return (
    <div className="app">
     <Logo />
     <Form  onAdItem={handlAddItem}/>
     <PackingList items={items} onDelete={onDelete} itemToggle={toggleItem} />
     <Stats items={items} />
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

function PackingList({ items , onDelete, itemToggle }) {
  return(
  <div className="list">
    <ul >
      {items.map(item => 
        ( <Item item={item} key={item.id} onDelete={onDelete} itemToggle={itemToggle}/> ))}
    </ul>
  </div>
  )
}

function Item({ item  , onDelete, itemToggle }) {
  

  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={()=>{itemToggle(item.id)}}/>
      <span style={item.packed ? { textDecoration: "line-through" }: {}}>
      {item.description} {item.quantity}
      </span>
      <button onClick={()=> onDelete(item.id)}>❌</button>
      </li>
  )
}


function Stats({items}) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length; 
  const packedPercentage = numItems !== numPacked ? (numPacked / numItems * 100).toFixed(2) : numItems === 0 ? "No items yet" : "You'r packed";

  return(
    <footer className="stats">
      <em>You have {numItems} items, and you alrady packed  {numPacked} - ({packedPercentage})</em>
      </footer>
  )
}
