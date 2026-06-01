import { useState } from 'react'
import { postCommande } from '../services/api'

export default function CardProduit({ produit, tableId }) {
  const [showModal, setShowModal] = useState(false)
  const [quantite, setQuantite] = useState(1)
  const [piment, setPiment] = useState('sans')
  const [accompagnement, setAccompagnement] = useState('riz')

  const ajouter = () => {
    postCommande({
      table_id: tableId,
      lignes: [{
        produit_id: produit.id,
        quantite,
        personnalisations: { piment, accompagnement }
      }],
      total: produit.prix * quantite
    }).then(() => {
      setShowModal(false)
      alert('Commande envoyée !')
    })
  }

  return (
    <>
      <div style={{ border: '1px solid #ccc', margin: '0.5rem', padding: '0.5rem', cursor: 'pointer', borderRadius: '8px' }} onClick={() => setShowModal(true)}>
        <h3>{produit.nom}</h3>
        <p>{produit.description}</p>
        <strong>{produit.prix}€</strong>
      </div>
      {showModal && (
        <div style={{
          position: 'fixed', top: '20%', left: '30%', background: 'white', padding: '2rem',
          border: '1px solid #000', borderRadius: '12px', zIndex: 1000
        }}>
          <h2>{produit.nom}</h2>
          <label>Piment : </label>
          <select value={piment} onChange={e => setPiment(e.target.value)}>
            <option>Sans</option><option>Un peu</option><option>Fort</option><option>Très fort</option>
          </select>
          <br /><br />
          <label>Accompagnement : </label>
          <select value={accompagnement} onChange={e => setAccompagnement(e.target.value)}>
            <option>Riz</option><option>Attiéké</option>
          </select>
          <br /><br />
          <button onClick={ajouter}>Ajouter - {produit.prix * quantite}€</button>
          <button onClick={() => setShowModal(false)}>Fermer</button>
        </div>
      )}
    </>
  )
}
