const STORAGE_KEY = 'token'

const isLogged = () => !!localStorage.getItem('id')
const login = token => localStorage.setItem(STORAGE_KEY, token)
const logout = () => {
localStorage.removeItem(STORAGE_KEY)
localStorage.removeItem("id")
localStorage.removeItem("name")
localStorage.removeItem("tipo")
}
const gerente = () =>JSON.parse(localStorage.getItem('tipo')) 
console.log(gerente())
const administrativo = () =>JSON.parse(localStorage.getItem('tipo')) 

export { isLogged, login, logout, gerente, administrativo }