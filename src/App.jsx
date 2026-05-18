import React, { useState, useEffect } from 'react';

const classes = [
  { id: 1, name: 'Morning Flow', type: 'Vinyasa', instructor: 'Maya Chen', time: 'Mon/Wed/Fri 7:00 AM', spots: 12, price: 15 },
  { id: 2, name: 'Gentle Hatha', type: 'Hatha', instructor: 'David Park', time: 'Tue/Thu 9:00 AM', spots: 10, price: 15 },
  { id: 3, name: 'Power Yoga', type: 'Power', instructor: 'Maya Chen', time: 'Mon/Wed 6:00 PM', spots: 15, price: 15 },
];

const green = '#2d6a4f';
const lightGreen = '#d8f3dc';

function App() {
  const [page, setPage] = useState('home');
  const [bookings, setBookings] = useState(() => JSON.parse(localStorage.getItem('bookings') || '[]'));
  const [form, setForm] = useState({ name: '', email: '', classId: '' });
  const [pendingBooking, setPendingBooking] = useState(null);
  const [payment, setPayment] = useState({ card: '', expiry: '', cvc: '' });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => { localStorage.setItem('bookings', JSON.stringify(bookings)); }, [bookings]);

  const handleBookSubmit = (e) => {
    e.preventDefault();
    const cls = classes.find(c => c.id === Number(form.classId));
    setPendingBooking({ ...form, className: cls?.name, price: cls?.price });
    setPage('payment');
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setPaymentError('');
    // Basic validation
    if (payment.card.replace(/\s/g, '').length < 16) return setPaymentError('Please enter a valid 16-digit card number.');
    if (!payment.expiry.match(/^\d{2}\/\d{2}$/)) return setPaymentError('Expiry must be MM/YY format.');
    if (payment.cvc.length < 3) return setPaymentError('CVC must be 3 digits.');

    // Simulate successful payment
    const booking = { ...pendingBooking, date: new Date().toLocaleDateString(), id: Date.now(), paid: true };
    setBookings(prev => [...prev, booking]);
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setPendingBooking(null);
      setForm({ name: '', email: '', classId: '' });
      setPayment({ card: '', expiry: '', cvc: '' });
      setPage('home');
    }, 3000);
  };

  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val) => val.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');

  const inputStyle = { padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, width: '100%', boxSizing: 'border-box' };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto', padding: 20 }}>
      {/* Nav */}
      <nav style={{ background: green, padding: '12px 20px', borderRadius: 8, display: 'flex', gap: 16, marginBottom: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginRight: 8 }}>🌿 ZenFlow Yoga</span>
        {['home', 'book', 'instructor'].map(p => (
          <button key={p} onClick={() => setPage(p)}
            style={{ background: page === p ? 'white' : 'transparent', color: page === p ? green : 'white',
              border: '1px solid white', borderRadius: 4, padding: '4px 14px', cursor: 'pointer', textTransform: 'capitalize', fontWeight: page === p ? 'bold' : 'normal' }}>
            {p === 'instructor' ? '👩‍🏫 Instructor' : p === 'home' ? '🏠 Home' : '📝 Book'}
          </button>
        ))}
      </nav>

      {/* HOME */}
      {page === 'home' && (
        <div>
          <h1 style={{ color: green }}>Upcoming Classes</h1>
          {classes.map(cls => (
            <div key={cls.id} style={{ border: `1px solid #b7e4c7`, borderRadius: 10, padding: 16, marginBottom: 14, background: '#f8fff9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <h3 style={{ margin: 0, color: '#1b4332' }}>{cls.name} <span style={{ fontSize: 12, color: '#40916c', fontWeight: 'normal' }}>({cls.type})</span></h3>
                  <p style={{ margin: '4px 0', color: '#555' }}>👩‍🏫 {cls.instructor} &nbsp;·&nbsp; ⏰ {cls.time}</p>
                  <p style={{ margin: 0, color: '#40916c', fontWeight: 'bold' }}>💚 ${cls.price} per class &nbsp;·&nbsp; 🪑 {cls.spots} spots</p>
                </div>
                <button onClick={() => { setForm(f => ({ ...f, classId: String(cls.id) })); setPage('book'); }}
                  style={{ background: green, color: 'white', border: 'none', borderRadius: 6, padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', fontSize: 15 }}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOOK */}
      {page === 'book' && (
        <div>
          <h1 style={{ color: green }}>Book a Class</h1>
          <form onSubmit={handleBookSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 420 }}>
            <input required placeholder="Your full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} />
            <input required type="email" placeholder="Your email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} />
            <select required value={form.classId} onChange={e => setForm(f => ({ ...f, classId: e.target.value }))} style={inputStyle}>
              <option value="">Select a class</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name} — {c.time} (${c.price})</option>)}
            </select>
            <button type="submit" style={{ background: green, color: 'white', border: 'none', borderRadius: 6, padding: 14, cursor: 'pointer', fontSize: 16, fontWeight: 'bold' }}>
              Continue to Payment →
            </button>
          </form>
        </div>
      )}

      {/* PAYMENT */}
      {page === 'payment' && pendingBooking && (
        <div>
          <h1 style={{ color: green }}>💳 Complete Payment</h1>

          {/* Order summary */}
          <div style={{ background: lightGreen, borderRadius: 8, padding: 14, marginBottom: 20 }}>
            <p style={{ margin: 0, color: '#1b4332' }}>📋 <strong>{pendingBooking.className}</strong></p>
            <p style={{ margin: '4px 0', color: '#555' }}>👤 {pendingBooking.name} &nbsp;·&nbsp; ✉️ {pendingBooking.email}</p>
            <p style={{ margin: 0, fontSize: 20, fontWeight: 'bold', color: green }}>Total: $15.00</p>
          </div>

          {paymentSuccess ? (
            <div style={{ background: lightGreen, border: `2px solid ${green}`, borderRadius: 10, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 48 }}>✅</div>
              <h2 style={{ color: green, margin: '8px 0' }}>Payment Confirmed!</h2>
              <p style={{ color: '#555' }}>Your booking is complete. See you on the mat! 🧘</p>
            </div>
          ) : (
            <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 420 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 4, color: '#333', fontWeight: 'bold' }}>Card Number</label>
                <input required placeholder="1234 5678 9012 3456" value={payment.card}
                  onChange={e => setPayment(p => ({ ...p, card: formatCard(e.target.value) }))}
                  style={inputStyle} maxLength={19} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: 4, color: '#333', fontWeight: 'bold' }}>Expiry Date</label>
                  <input required placeholder="MM/YY" value={payment.expiry}
                    onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                    style={inputStyle} maxLength={5} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: 4, color: '#333', fontWeight: 'bold' }}>CVC</label>
                  <input required placeholder="123" value={payment.cvc}
                    onChange={e => setPayment(p => ({ ...p, cvc: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                    style={inputStyle} maxLength={3} />
                </div>
              </div>
              {paymentError && <p style={{ color: 'red', margin: 0 }}>⚠️ {paymentError}</p>}
              <button type="submit"
                style={{ background: green, color: 'white', border: 'none', borderRadius: 8, padding: 16, cursor: 'pointer', fontSize: 18, fontWeight: 'bold' }}>
                💳 Pay $15.00
              </button>
              <button type="button" onClick={() => setPage('book')}
                style={{ background: 'transparent', color: '#888', border: '1px solid #ccc', borderRadius: 8, padding: 10, cursor: 'pointer' }}>
                ← Back
              </button>
            </form>
          )}
        </div>
      )}

      {/* INSTRUCTOR */}
      {page === 'instructor' && (
        <div>
          <h1 style={{ color: green }}>👩‍🏫 Instructor Dashboard</h1>
          <p style={{ color: '#888' }}>Total bookings: <strong>{bookings.length}</strong> &nbsp;·&nbsp; Revenue: <strong>${bookings.filter(b => b.paid).length * 15}</strong></p>
          {bookings.length === 0 ? <p style={{ color: '#aaa' }}>No bookings yet.</p> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: green, color: 'white' }}>
                  {['Class', 'Student', 'Email', 'Date', 'Paid'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #e0e0e0', background: i % 2 === 0 ? '#fff' : '#f8fff9' }}>
                    <td style={{ padding: '10px 12px' }}>{b.className}</td>
                    <td style={{ padding: '10px 12px' }}>{b.name}</td>
                    <td style={{ padding: '10px 12px' }}>{b.email}</td>
                    <td style={{ padding: '10px 12px' }}>{b.date}</td>
                    <td style={{ padding: '10px 12px' }}>{b.paid ? '✅ $15' : '⏳'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
