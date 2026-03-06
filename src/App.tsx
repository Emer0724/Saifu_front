import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonS from './components/button-s';

function App() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt', { account, password });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="text-center mb-4">
          <h2 className="brand-title">Saifu</h2>
          <p className="brand-subtitle">Master your money. Master your life.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control custom-input"
              id="accountInput"
              placeholder="請輸入帳號"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
            />
            <label htmlFor="accountInput">帳號</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control custom-input"
              id="passwordInput"
              placeholder="請輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="passwordInput">密碼</label>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="rememberMe" style={{ borderColor: 'var(--border-color)', backgroundColor: 'transparent' }} />
              <label className="form-check-label text-muted" htmlFor="rememberMe" style={{ fontSize: '0.85rem' }}>
                記住我
              </label>
            </div>
            <a href="#" className="forgot-password">忘記密碼？</a>
          </div>

          <ButtonS type="submit">登入</ButtonS>
        </form>
      </div>
    </div>
  )
}

export default App
