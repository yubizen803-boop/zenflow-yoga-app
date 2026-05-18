# 🧘 ZenFlow Yoga App

An AI-powered yoga class booking and scheduling web app built for solo instructors and small studios.

## Live Demo
🌐 [https://638hykpu6qlfbynosuos0r7n8.bolt.host](https://638hykpu6qlfbynosuos0r7n8.bolt.host)

## Features
- 📋 **Class Listings** — Browse upcoming yoga classes with instructor, time, and available spots
- 📝 **Easy Booking** — Students book with just name, email, and class selection
- 👩‍🏫 **Instructor Dashboard** — View all bookings in a clean table
- 💚 **Calming Design** — Green/white yoga theme, fully mobile-responsive
- 💾 **No Backend Needed** — Uses localStorage (ready for Supabase upgrade)

## Pages
| Page | Description |
|------|-------------|
| `/` | Home — class listing with "Book Now" buttons |
| `/book` | Booking form for students |
| `/instructor` | Instructor dashboard showing all bookings |

## Tech Stack
- **React 18** + JavaScript
- **Tailwind CSS** — styling
- **localStorage** — data persistence (no backend)
- Built with **bolt.new** AI app builder

## Business Model
This app is designed to be sold as a SaaS to yoga instructors:

| Plan | Price | Features |
|------|-------|----------|
| Starter | $29/mo | 1 instructor, 50 students |
| Pro | $59/mo | Unlimited students, AI chatbot, email reminders |
| Studio | $99/mo | Multi-instructor, white-label, analytics |

## Roadmap
- [ ] Stripe payments integration
- [ ] Supabase database backend
- [ ] AI chatbot (Claude API)
- [ ] Email reminders (Resend)
- [ ] Waitlist when class is full
- [ ] Instructor earnings dashboard

## Getting Started
```bash
npm install
npm start
```

## Built With
- [bolt.new](https://bolt.new) — AI web app builder
- [Tailwind CSS](https://tailwindcss.com)
- [React](https://react.dev)

## AI Enhancements (Coming Soon)
- 🤖 **AI Chatbot** — Claude-powered assistant answers student questions 24/7
- 📊 **Smart Scheduling** — Suggests best class times based on demand
- 🔔 **Churn Detection** — Flags students who haven't booked in 2+ weeks
- ✨ **Class Recommendations** — Personalized suggestions based on history
