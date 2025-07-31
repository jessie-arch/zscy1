
import './mock/schedulemock.js'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import "./main.less"

import handleTouchMove from './pages/index.jsx'
import AllContent from './pages/index.jsx'
createRoot(document.getElementById('root')).render(
  <AllContent/>
)
