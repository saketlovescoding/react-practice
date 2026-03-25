import { useState } from "react";
import Form from "./features/todo/Form";
import List from "./features/todo/List";

interface Item {
  id: number;
  name: string;
  age: number;
}
function App() {
  // prop for List component
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Rohan", age: 24 },
    { id: 2, name: "Anisha", age: 22 },
  ]);

  // prop for form componet
  function addItem(name: string, age: number) {
    setItems([...items, { id: 3, name, age }]);
  }

  function deleteItem(id: number) {
    const newItems: Item[] = items.filter((item) => item.id !== id);
    setItems(newItems);
  }
  return (
    <div>
      <Form onAdd={addItem} />
      <List items={items} onDelete={deleteItem} />
    </div>
  );
}

export default App;
