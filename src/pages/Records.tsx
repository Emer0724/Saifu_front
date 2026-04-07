import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Records.module.css';

interface Transaction {
  id: string;
  amount: number;
  category: string;
  type: 'expense' | 'income';
  description: string;
  date: string;
}

const Records: React.FC = () => {
  const navigate = useNavigate();
  const [tempAmount, setTempAmount] = React.useState('');
  const [tempCategory, setTempCategory] = React.useState('food');
  const [tempType, setTempType] = React.useState<'expense' | 'income'>('expense');
  const [tempDescription, setTempDescription] = React.useState('');
  const [tempDate, setTempDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = React.useState<Transaction[]>([]);

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

  const handleCategorySelect = (catId: string) => {
    setTempCategory(catId);
  };

  const handleTypeSelect = (newType: 'expense' | 'income') => {
    setTempType(newType);
  };

  const addToPending = () => {
    if (!tempAmount || parseFloat(tempAmount) <= 0) {
      alert('請輸入正確的金額');
      return;
    }

    const newRecord: Transaction = {
      id: Date.now().toString(),
      amount: parseFloat(tempAmount),
      category: tempCategory,
      type: tempType,
      description: tempDescription,
      date: tempDate,
    };

    setRecords((prev) => [newRecord, ...prev]);
    setTempAmount('');
    setTempDescription('');
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (records.length === 0) {
      alert('沒有任何待送出的記錄');
      return;
    }

    const payload = {
      token: localStorage.getItem('token'),
      records: records.map((r) => ({
        amount: r.amount,
        category: r.category,
        type: r.type,
        description: r.description,
        date: r.date,
      })),
    };

    console.log('提交到後端:', JSON.stringify(payload, null, 2));

    // 模擬 API 調用
    fetch('http://localhost:5255/api/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        records: records.map((r) => ({
          amount: r.amount,
          category: r.category,
          type: r.type,
          description: r.description,
          date: r.date,
        })),
      }),
    })
      .then((response) => {
        if (response.ok) {
           alert('成功送出記錄！');
           setRecords([]);
           setTempAmount('');
           setTempDescription('');
         } else {
          throw new Error('送出失敗');
        }
      })
      .catch((error) => {
        console.error('送出錯誤:', error);
        alert('送出失敗，請稍後再試');
      });
  };

  const handleBackToMenu = () => {
    navigate('/menu');
  };

  const totalAmount = records.reduce((sum, record) => {
    return record.type === 'income' ? sum + record.amount : sum - record.amount;
  }, 0);

  const totalIncome = records.filter(r => r.type === 'income').reduce((sum, r) => sum + r.amount, 0);
  const totalExpense = records.filter(r => r.type === 'expense').reduce((sum, r) => sum + r.amount, 0);

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

      <div className="row mb-4">
        <div className="col-md-4 mb-2">
           <div className="card border-0" style={{ backgroundColor: 'var(--card-income-bg)' }}>
             <div className="card-body p-3">
               <div className="small" style={{ color: 'var(--text-muted)' }}>收入總額</div>
               <div className="h5 fw-bold" style={{ color: 'var(--card-income-text)' }}>+{totalIncome.toLocaleString()}</div>
             </div>
           </div>
         </div>
         <div className="col-md-4 mb-2">
           <div className="card border-0" style={{ backgroundColor: 'var(--card-expense-bg)' }}>
             <div className="card-body p-3">
               <div className="small" style={{ color: 'var(--text-muted)' }}>支出總額</div>
               <div className="h5 fw-bold" style={{ color: 'var(--card-expense-text)' }}>-{totalExpense.toLocaleString()}</div>
             </div>
           </div>
         </div>
         <div className="col-md-4 mb-2">
           <div className="card border-0" style={{ backgroundColor: 'var(--card-net-bg)' }}>
             <div className="card-body p-3">
               <div className="small" style={{ color: 'var(--text-muted)' }}>淨餘額</div>
               <div className={`h5 fw-bold ${totalAmount >= 0 ? { color: 'var(--card-net-positive)' } : { color: 'var(--card-net-negative)' }}`}>
                 {totalAmount.toLocaleString()}
               </div>
             </div>
           </div>
         </div>
      </div>

      <div className={`card shadow-sm border-0 ${styles['record-form-card']}`}>
        <div className="card-body p-4">
          <form>
           <div className="mb-4">
               <label className="form-label fw-bold mb-2">類型</label>
               <div className="d-flex gap-3">
                 <button
                   type="button"
                   onClick={() => handleTypeSelect('expense')}
                   className={`flex-fill btn ${tempType === 'expense' ? 'btn-danger' : 'btn-outline-danger'} ${styles['type-btn']}`}
                   style={{ 
                     backgroundColor: tempType === 'expense' ? 'var(--btn-danger-bg)' : 'transparent', 
                     color: tempType === 'expense' ? 'white' : 'var(--text-main)',
                     borderColor: tempType === 'expense' ? 'var(--btn-danger-bg)' : 'var(--border-color)' 
                   }}
                 >
                   💸 支出
                 </button>
                 <button
                   type="button"
                   onClick={() => handleTypeSelect('income')}
                   className={`flex-fill btn ${tempType === 'income' ? 'btn-success' : 'btn-outline-success'} ${styles['type-btn']}`}
                   style={{ 
                     backgroundColor: tempType === 'income' ? 'var(--btn-success-bg)' : 'transparent', 
                     color: tempType === 'income' ? 'white' : 'var(--text-main)',
                     borderColor: tempType === 'income' ? 'var(--btn-success-bg)' : 'var(--border-color)' 
                   }}
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
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`w-100 btn ${tempCategory === cat.id ? 'btn-primary' : 'btn-outline-secondary'} ${styles['category-btn']}`}
                        style={{ 
                          backgroundColor: tempCategory === cat.id ? 'var(--accent-emerald)' : 'var(--btn-secondary-bg)', 
                          color: tempCategory === cat.id ? 'white' : 'var(--text-muted)',
                          borderColor: tempCategory === cat.id ? 'var(--accent-emerald)' : 'var(--btn-secondary-border)' 
                        }}
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
                      <span className="input-group-text" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)', border: '1px solid var(--border-color)' }}>
                        $
                      </span>
                      <input
                        type="number"
                        className="form-control form-control-lg border-start-0"
                        id="amountInput"
                        placeholder="0.00"
                        value={tempAmount}
                        onChange={(e) => setTempAmount(e.target.value)}
                        required
                        style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)', border: '1px solid var(--border-color)' }}
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
                      value={tempDate}
                      onChange={(e) => setTempDate(e.target.value)}
                      required
                      style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)', border: '1px solid var(--border-color)' }}
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
                 value={tempDescription}
                 onChange={(e) => setTempDescription(e.target.value)}
                 style={{ backgroundColor: 'var(--input-bg)', color: 'var(--input-text)', border: '1px solid var(--border-color)' }}
               />
             </div>

            <button
              type="button"
              onClick={addToPending}
              className={`w-100 py-2 mb-3 ${styles['add-btn']}`}
              style={{ backgroundColor: 'var(--accent-emerald)', color: 'white', border: 'none' }}
            >
              ➕ 新增至待送出列表
            </button>
          </form>
        </div>
      </div>

      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold" style={{ color: 'var(--text-main)' }}>待送出記錄 ({records.length})</h3>
          {records.length > 0 && (
            <button
              onClick={handleSubmit}
              className="btn"
              style={{ backgroundColor: 'var(--btn-success-bg)', color: 'white' }}
            >
              ✅ 全部送出
            </button>
          )}
        </div>

        {records.length === 0 ? (
          <div className="text-center py-4" style={{ color: 'var(--text-main)' }}>
            <p>暫無待送出記錄</p>
            <small>點擊上方 "+ 新增至待送出列表" 添加記錄</small>
          </div>
        ) : (
          <div className="list-group">
            {records.map((record) => (
              <div key={record.id} className="list-group-item list-group-item-action mb-2" style={{ backgroundColor: 'var(--secondary-dark)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="flex-fill">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="fw-bold">{record.type === 'income' ? '+' : '-'}{record.amount.toLocaleString()}</span>
                      <span className={`badge ${record.type === 'income' ? 'bg-success' : 'bg-danger'}`} style={{ backgroundColor: record.type === 'income' ? 'var(--btn-success-bg)' : 'var(--btn-danger-bg)' }}>{categories.find(c => c.id === record.category)?.name}</span>
                      <span className="text-muted small">{record.date}</span>
                    </div>
                    {record.description && <div className="text-muted small">{record.description}</div>}
                  </div>
                  <button
                    onClick={() => handleDeleteRecord(record.id)}
                    className="btn btn-sm"
                    style={{ backgroundColor: 'var(--btn-danger-bg)', color: 'white' }}
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Records;
