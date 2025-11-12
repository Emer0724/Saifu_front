import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonS from './components/button-s';


function App() {

  return (
    <>
      <form action="">
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
          <h2>Saifu -- Master your money. Master your life.</h2>
          <div className="box">
            <label htmlFor="account" className='title'>帳號：</label>
            <input type="text" id='account' />
          </div>

          <div className="box">
            <label htmlFor="pwd" className='title'>密碼：</label>
            <input type="text"  id='pwd'/>
          </div>
          <ButtonS>確認</ButtonS>
        </div>
      </form>
    </>
  )
}

export default App
