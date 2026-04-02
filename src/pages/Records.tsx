import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Records.module.css';
import ButtonS from '../components/button-s';

const Records: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('food');
  const [type, setType] = React.useState('expense');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);

  const categories = [
    { id: 'food', name: '餐飲', icon: '🍔' },
    { id: 'transport', name: '交通', icon: '🚗' },
    { id: 'entertainment', name: '娛樂', icon: '🎬' },
    { id: 'shopping', name: '購物', icon: '🛍️' },
    { id: 'housing', name: '居住', icon: '🏠' },
    { id: 'utility', name: '水電費', icon: '💡' },
    { id: 'salary', name: '薪資', icon: '💰' },
    { id: 'investment', name: '投資', icon: '📈' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Record submitted:', {
      amount,
      category,
      type,
      description,
      date,
    });
    setAmount('');
    setDescription('');
  };

  const handleBackToMenu = () => {
    navigate('/menu');
  };

  return (
    <div className={styles['records-container']}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className={`${styles['brand-title']} m-0`}>記帳</h2>
        <button
          onClick={handleBackToMenu}
          className="btn btn-light p-2 d-flex align-items-center justify-content-center"
          style={{ borderRadius: '8px', border: 'none', width: '40px', height: '40px' }}
        >
          ✕
        </button>
      </div>

      <div className={`card shadow-sm border-0 ${styles['record-form-card']}`}>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-bold mb-2">類型</label>
              <div className="d-flex gap-3">
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`flex-fill btn ${type === 'expense' ? 'btn-danger' : 'btn-outline-danger'} ${styles['type-btn']}`}
                >
                  💸 支出
                </button>
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`flex-fill btn ${type === 'income' ? 'btn-success' : 'btn-outline-success'} ${styles['type-btn']}`}
                >
                  💰 收入
                </button>
              </div>
            </div>

            <div className="mb-4">
               <label className="form-label fw-bold mb-2">分類</label>
               <div className="row g-3">
                 {categories.map((cat) => (
                   <div key={cat.id} className="col-4 col-md-3">
                     <button
                       type="button"
                       onClick={() => setCategory(cat.id)}
                       className={`w-100 btn ${category === cat.id ? 'btn-outline-primary' : 'btn-outline-secondary'} ${styles['category-btn']}`}
                     >
                       <div className="fs-4 mb-1">{cat.icon}</div>
                       <div className="small">{cat.name}</div>
                     </button>
                   </div>
                 ))}
               </div>
             </div>

             <div className="mb-4">
               <div className="row g-3 align-items-end">
                 <div className="col-8">
                   <label htmlFor="amountInput" className="form-label fw-bold mb-2">
                     💰 金額
                   </label>
                   <div className="input-group">
                     <span className="input-group-text bg-white text-dark border-end-0">
                       $
                     </span>
                     <input
                       type="number"
                       className="form-control form-control-lg border-start-0"
                       id="amountInput"
                       placeholder="0.00"
                       value={amount}
                       onChange={(e) => setAmount(e.target.value)}
                       required
                     />
                   </div>
                 </div>
                 <div className="col-4">
                   <label htmlFor="dateInput" className="form-label fw-bold mb-2">
                     📅 日期
                   </label>
                   <input
                     type="date"
                     className="form-control"
                     id="dateInput"
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     required
                   />
                 </div>
               </div>
             </div>

            <div className="mb-4">
              <label htmlFor="descriptionInput" className="form-label fw-bold mb-2">
                備註
              </label>
              <textarea
                className="form-control"
                id="descriptionInput"
                rows={3}
                placeholder="輸入交易備註..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <ButtonS type="submit" className="w-100 py-2">
              儲存記錄
            </ButtonS>
          </form>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="fw-bold mb-3" style={{ color: 'white' }}>最近記錄</h3>
        <div className="text-center py-4" style={{ color: 'white' }}>
          <p>暫無記帳記錄</p>
          <small style={{ color: 'white' }}>點擊上方表單添加您的第一筆記錄</small>
        </div>
      </div>
    </div>
  );
};

export default Records;
