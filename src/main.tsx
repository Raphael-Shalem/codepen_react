import React from 'react'
import ReactDOM from 'react-dom/client'
import { RootStoreProvider } from 'context/rootStore';
import App from 'app'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootStoreProvider>
       <App/>
    </RootStoreProvider>
  </React.StrictMode>
)
