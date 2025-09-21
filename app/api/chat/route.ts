import { NextResponse } from "next/server"

// Enhanced AI responses with specific solutions
const intelligentResponses = {
  billing_information: {
    keywords: ["billing", "payment", "update billing", "change billing", "credit card", "invoice", "payment method"],
    responses: [
      {
        message: "Here's how to update your billing information:\n\n1. **Access Billing Settings**:\n   • Go to your Account Settings\n   • Click on 'Billing & Payments'\n\n2. **Update Payment Method**:\n   • Select 'Update Payment Method'\n   • Enter new card details or choose a different payment option\n   • Verify the information is correct\n\n3. **Update Billing Address**:\n   • Click 'Edit Billing Address'\n   • Enter your new billing information\n   • Save the changes\n\n4. **Verify Changes**:\n   • Review the updated information\n   • Check for confirmation email\n\nNeed help with anything specific about billing?",
        actions: ["View Billing Settings", "Update Payment Method", "Change Billing Address", "View Invoice History"],
      },
    ],
  },

  password_reset: {
    keywords: ["password", "reset", "forgot", "change password", "login issue", "can't login", "cannot login"],
    responses: [
      {
        message:
          "I'll help you reset your password! Here are the steps:\n\n1. Go to the login page\n2. Click 'Forgot Password' link\n3. Enter your email address\n4. Check your email for reset instructions\n5. Follow the link in the email to create a new password\n\nIf you don't receive the email, check your spam folder or contact IT support.",
        actions: ["Reset Password Guide", "Contact IT Support", "Check Email Settings"],
      },
    ],
  },

  ticket_management: {
    keywords: ["ticket", "tickets", "assign", "status", "priority", "customer", "support request"],
    responses: [
      {
        message:
          "I can help you with ticket management! Here's what you can do:\n\n• **View Tickets**: Check 'My Tickets' in the sidebar\n• **Update Status**: Change ticket status to In Progress/Resolved\n• **Set Priority**: Mark tickets as High/Medium/Low priority\n• **Add Comments**: Communicate with customers and team\n• **Search**: Filter tickets by status, priority, or customer\n\nWould you like me to guide you through any specific ticket action?",
        actions: ["View My Tickets", "Update Ticket Status", "Search Tickets", "Add Comments"],
      },
    ],
  },

  mood_tracking: {
    keywords: ["mood", "feeling", "wellness", "stress", "energy", "productivity", "mental health"],
    responses: [
      {
        message:
          "Great that you're focusing on wellness! Here's how to use the mood tracker:\n\n• **Daily Check-in**: Rate your mood from 1-10\n• **Track Energy**: Monitor your energy levels\n• **Stress Levels**: Keep track of stress patterns\n• **Add Notes**: Record what affected your mood\n• **View Trends**: See your mood patterns over time\n\nRegular mood tracking helps identify patterns and improve work-life balance!",
        actions: ["Open Mood Tracker", "View Mood History", "Wellness Tips", "Set Reminders"],
      },
    ],
  },

  knowledge_base: {
    keywords: ["knowledge", "documentation", "help", "guide", "tutorial", "how to", "learn", "training"],
    responses: [
      {
        message:
          "I can help you find information! Our Knowledge Base contains:\n\n• **Articles**: Detailed guides and best practices\n• **Tutorials**: Step-by-step instructions\n• **FAQs**: Common questions and answers\n• **Video Guides**: Visual learning resources\n• **Search**: Find specific topics quickly\n\nWhat specific topic are you looking for help with?",
        actions: ["Browse Knowledge Base", "Search Articles", "Popular Topics", "Video Tutorials"],
      },
    ],
  },

  technical_issues: {
    keywords: ["error", "bug", "not working", "broken", "issue", "problem", "technical", "system", "application"],
    responses: [
      {
        message:
          "I'll help you troubleshoot this technical issue! Let's start with these steps:\n\n1. **Refresh the page** - Often resolves temporary glitches\n2. **Clear browser cache** - Fixes loading issues\n3. **Check internet connection** - Ensure stable connectivity\n4. **Try different browser** - Rules out browser-specific issues\n5. **Restart application** - Clears memory issues\n\nIf the problem persists, please provide more details about the specific error you're seeing.",
        actions: ["Report Bug", "Contact IT Support", "System Status", "Troubleshooting Guide"],
      },
    ],
  },

  general_help: {
    keywords: ["help", "support", "assistance", "question", "how", "what", "where", "when"],
    responses: [
      {
        message:
          "I'm here to help! I can assist you with:\n\n🎫 **Ticket Management** - View, update, and manage support tickets\n😊 **Mood Tracking** - Monitor your wellness and productivity\n�� **Knowledge Base** - Find guides, tutorials, and documentation\n🔧 **Technical Issues** - Troubleshoot problems and errors\n🔑 **Account Issues** - Password resets and login problems\n\nWhat would you like help with today?",
        actions: ["My Tickets", "Mood Tracker", "Knowledge Base", "Technical Support"],
      },
    ],
  },

  technical_support: {
    keywords: ["contact technical support", "technical support", "contact support", "support contact", "tech support", "help desk"],
    responses: [
      {
        message: "Here are all the ways to contact our technical support team:\n\n1. **Live Chat**:\n   • Available 24/7\n   • Click the chat bubble in the bottom right\n   • Average response time: 2 minutes\n\n2. **Email Support**:\n   • Send to: support@neoserve.com\n   • Response within 4 hours\n   • Include error screenshots if applicable\n\n3. **Phone Support**:\n   • Call: 1-800-NEO-SERV\n   • Available Mon-Fri, 9AM-6PM EST\n   • Priority support for critical issues\n\n4. **Support Portal**:\n   • Visit: support.neoserve.com\n   • Submit detailed ticket\n   • Track your request status\n\n5. **Emergency Support**:\n   • Available 24/7 for critical issues\n   • Call: 1-800-NEO-HELP\n\nWhich method would you prefer to use?",
        actions: ["Start Live Chat", "Send Email", "Call Support", "Submit Ticket", "Emergency Contact"],
      },
    ],
  },
}

