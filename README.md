# NeoServe - AI-Powered Unified Service Experience Platform

NeoServe is a comprehensive full-stack web application that provides an AI-powered unified service experience platform designed for both internal employees/admins and external customers.

## 🚀 Features

### Internal Portal (Employee/Admin Side)
- **Employee Dashboard**: AI assistant chat, mood tracking, ticket management
- **Admin Dashboard**: Analytics, SLA compliance, CSAT scores, team management
- **Role-based Access**: Separate login flows for employees and administrators
- **AI Integration**: Mock GPT responses and intelligent suggestions
- **Mood Tracking**: Employee wellness monitoring with emoji-based input

### External Portal (Customer Side)
- **Multilingual Chatbot**: Support in multiple languages
- **File Upload**: Screenshot troubleshooting capability
- **Ticket Tracking**: Real-time status updates
- **FAQ & Help Center**: Self-service knowledge base
- **Feedback System**: Star rating and comment collection

### Support Team Features
- **Live Chat Management**: Real-time customer conversation handling
- **AI-Powered Suggestions**: Smart response recommendations
- **Sentiment Analysis**: Customer emotion detection
- **Smart Routing**: Automatic ticket assignment based on category

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Mock JSON data (easily replaceable with MongoDB/PostgreSQL)
- **Charts**: Recharts for analytics visualization
- **Icons**: Lucide React
- **Styling**: TailwindCSS with dark mode support

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd neoserve-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Demo Credentials

### Employee Login
- Email: `john.doe@company.com`
- Password: `demo123`

### Admin Login
- Email: `admin@company.com`
- Password: `admin123`

### Customer Support
- No login required - direct access to support interface

## 🏗️ Project Structure

\`\`\`
neoserve-platform/
├── app/
│   ├── api/                    # Backend API routes
│   │   ├── analytics/          # Analytics data
│   │   ├── chat/              # AI chat responses
│   │   ├── emotion/           # Mood tracking
│   │   ├── tickets/           # Ticket management
│   │   ├── upload/            # File upload handling
│   │   └── users/             # User management
│   ├── dashboard/
│   │   ├── admin/             # Admin dashboard
│   │   └── employee/          # Employee dashboard
│   ├── login/
│   │   ├── admin/             # Admin login
│   │   └── employee/          # Employee login
│   ├── support/
│   │   ├── team/              # Support team view
│   │   └── page.tsx           # Customer support
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/ui/             # shadcn/ui components
├── lib/                       # Utility functions
└── public/                    # Static assets
\`\`\`

## 🔌 API Endpoints

- `GET /api/tickets` - Retrieve tickets
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets` - Update ticket
- `GET /api/users` - Get user information
- `GET /api/analytics` - Fetch analytics data
- `POST /api/chat` - AI chat responses
- `GET/POST /api/emotion` - Mood tracking
- `POST /api/upload` - File upload handling

## 🎨 Key Features Implemented

### AI-Powered Features
- **Smart Chat Responses**: Context-aware AI replies
- **Sentiment Analysis**: Customer emotion detection
- **Intelligent Routing**: Automatic ticket categorization
- **Mood Tracking**: Employee wellness monitoring

### User Experience
- **Responsive Design**: Mobile and desktop optimized
- **Dark Mode Support**: Theme switching capability
- **Multilingual Support**: Multiple language options
- **Real-time Updates**: Live chat and notifications

### Analytics & Reporting
- **SLA Compliance Tracking**: Performance metrics
- **CSAT Score Monitoring**: Customer satisfaction
- **Team Performance**: Individual and team analytics
- **Interactive Charts**: Visual data representation

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Deploy with default Next.js settings
3. Environment variables (if needed) can be set in Vercel dashboard

### Backend
The API routes are included in the Next.js application and will deploy automatically with the frontend.

### Database Integration
To replace mock data with a real database:

1. **MongoDB**: Replace mock data in API routes with MongoDB queries
2. **PostgreSQL**: Use Prisma or similar ORM for database operations
3. **Supabase**: Integrate for real-time features and authentication

## 🔧 Customization

### Adding New Features
1. Create new API routes in `app/api/`
2. Add corresponding frontend components
3. Update navigation and routing as needed

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update `app/globals.css` for global styles
- Use shadcn/ui components for consistent design

### AI Integration
Replace mock AI responses with real AI services:
- OpenAI GPT API
- Google Dialogflow
- Microsoft Bot Framework
- Custom AI models

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please create an issue in the GitHub repository or contact the development team.

---

Built with ❤️ using Next.js, React, and TailwindCSS
