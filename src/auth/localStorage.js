const STORAGE_KEY = 'token'

const isLogged = () => !!localStorage.getItem('uid')
const login = token => localStorage.setItem(STORAGE_KEY, token)
const logout = () => {
localStorage.clear();
}
const gerente = () => localStorage.getItem('type');
const employee= () => localStorage.getItem('type') ;
const administrativo = () => localStorage.getItem('type') 

export { isLogged, login, logout, gerente, administrativo,employee }