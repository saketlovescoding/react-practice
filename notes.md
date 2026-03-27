# React Learning Notes

## 1. React Components Receive Only One Props Object

React components only receive **one** props object as their argument. You cannot split props across multiple function parameters.

### Wrong

```tsx
interface ListProps {
  items: { name: string; age: number }[];
}

interface DeleteProp {
  onDelete: () => void;
}

// Second parameter is NEVER passed by React — onDelete will always be undefined
export default function List({ items }: ListProps, { onDelete }: DeleteProp) {
  // ...
}
```

### Correct

```tsx
interface ListProps {
  items: { name: string; age: number }[];
  onDelete: (id: number) => void;
}

// All props in a single object, destructured from one parameter
export default function List({ items, onDelete }: ListProps) {
  // ...
}
```

---

## 2. Place Per-Item Elements Inside the `map()`

If you want a button (or any element) for **each** item, it must be inside the `.map()` callback. Otherwise you get one button for the entire list.

### Wrong

```tsx
<ul>
  {items.map((item, index) => (
    <li key={index}>
      {item.name} : {item.age}
    </li>
  ))}
  {/* This button is outside the map — only renders once */}
  <button onClick={onDelete}>Delete</button>
</ul>
```

### Correct

```tsx
<ul>
  {items.map((item, index) => (
    <li key={index}>
      {item.name} : {item.age}
      {/* Button inside the map — one per item */}
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  ))}
</ul>
```

---

## 3. Function Reference vs Function Call in `onClick`

`onClick` expects a **function reference** (something to call later), not a **function call** (which executes immediately during render).

### Wrong

```tsx
// This CALLS onDelete(item.id) immediately during render
// The return value (undefined) gets assigned to onClick
<button onClick={onDelete(item.id)}>Delete</button>
```

This causes the React error:
> "Cannot update a component ('App') while rendering a different component ('List')"

Because `onDelete` triggers `setItems` in App while List is still rendering.

### Correct

```tsx
// This assigns a function that will be called when the button is clicked
<button onClick={() => onDelete(item.id)}>Delete</button>
```

### Key Rule

- **No arguments?** You can pass the function directly: `onClick={onDelete}`
- **Need arguments?** Wrap it in an arrow function: `onClick={() => onDelete(item.id)}`

### Where Closures Come In

The arrow function `() => onDelete(item.id)` is a **closure** — it "closes over" `item.id` from the surrounding `.map()` scope. Each button's click handler captures its own specific `item.id`, so clicking the right button deletes the right item.

But the core bug was not about closures — it was about **accidentally invoking a function instead of passing it**.

---

## 4. Hardcoded IDs Break Delete Logic

When adding new items, each item needs a **unique id**. Hardcoding the id means multiple items share the same id, so deleting one deletes all of them.

### Wrong

```tsx
function addItem(name: string, age: number) {
  setItems([...items, { id: 3, name, age }]); // id is always 3
}
```

### Better Approaches

- Use `Date.now()` for quick unique ids
- Maintain a counter and increment it
- Use `Math.max(...items.map(i => i.id)) + 1` to get the next id

---

## 5. Re-rendering in React

A component re-renders when:

1. **Its state changes** — calling a setter from `useState` (e.g., `setItems`, `setSubmitCount`) triggers a re-render.
2. **Its props change** — if the parent passes different prop values.
3. **Its parent re-renders** — even if the child's props haven't changed, it re-renders by default. Use `React.memo()` to prevent this.
4. **A context it consumes changes** — if the component uses `useContext` and the context value updates.

### Key takeaway

- Re-renders flow **downward** (parent → children), never upward.
- A child can only cause a parent to re-render **indirectly** — by calling a prop function that updates the parent's state.
- Plain variables outside the component (e.g., `let count = 0`) do **not** trigger re-renders. You must use `useState` for the UI to update.

---

## 6. Dynamic Inline Styles with State

To dynamically change styles, derive the style value from state rather than hardcoding it.

### Example

```tsx
const [submitCount, setSubmitCount] = useState(0);

<div style={{ backgroundColor: submitCount % 2 === 0 ? "yellow" : "white" }}>
  <button onClick={() => setSubmitCount(submitCount + 1)}>
    Change Background Color
  </button>
</div>
```

The inline `style` prop takes a **JavaScript object** with camelCase keys (e.g., `backgroundColor`, not `background-color`). The double curly braces: outer `{}` is the JSX expression, inner `{}` is the style object.
