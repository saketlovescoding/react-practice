interface ListProps {
  items: { id: number, name: string; age: number }[];
  onDelete: (id:number) => void;
}
export default function List({ items, onDelete }: ListProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.name} : {item.age}
          <button type="submit" onClick={() => onDelete(item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
