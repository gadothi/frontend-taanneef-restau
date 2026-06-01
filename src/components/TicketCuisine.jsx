export default function TicketCuisine({ commande }) {
  return (
    <div style={{ border: "1px solid #aaa", margin: "0.5rem", padding: "0.5rem", background: "#fff", borderRadius: "8px" }}>
      <div><strong>Table {commande.table_id}</strong></div>
      <ul>
        {commande.lignes?.map((l, idx) => (
          <li key={idx}>
            {l.quantite}x {l.produit_id}
            {l.personnalisations && ` (${JSON.stringify(l.personnalisations)})`}
          </li>
        ))}
      </ul>
    </div>
  )
}