// Function to find the best matching response
function findBestResponse(message: string, context: any) {
  const lowerMessage = message.toLowerCase()

  // Check each category for keyword matches
  for (const [category, data] of Object.entries(intelligentResponses)) {
    const matchedKeywords = data.keywords.filter((keyword) => lowerMessage.includes(keyword.toLowerCase()))

    if (matchedKeywords.length > 0) {
      const response = data.responses[0] // Get first response for now
      return {
        category,
        response: response.message,
        actions: response.actions,
        matchedKeywords,
        confidence: matchedKeywords.length / data.keywords.length,
      }
    }
  }

  // Default to general help if no specific match
  return {
    category: "general_help",
    response: intelligentResponses.general_help.responses[0].message,
    actions: intelligentResponses.general_help.responses[0].actions,
    matchedKeywords: [],
    confidence: 0.5,
  }
}

// Context-aware response enhancement
function enhanceResponseWithContext(response: string, context: any) {
  let enhancedResponse = response

  // Personalize with user name
  if (context?.name) {
    enhancedResponse = `Hi ${context.name}! ${enhancedResponse}`
  }

  // Add role-specific information
  if (context?.role === "employee") {
    enhancedResponse += "\n\n💡 **Employee Tip**: You can access all these features from your dashboard sidebar!"
  }

  return enhancedResponse
}

export async function POST(request: Request) {
  try {
    const { message, category = "general", context } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Find the best matching response
    const aiResponse = findBestResponse(message, context)

    // Enhance response with context
    const enhancedResponse = enhanceResponseWithContext(aiResponse.response, context)

    // Generate follow-up suggestions based on the category
    const suggestions = aiResponse.actions.map((action) => `How do I ${action.toLowerCase()}?`)

    return NextResponse.json({
      response: enhancedResponse,
      confidence: aiResponse.confidence,
      category: aiResponse.category,
      matchedKeywords: aiResponse.matchedKeywords,
      actions: aiResponse.actions,
      suggestions: suggestions.slice(0, 3), // Limit to 3 suggestions
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        error: "I'm having trouble processing your request right now. Please try again in a moment.",
        response:
          "Sorry, I'm experiencing technical difficulties. Please try rephrasing your question or contact support if the issue persists.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
