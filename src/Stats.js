export function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const packedPercentage = numItems !== numPacked ? (numPacked / numItems * 100).toFixed(2) : numItems === 0 ? "No items yet" : "You'r packed";

  return (
    <footer className="stats">
      <em>You have {numItems} items, and you alrady packed  {numPacked} - ({packedPercentage})</em>
    </footer>
  );
}
