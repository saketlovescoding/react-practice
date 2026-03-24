import { useState } from "react";
import Form from "./features/todo/Form";
import List from "./features/todo/List";

interface Item {
  name: string;
  age: number;
}
function App() {

  // prop for List component
  const [items, setItems] = useState<Item[]>([
    { name: "Rohan", age: 24 },
    { name: "Anisha", age: 22 },
  ]);

  // prop for form componet
  function addItem(name:string, age:number){
    setItems([...items, {name, age}])
  }
  return (
    <div>
      <Form onAdd={addItem}/>
      <List items={items} />
    </div>
  );
}

export default App;
