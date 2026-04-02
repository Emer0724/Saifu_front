import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainMenu.module.css';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const menuItems = [
    { id: 'records', title: '記帳', icon: '📝', description: '記錄您的每日收支' },
    { id: 'reports', title: '報表', icon: '📊', description: '查看您的財務狀況' },
    { id: 'categories', title: '分類設定', icon: '🏷️', description: '管理您的收支分類' },
    { id: 'settings', title: '系統設定', icon: '⚙️', description: '個人帳號與系統偏好' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleNavigate = (pageId: string) => {
    navigate(`/${pageId}`);
  };

  return (
    <div className={styles['main-menu-container']}>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className={`${styles['brand-title']} m-0`}>Saifu</h2>
          <p className="text-muted m-0">歡迎回來，開始管理您的財富</p>
        </div>
        <button onClick={handleLogout} className={`btn btn-outline-danger ${styles['logout-btn']}`}>
          登出
        </button>
      </div>

      <div className="row g-4">
        {menuItems.map((item) => (
          <div key={item.id} className="col-12 col-md-6">
            <div 
              className={`card h-100 shadow-sm border-0 ${styles['menu-card']}`} 
              onClick={() => handleNavigate(item.id)}
              style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
            >
              <div className="card-body p-4 d-flex align-items-center">
                <div className={`me-4 fs-1 ${styles['icon-wrapper']}`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="card-title fw-bold mb-1">{item.title}</h4>
                  <p className="card-text text-muted mb-0">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
