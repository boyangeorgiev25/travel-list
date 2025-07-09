import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";



export default function App() {
  const [items, setItems] = useState([]);

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
     <PackingList setItems={setItems} items={items} onDelete={onDelete} itemToggle={toggleItem} />
     <Stats items={items} />
    </div>
  );

}



