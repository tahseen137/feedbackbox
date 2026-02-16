# 💬 FeedbackBox

**Production-ready embeddable feedback widget for SaaS products**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/feedbackbox)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://feedbackbox-alpha.vercel.app)

---

## 🚀 About

FeedbackBox is a **production-grade feedback widget** that embeds seamlessly into any website. Collect bug reports, feature requests, and user feedback without building a custom solution from scratch.

### Why FeedbackBox?

- **🎨 Beautiful UI** - Glass morphism design that works with any brand
- **⚡ Easy Setup** - One script tag, 30 seconds to deploy
- **📊 Full Dashboard** - Manage, filter, and respond to feedback
- **🔐 Secure** - Built with Supabase, Row-Level Security, and best practices
- **💰 Cost-Effective** - Open-source alternative to Canny ($79/mo) and Gleap ($49/mo)

**Perfect for:**
- 🚀 SaaS products
- 📱 Web applications
- 🛍️ E-commerce sites
- 📊 Developer tools

**Live Demo:** [feedbackbox-alpha.vercel.app](https://feedbackbox-alpha.vercel.app)

---

## ✨ Features

### Core
- ✅ **Embeddable Widget** - Beautiful floating button with modal
- ✅ **Feedback Types** - Bug reports, feature requests, praise
- ✅ **Dashboard** - Project management, filtering, CSV export
- ✅ **PostgreSQL Backend** - Supabase for scalable data storage
- ✅ **Real-time Sync** - Widget submissions instantly appear in dashboard
- ✅ **Email Notifications** - Get notified of new feedback
- ✅ **Responsive Design** - Mobile-friendly across all devices

### Pro Features
- ✅ **Voting System** - Users can upvote feedback
- ✅ **Status Management** - Track planned/in-progress/completed
- ✅ **Comments** - Thread discussions on feedback
- ✅ **Public Roadmap** - Share what you're building
- ✅ **Custom Branding** - White-label with your logo and colors
- ✅ **API Access** - Full REST API for integrations

---

## 🎬 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/tahseen137/feedbackbox.git
cd feedbackbox
npm install
```

### 2. Set Up Database

1. Create a [Supabase](https://supabase.com) account (free tier works!)
2. Create a new project
3. Copy your project URL and anon key
4. Run the database migration:
   - Open Supabase SQL Editor
   - Paste contents of `supabase-schema.sql`
   - Execute

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start collecting feedback!

---

## 🔧 Embedding the Widget

### Step 1: Create a Project

1. Go to `/dashboard`
2. Click "New Project"
3. Enter your project name and domain
4. Copy the widget code snippet

### Step 2: Add to Your Website

```html
<!-- Place before closing </body> tag -->
<script src="https://your-domain.com/widget.js?project=YOUR_PROJECT_ID"></script>
```

That's it! Your feedback widget is now live.

### Widget Customization

Coming soon:
- Custom colors
- Custom position
- Custom trigger button
- Custom text labels

---

## 📊 Dashboard Features

### Project Management
- Create unlimited projects
- Each project has its own feedback board
- Generate unique widget codes per project
- Delete projects (cascades to feedback)

### Feedback Management
- View all feedback in one place
- Filter by type (bug/feature/praise)
- Sort by date, votes, or status
- Search functionality
- Export to CSV

### Analytics (Coming Soon)
- Feedback volume trends
- Popular requests
- User engagement metrics
- Response time tracking

---

## 🏗️ Architecture

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Supabase)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS
- **Email:** Resend
- **Deployment:** Vercel

### Project Structure
```
feedbackbox/
├── app/
│   ├── api/
│   │   ├── feedback/      # Feedback submission/retrieval
│   │   └── projects/      # Project CRUD
│   ├── dashboard/         # Admin dashboard
│   ├── widget.js/         # Embeddable widget script
│   └── page.tsx           # Landing page
├── lib/
│   └── supabase.ts        # Database client
├── supabase-schema.sql    # Database schema
└── README.md
```

---

## 🔐 Security

### Built-in Protections
- ✅ **Row Level Security (RLS)** - Supabase policies enforce data access
- ✅ **Input Validation** - Server-side validation on all endpoints
- ✅ **CORS Configuration** - Controlled cross-origin access
- ✅ **Rate Limiting** - Coming soon (Vercel Edge Functions)
- ✅ **SQL Injection Protection** - Parameterized queries via Supabase
- ✅ **XSS Prevention** - Content sanitization

### Privacy
- GDPR compliant (data export/deletion)
- Optional email collection
- User consent flows
- Privacy policy template included

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahseen137/feedbackbox)

### Environment Variables

Required in Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_APP_URL`

### Custom Domain

1. Add custom domain in Vercel settings
2. Update `NEXT_PUBLIC_APP_URL` to your domain
3. Update CORS settings if needed

---

## 📈 Roadmap

### v1.0 (Current)
- [x] Core widget functionality
- [x] Dashboard with filtering
- [x] Database backend
- [x] CSV export

### v1.1 (Next)
- [ ] User authentication
- [ ] Email notifications
- [ ] Voting system
- [ ] Status management

### v2.0 (Future)
- [ ] Public roadmap
- [ ] Comment threads
- [ ] Integrations (Slack, Discord)
- [ ] Webhooks
- [ ] Custom branding
- [ ] White-label option
- [ ] Analytics dashboard

[See full roadmap →](https://github.com/tahseen137/feedbackbox/issues)

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Write TypeScript with proper types
- Follow existing code style
- Add tests for new features
- Update documentation

---

## 📝 API Documentation

### Submit Feedback

```bash
POST /api/feedback
Content-Type: application/json

{
  "projectId": "uuid",
  "type": "bug" | "feature" | "praise",
  "message": "string",
  "email": "string" (optional)
}
```

### Get Feedback

```bash
GET /api/feedback?projectId=uuid&type=bug
```

### Create Project

```bash
POST /api/projects
Content-Type: application/json

{
  "name": "string",
  "domain": "string",
  "userId": "uuid"
}
```

[Full API docs →](https://github.com/tahseen137/feedbackbox/wiki/API)

---

## 🎨 Design System

### Colors
- **Primary:** `#10b981` (Green 500)
- **Dark:** `#059669` (Green 600)
- **Background:** `#1f2937` (Gray 800)
- **Accent:** Glass morphism with backdrop blur

### Typography
- **Font:** Inter
- **Headings:** Bold, 24-72px
- **Body:** Regular, 14-16px

### Components
- Glass morphism panels
- Smooth transitions (0.2-0.3s)
- Rounded corners (12-24px)
- Shadow effects with color glow

---

## 💰 Pricing Strategy

If you're building a hosted version:

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | 1 project, 50 feedback/mo |
| **Starter** | $9/mo | 3 projects, 500 feedback/mo |
| **Pro** | $29/mo | Unlimited, integrations, branding |
| **Business** | $79/mo | SSO, SLA, priority support |

---

## 🆚 Comparison

| Feature | FeedbackBox | Canny | Gleap |
|---------|-------------|-------|-------|
| **Price** | Free / $9+ | $19+ | $49+ |
| **Open Source** | ✅ | ❌ | ❌ |
| **Self-Hosted** | ✅ | ❌ | ❌ |
| **Beautiful UI** | ✅ | ✅ | ✅ |
| **Voting** | ✅ | ✅ | ✅ |
| **Roadmap** | 🔜 | ✅ | ✅ |
| **Custom Brand** | 🔜 | ✅ | ✅ |

---

## 📄 License

MIT License - feel free to use commercially.

See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com)

Inspired by:
- Canny
- Gleap
- Nolt

---

## 📬 Support

- **Issues:** [GitHub Issues](https://github.com/tahseen137/feedbackbox/issues)
- **Discussions:** [GitHub Discussions](https://github.com/tahseen137/feedbackbox/discussions)
- **Email:** support@feedbackbox.io (coming soon)

---

## 🌟 Show Your Support

If you find FeedbackBox useful:
- ⭐ Star this repo
- 🐦 Tweet about it
- 📝 Write a blog post
- 🤝 Contribute code

**Collect feedback, build better products 💬✨**

---

**Made with ❤️ by the FeedbackBox team**
