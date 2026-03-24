interface ListProps {
  items: { name: string; age: string }[];
}
export default function List({ items }: ListProps) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.name} : {item.age}
        </li>
      ))}
    </ul>
  );
}
