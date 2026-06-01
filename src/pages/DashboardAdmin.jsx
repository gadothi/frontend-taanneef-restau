import { useEffect, useState } from 'react'
import { getProduits, updateDisponibilite, getAppelsNonTraites, marquerAppelTraite } from '../services/api'
import socket from '../services/socket'

export default function DashboardAdmin() {
  const [produits, setProduits] = useState([])
  const [appels, setAppels] = useState([])
  const [stats] = useState({
    commandesJour: 148,
    evolution: '+12%',
    topArticles: [
      { nom: 'Poulet Yassa', count: 42 },
      { nom: 'Jus de Bissap', count: 38 },
      { nom: 'Thiéboudienne', count: 31 }
    ]
  })

  useEffect(() => {
    loadProduits()
    loadAppels()
    socket.on('appel_serveur', () => loadAppels())
    return () => socket.off('appel_serveur')
  }, [])

  const loadProduits = () => getProduits().then(res => setProduits(res.data))
  const loadAppels = () => getAppelsNonTraites().then(res => setAppels(res.data))
  const toggleDispo = (id, dispo) => updateDisponibilite(id, !dispo).then(loadProduits)
  const handleTraiter = (id) => marquerAppelTraite(id).then(loadAppels)

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '220px', background: '#2C4C3B', color: 'white', padding: '1rem', minHeight: '100vh' }}>
        <h2>TAANNÉÉF</h2>
        <nav>Tableau de bord</nav>
        <div>🔔 Appels Salle {appels.length}</div>
        {appels.map(a => (
          <div key={a.id} style={{ background: '#C34A2C', margin: '0.5rem 0', padding: '0.3rem' }}>
            Table {a.table_id} <button onClick={() => handleTraiter(a.id)}>✓ Traité</button>
          </div>
        ))}
      </aside>
      <main style={{ flex: 1, padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '12px', flex: 1 }}>
            COMMANDES DU JOUR<br /><strong>{stats.commandesJour}</strong><br />{stats.evolution}
          </div>
          <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '12px', flex: 1 }}>
            TOP ARTICLES
            <ol>
              {stats.topArticles.map(a => <li key={a.nom}>{a.nom} {a.count}x</li>)}
            </ol>
          </div>
        </div>
        <h3>Gestion du Menu</h3>
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#eee' }}>
            <tr><th>Nom</th><th>Catégorie</th><th>Prix</th><th>Disponible</th></tr>
          </thead>
          <tbody>
            {produits.map(p => (
              <tr key={p.id}>
                <td>{p.nom}</td>
                <td>{p.categorie}</td>
                <td>{p.prix}€</td>
                <td><input type="checkbox" checked={p.disponible} onChange={() => toggleDispo(p.id, p.disponible)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
