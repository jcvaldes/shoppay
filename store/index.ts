// Importación de las funciones y módulos necesarios desde las bibliotecas de Redux
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cart from './cartSlice'
import user from './userSlice'

// Combinación de reducers (aunque en este caso no hay ninguno)
const reducers = combineReducers({ cart, user })
// Define RootState

// Configuración para la persistencia de estado utilizando el módulo 'redux-persist'
const config = {
  key: 'root', // Clave para el almacenamiento
  storage, // Tipo de almacenamiento (en este caso, almacenamiento en el navegador)
}

// Aplicación de la configuración de persistencia al reducer combinado
const reducer = persistReducer(config, reducers)

// Configuración de la tienda (store) de Redux
const store = configureStore({
  reducer, // El reducer que utilizará la tienda
  devTools: process.env.NODE_ENV !== 'production', // Habilitar herramientas de desarrollo si no estamos en producción
  middleware: [thunk], // Uso del middleware Redux Thunk para manejar acciones asíncronas
})

export default store
