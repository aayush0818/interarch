const names = ["TATA", "BIRLA", "DRDO", "MERRILL", "MONSTER"];

export function Clients() {
  return (
    <section className="clients-strip">
      {names.map((n) => (
        <span key={n}>{n}</span>
      ))}
    </section>
  );
}
