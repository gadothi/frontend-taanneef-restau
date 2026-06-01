import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProduits, postAppelServeur } from '../services/api'
import CardProduit from '../components/CardProduit'
import CategoriePills from '../components/CategoriePills'

export default function MenuClient() {
  const [searchParams] = useSearchParams()
  const tableId = searchParams.get('table')
  const [produits, setProduits] = useState([])
  const [categorieActive, setCategorieActive] = useState('Plats')

  useEffect(() => {
    getProduits().then(res => setProduits(res.data))
  }, [])

  const categories = [...new Set(produits.map(p => p.categorie))]
  const produitsFiltres = produits.filter(p => p.categorie === categorieActive)

  const handleAppelServeur = () => {
    postAppelServeur(tableId)
    alert('Appel serveur envoyé')
  }

  if (!tableId) return <div>Table non spécifiée</div>

  return (
    <div style={{ padding: '1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>TAANNÉÉF</h1>
        <div>Table {tableId}</div>
        <button onClick={handleAppelServeur}>🔔 Appel serveur</button>
      </header>
      <CategoriePills categories={categories} active={categorieActive} setActive={setCategorieActive} />
      <div>
        {produitsFiltres.map(p => (
          <CardProduit key={p.id} produit={p} tableId={tableId} />
        ))}
      </div>
    </div>
  )
}
