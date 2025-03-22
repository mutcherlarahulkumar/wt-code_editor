import { useState } from 'react'
import './App.css'
import Editor from './components/Editor'
import Chatbot from './components/AI/Chatbot'

function App() {

  return (
    <div>
      <Editor />
      <Chatbot />
    </div>
  )
}

export default App
