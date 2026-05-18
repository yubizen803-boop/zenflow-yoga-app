import React, { useState, useEffect } from 'react';

const classes = [
  { id: 1, name: 'Morning Flow', type: 'Vinyasa', instructor: 'Maya Chen', time: 'Mon/Wed/Fri 7:00 AM', spots: 12, booked: 0 },
  { id: 2, name: 'Gentle Hatha', type: 'Hatha', instructor: 'David Park', time: 'Tue/Thu 9:00 AM', spots: 10, booked: 0 },
  { id: 3, name: 'Power Yoga', type: 'Power', instructor: 'Maya Chen', time: 'Mon/Wed 6:00 PM', spots: 15, booked: 0 },
];

function App() {
  const [page, setPage] = useState('home');
  const [bookings, setBookings] = useState(() => JSON.parse(localStorage.getItem('bookings') || '[]'));
  const [form, setForm] = useState({ name: '', email: '', classId: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => { localStorage.setItem('bookings', JSON.stringify(bookings)); }, [bookings]);

  const handleBook = (e) => {
    e.preventDefault();
    const cls = classes.find(c => c.id === Number(form.classId));
    const booking = { ...form, className: cls?.name, date: new Date().toLocaleDateString(), id: Date.now() };
    setBookings(prev => [...prev, booking]);
    setSuccess(true);
    setForm({ name: '', email: '', classId: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto', padding: 20 }}>
      {/* Nav */}
      <nav style={{ background: '#2d6a4f', padding: '12px 20px', borderRadius: 8, display: 'flex', gap: 20, marginBottom: 24 }}>
        <span style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>🌿 ZenFlow Yoga</span>
        {['home','book','instructor'].map(p => (
          <button key={p} onClick={() => setPage(p)}
            style={{ background: page===p ? 'white' : 'transparent', color: page===p ? '#2d6a4f' : 'white',
              border: '1px solid white', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', textTransform: 'capitalize' }}>
            {p === 'instructor' ? 'Instructor' : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </nav>

      {/* Home */}
      {page === 'home' && (
        <div>
          <h1 style={{ color: '#2d6a4f' }}>Upcoming Classes</h1>
          {classes.map(cls => (
            <div key={cls.id} style={{ border: '1px solid #b7e4c7', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#1b4332' }}>{cls.name} <span style={{ fontSize: 12, color: '#40916c' }}>({cls.type})</span></h3>
                  <p style={{ margin: '4px 0', color: '#555' }}>👩‍🏫 {cls.instructor} · ⏰ {cls.time}</p>
                  <p style={{ margin: 0, color: '#40916c' }}>🪑 {cls.spots} spots available</p>
                </div>
                <button onClick={() => { setForm(f => ({...f, classId: String(cls.id)})); setPage('book'); }}
                  style={{ background: '#2d6a4f', color: 'white', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Book */}
      {page === 'book' && (
        <div>
          <h1 style={{ color: '#2d6a4f' }}>Book a Class</h1>
          {success && <div style={{ background: '#d8f3dc', color: '#1b4332', padding: 12, borderRadius: 6, marginBottom: 16 }}>✅ Booking confirmed!</div>}
          <form onSubmit={handleBook} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
            <input required placeholder="Your name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
              style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
            <input required type="email" placeholder="Your email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
              style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
            <select required value={form.classId} onChange={e => setForm(f => ({...f, classId: e.target.value}))}
              style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}>
              <option value="">Select a class</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name} — {c.time}</option>)}
            </select>
            <button type="submit" style={{ background: '#2d6a4f', color: 'white', border: 'none', borderRadius: 6, padding: 12, cursor: 'pointer', fontSize: 16 }}>
              Confirm Booking
            </button>
          </form>
        </div>
      )}

      {/* Instructor */}
      {page === 'instructor' && (
        <div>
          <h1 style={{ color: '#2d6a4f' }}>Instructor Dashboard</h1>
          {bookings.length === 0 ? <p style={{ color: '#888' }}>No bookings yet.</p> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#2d6a4f', color: 'white' }}>
                  {['Class','Student','Email','Date'].map(h => <th key={h} style={{ padding: 10, textAlign: 'left' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: 10 }}>{b.className}</td>
                    <td style={{ padding: 10 }}>{b.name}</td>
                    <td style={{ padding: 10 }}>{b.email}</td>
                    <td style={{ padding: 10 }}>{b.date}</td>
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
