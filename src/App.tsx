import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './App.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonS from './components/button-s';

function App() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAccount = localStorage.getItem('savedAccount');
    if (savedAccount) {
      setAccount(savedAccount);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5255/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('登入失敗');
      }

      const data = await response.json();
      console.log('登入成功', data);

      if (rememberMe) {
        localStorage.setItem('savedAccount', account);
      } else {
        localStorage.removeItem('savedAccount');
      }

      localStorage.setItem('token', data.token);
      navigate('/menu');
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-card']}>
        <div className="text-center mb-4">
          <h2 className={styles['brand-title']}>Saifu</h2>
          <p className={styles['brand-subtitle']}>Master your money. Master your life.</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control ${styles['custom-input']}`}
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
              className={`form-control ${styles['custom-input']}`}
              id="passwordInput"
              placeholder="請輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="passwordInput">密碼</label>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check d-flex align-items-center">
              <input 
                className={`form-check-input m-0 ${styles['custom-checkbox']}`} 
                type="checkbox" 
                id="rememberMe" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className={`form-check-label ${styles['custom-checkbox-label']}`} htmlFor="rememberMe">
                記住我
              </label>
            </div>
            <a href="#" className={styles['forgot-password']}>忘記密碼？</a>
          </div>

          <ButtonS type="submit">登入</ButtonS>
        </form>
      </div>
    </div>
  )
}

export default App
