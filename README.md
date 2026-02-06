# 🎯 FeedbackBox

**Beautiful, drop-in user feedback widget for your website**

A modern SaaS tool that lets you collect user feedback with a single line of code. Features a stunning glass morphism design with dark theme and green accents.

## ✨ Features

- **Lightning Fast Setup**: Copy-paste one line of code
- **Beautiful Design**: Modern glass morphism UI that blends with any website
- **Organized Feedback**: Filter by bugs, features, or praise
- **CSV Export**: Export all feedback with one click
- **No Database Required**: Uses localStorage for MVP simplicity
- **Responsive**: Works perfectly on desktop and mobile

## 🚀 Live Demo

**Website**: https://feedbackbox-alpha.vercel.app

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Storage**: LocalStorage (MVP)

## 🎨 Pages

1. **Landing Page** (`/`) - Hero, features, and pricing
2. **Dashboard** (`/dashboard`) - Create projects and manage feedback
3. **Widget** (`/widget.js`) - Embeddable JavaScript snippet

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📝 How to Use

### 1. Create a Project
Visit the [dashboard](https://feedbackbox-alpha.vercel.app/dashboard) and create a new project.

### 2. Get Your Widget Code
Copy the widget code snippet provided in the dashboard.

### 3. Add to Your Website
Paste the code before the closing `</body>` tag:

```html
<script src="https://feedbackbox-alpha.vercel.app/widget.js?project=YOUR_PROJECT_ID"></script>
```

### 4. Collect Feedback
A floating feedback button will appear on your site. Users can submit:
- 🐛 Bug reports
- ✨ Feature requests
- ❤️ Praise

### 5. View & Export
See all feedback in your dashboard, filter by type, and export to CSV.

## 💎 Pricing

**Free Plan**
- 1 project
- Up to 50 feedback entries
- Basic filtering

**Pro Plan - $9/month**
- Unlimited projects
- Unlimited feedback
- Advanced filtering
- CSV export
- Priority support

## 🎯 Design Philosophy

- **Simple**: One line of code to install
- **Beautiful**: Glass morphism design that works everywhere
- **Fast**: Optimized for performance
- **Private**: Your data stays with you (localStorage)

## 📸 Screenshots

### Landing Page
Beautiful hero section with pricing and features

### Dashboard
Intuitive project management and feedback viewing

### Widget
Floating button that opens a beautiful feedback form

## 🔮 Future Enhancements

- Real database (PostgreSQL/Supabase)
- Email notifications
- Custom branding
- Analytics dashboard
- API access
- Webhooks
- Team collaboration
- Dark/light theme toggle

## 📄 License

MIT License - feel free to use for your projects!

## 🤝 Contributing

This is an MVP built for a hackathon. Contributions welcome!

## 👨‍💻 Author

Built with ❤️ by [tahseen137](https://github.com/tahseen137)

---

**Ready to listen to your users? [Get Started →](https://feedbackbox-alpha.vercel.app)**
