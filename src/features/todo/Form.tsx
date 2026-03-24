import { useState } from "react";

// we are passing a function as a prop to the Form from App, functions are objects
// in TS/JS
interface FormProps {
  onAdd: (name: string, age: number) => void;
}

export default function Form({ onAdd }: FormProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    const nameTrimmed: string = e.target.name.value.trim();
    const ageTrimmed: number = Number(e.target.age.value.trim());

    if (!nameTrimmed) {
      alert("Name cannot be empty");
      return;
    }

    if (!ageTrimmed || ageTrimmed < 1) {
      alert("Age should be >=1");
      return;
    }
    onAdd(e.target.name.value, e.target.age.value);
    console.log(e.target.name.value + " " + e.target.age.value);
    setName("");
    setAge("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
