import { useState } from "react";

interface FormProps {
  onAdd: (name: string, age: string) => void;
}

export default function Form({ onAdd }: FormProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    onAdd(e.target.name.value, e.target.age.value);
    console.log(e.target.name.value + " " + e.target.age.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
