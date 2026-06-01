import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api"
})

export const getProduits = () => API.get("/produits")
export const updateDisponibilite = (id, disponible) => API.put(`/produits/${id}/disponible`, { disponible })
export const postCommande = (data) => API.post("/commandes", data)
export const postAppelServeur = (table_id) => API.post("/appels", { table_id })
export const getAppelsNonTraites = () => API.get("/appels/pending")
export const marquerAppelTraite = (id) => API.put(`/appels/${id}/traite`)
export const postAvis = (data) => API.post("/avis", data)
