import { useState } from "react";
import Post from "./features/jsonPlaceholder/Post";
import Form from "./features/todo/Form";
import List from "./features/todo/List";

interface Item {
  id: number;
  name: string;
  age: number;
}

let id: number = 3;
function App() {
  // prop for List component
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Rohan", age: 24 },
    { id: 2, name: "Anisha", age: 22 },
  ]);

  const [submitCount, setSubmitCount] = useState(0);
  // prop for form componet
  function addItem(name: string, age: number) {
    setItems([...items, { id, name, age }]);
    id++;
  }

  function deleteItem(id: number) {
    const newItems: Item[] = items.filter((item) => item.id !== id);
    setItems(newItems);
  }

  function color(): any {
    setSubmitCount(submitCount + 1);
  }
  return (
    <div style={{ backgroundColor: submitCount % 2 == 0 ? "yellow" : "white" }}>
      <button type="submit" onClick={() => color()}>
        Change Background Color
      </button>
      <Form onAdd={addItem} />
      <List items={items} onDelete={deleteItem} />
      <Post />
    </div>
  );
}

export default App;
