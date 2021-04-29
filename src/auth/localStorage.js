import { securedBrowserCache } from 'secured-browser-storage';


securedBrowserCache.setStorageType('localStorage'); 
const STORAGE_KEY = 'token'

const isLogged = () => !!localStorage.getItem(STORAGE_KEY)
const login = token => localStorage.setItem(STORAGE_KEY, token)
const logout = () => {
localStorage.removeItem(STORAGE_KEY)
securedBrowserCache.removeItem('type');
}
//const gerente = () =>JSON.parse(localStorage.getItem('tipo'))
const gerente = () => securedBrowserCache.getItem('type') 
const administrativo = () => securedBrowserCache.getItem('type') 

export { isLogged, login, logout, gerente, administrativo }