import { useEffect, useState } from 'react'
import socket from '../services/socket'
import TicketCuisine from '../components/TicketCuisine'

export default function Cuisine() {
  const [commandes, setCommandes] = useState({
    recue: [],
    en_preparation: [],
    pret: []
  })

  useEffect(() => {
    socket.on('nouvelle_commande', (commande) => {
      setCommandes(prev => ({
        ...prev,
        recue: [...prev.recue, commande]
      }))
    })
    return () => socket.off('nouvelle_commande')
  }, [])

  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <div style={{ flex: 1, background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ background: '#C34A2C', color: 'white', padding: '0.5rem' }}>À PRÉPARER</h3>
        {commandes.recue.map(c => <TicketCuisine key={c.id} commande={c} />)}
      </div>
      <div style={{ flex: 1, background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ background: '#F4B41A', padding: '0.5rem' }}>EN COURS</h3>
        {commandes.en_preparation.map(c => <TicketCuisine key={c.id} commande={c} />)}
      </div>
      <div style={{ flex: 1, background: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ background: '#2C4C3B', color: 'white', padding: '0.5rem' }}>PRÊT À SERVIR</h3>
        {commandes.pret.map(c => <TicketCuisine key={c.id} commande={c} />)}
      </div>
    </div>
  )
}
