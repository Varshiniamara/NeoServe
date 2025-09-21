"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  BookOpen,
  FileText,
  Video,
  HelpCircle,
  Star,
  Clock,
  TrendingUp,
  ArrowLeft,
  Bookmark,
  Share2,
  ThumbsUp,
  MessageCircle,
  Plus,
  Edit,
  Trash2,
  Save,
} from "lucide-react"
import Link from "next/link"

interface Article {
  id: number
  title: string
  category: string
  type: string
  readTime: string
  rating: number
  views: number
  description: string
  tags: string[]
  lastUpdated: string
  content?: string
}

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [bookmarkedArticles, setBookmarkedArticles] = useState<number[]>([1, 2, 3])
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isArticleReaderOpen, setIsArticleReaderOpen] = useState(false)

  const [articles, setArticles] = useState<Article[]>([
    // Customer Service Articles (5 articles)
    {
      id: 1,
      title: "How to Handle Customer Escalations",
      category: "Customer Service",
      type: "article",
      readTime: "5 min",
      rating: 4.8,
      views: 1250,
      description: "Best practices for managing difficult customer situations and escalation procedures.",
      tags: ["escalation", "customer service", "communication"],
      lastUpdated: "2 days ago",
      content: `# How to Handle Customer Escalations

Customer escalations are inevitable in any support role, but how you handle them can make the difference between losing a customer and building stronger relationships.

## Understanding Escalations

An escalation occurs when a customer becomes frustrated, angry, or dissatisfied with the service they're receiving. Common triggers include:

- Long wait times
- Repeated explanations of the same issue
- Feeling unheard or dismissed
- Technical problems that aren't being resolved
- Billing or account issues

## The CALM Method

Use this proven framework for handling escalations:

### C - Control Your Response
- Take a deep breath before responding
- Keep your voice calm and steady
- Avoid taking the customer's frustration personally
- Remember: they're upset with the situation, not you

### A - Acknowledge Their Feelings
- "I understand how frustrating this must be for you"
- "I can see why you're upset about this situation"
- "Your concerns are completely valid"

### L - Listen Actively
- Let the customer fully explain their issue
- Don't interrupt, even if you think you know the solution
- Take notes to show you're engaged
- Ask clarifying questions when appropriate

### M - Move Toward Resolution
- Summarize what you've heard to confirm understanding
- Explain the steps you'll take to resolve the issue
- Set clear expectations for timeline and next steps
- Follow up proactively

## De-escalation Techniques

### 1. Lower Your Voice
When customers are shouting, speaking more quietly often causes them to lower their voice too.

### 2. Use Empathetic Language
- "I would feel the same way in your situation"
- "Let me make this right for you"
- "I'm here to help you resolve this"

### 3. Offer Choices
Give customers some control by offering options:
- "Would you prefer I call you back in an hour, or would email updates work better?"
- "I can either process a refund or provide store credit - which would you prefer?"

### 4. Know When to Escalate Further
Sometimes you need to involve a supervisor. Escalate when:
- The customer specifically requests a manager
- The issue is beyond your authority to resolve
- The customer becomes abusive or threatening
- You've exhausted all available options

## Recovery Strategies

After resolving an escalation:

1. **Follow Up**: Check in within 24-48 hours to ensure satisfaction
2. **Document Everything**: Record the issue, resolution, and customer feedback
3. **Learn and Improve**: Identify what could prevent similar escalations
4. **Celebrate Success**: Acknowledge when you've turned a negative experience positive

## Key Takeaways

- Stay calm and professional, no matter how heated the situation becomes
- Listen more than you speak
- Focus on solutions, not blame
- Use escalations as opportunities to build stronger customer relationships
- Remember that successfully handling difficult situations builds your skills and confidence

Remember: Every escalation is an opportunity to demonstrate exceptional service and potentially turn an upset customer into a loyal advocate.`,
    },
    {
      id: 2,
      title: "Active Listening Techniques for Support",
      category: "Customer Service",
      type: "guide",
      readTime: "4 min",
      rating: 4.9,
      views: 980,
      description: "Master the art of active listening to better understand and help customers.",
      tags: ["listening", "communication", "empathy"],
      lastUpdated: "1 week ago",
      content: `# Active Listening Techniques for Support

Active listening is one of the most powerful tools in customer support. It's the difference between simply hearing what a customer says and truly understanding their needs.

## What is Active Listening?

Active listening means fully concentrating on, understanding, and responding to the speaker. It involves:
- Giving your complete attention
- Understanding the message
- Responding appropriately
- Remembering the information

## The 5 Levels of Listening

### Level 1: Ignoring
Not paying attention at all (avoid this!)

### Level 2: Pretending
Acting like you're listening but thinking about other things

### Level 3: Selective Listening
Only hearing parts that interest you

### Level 4: Attentive Listening
Paying attention and focusing on the words

### Level 5: Empathetic Listening (Our Goal!)
Understanding both content and emotion

## Active Listening Techniques

### 1. Give Full Attention
- Close other applications/tabs
- Make eye contact (if on video call)
- Put away distractions
- Face the customer (physically or mentally)

### 2. Use Verbal Confirmations
- "I see"
- "Go on"
- "Tell me more about that"
- "That makes sense"

### 3. Paraphrase and Summarize
- "So what I'm hearing is..."
- "Let me make sure I understand..."
- "It sounds like your main concern is..."

### 4. Ask Clarifying Questions
- "Can you help me understand...?"
- "What happened next?"
- "How did that make you feel?"
- "What would an ideal solution look like?"

### 5. Reflect Emotions
- "That sounds frustrating"
- "I can hear the concern in your voice"
- "You seem worried about..."

## Body Language (For Video Calls)

- **Lean in slightly** - shows engagement
- **Nod appropriately** - indicates understanding
- **Maintain eye contact** - builds connection
- **Open posture** - appears welcoming
- **Mirror their energy** - creates rapport

## Common Listening Barriers

### Internal Barriers
- Thinking about your response while they're talking
- Making assumptions based on past experiences
- Personal biases or judgments
- Stress or fatigue

### External Barriers
- Background noise
- Technical issues
- Interruptions
- Time pressure

## The SOLER Method

**S** - Sit squarely (face the customer)
**O** - Open posture
**L** - Lean in
**E** - Eye contact
**R** - Relax

## Practical Exercises

### Exercise 1: The Pause
After a customer finishes speaking, count to 3 before responding. This ensures they're truly finished and gives you time to process.

### Exercise 2: Emotion Labeling
Practice identifying emotions in customer communications:
- Frustrated
- Confused
- Anxious
- Disappointed
- Hopeful

### Exercise 3: Summary Practice
End each customer interaction by summarizing:
1. The issue they presented
2. The solution you provided
3. Next steps (if any)

## Benefits of Active Listening

- **Builds trust** - customers feel heard and valued
- **Reduces misunderstandings** - clearer communication
- **Faster resolution** - better understanding leads to better solutions
- **Increased satisfaction** - customers appreciate being understood
- **Personal growth** - improves all your relationships

## Red Flags: Signs You're Not Listening

- You're thinking about your lunch while they talk
- You interrupt frequently
- You give generic responses
- You miss important details
- Customers repeat themselves often

## Quick Tips for Better Listening

1. **Silence is golden** - don't fill every pause
2. **Ask before assuming** - clarify rather than guess
3. **Take notes** - shows engagement and helps memory
4. **Repeat key information** - confirms understanding
5. **End with confirmation** - "Did I capture everything correctly?"

Remember: People don't care how much you know until they know how much you care. Active listening is how you show you care.`,
    },
    {
      id: 3,
      title: "De-escalation Strategies That Work",
      category: "Customer Service",
      type: "video",
      readTime: "12 min",
      rating: 4.7,
      views: 1450,
      description: "Video training on proven techniques to calm angry customers and resolve conflicts.",
      tags: ["de-escalation", "conflict resolution", "training"],
      lastUpdated: "3 days ago",
      content: `# De-escalation Strategies That Work

This comprehensive video training covers proven techniques to calm angry customers and resolve conflicts effectively.

## Video Overview

In this 12-minute training video, you'll learn:
- The psychology behind customer anger
- Verbal and non-verbal de-escalation techniques
- Real-world scenarios and responses
- How to maintain your composure under pressure

## Key Techniques Covered

### 1. The Power of Tone
Your tone of voice can either escalate or de-escalate a situation:
- Speak slowly and calmly
- Lower your voice when they raise theirs
- Use a warm, empathetic tone
- Avoid sounding robotic or scripted

### 2. Verbal De-escalation Phrases
Powerful phrases that work:
- "I understand why you're upset"
- "Let me see what I can do to help"
- "That must be really frustrating"
- "I want to make this right for you"
- "Help me understand what happened"

### 3. The Acknowledgment Technique
Before solving the problem, acknowledge their feelings:
- Validate their emotions
- Don't dismiss their concerns
- Show genuine empathy
- Repeat back what you heard

### 4. Offering Solutions
When presenting solutions:
- Give them choices when possible
- Explain what you can do, not what you can't
- Set realistic expectations
- Follow through on promises

## Common Mistakes to Avoid

### Don't Say These Phrases:
- "Calm down"
- "That's not my fault"
- "You need to understand"
- "I can't do that"
- "That's company policy"

### Don't Do These Actions:
- Interrupt while they're venting
- Take their anger personally
- Match their energy level
- Make promises you can't keep
- Rush to end the conversation

## The De-escalation Process

### Step 1: Listen Actively (2-3 minutes)
- Let them vent without interruption
- Take notes to show you're engaged
- Use verbal confirmations ("I see", "Go on")

### Step 2: Acknowledge and Empathize (1 minute)
- Summarize what you heard
- Validate their feelings
- Show genuine concern

### Step 3: Apologize (When Appropriate)
- Apologize for the situation, not necessarily fault
- "I'm sorry this happened to you"
- "I apologize for the inconvenience"

### Step 4: Ask Questions (1-2 minutes)
- Gather necessary information
- Clarify details
- Show you're working toward a solution

### Step 5: Present Solutions (2-3 minutes)
- Offer specific options
- Explain next steps clearly
- Get their agreement on the plan

### Step 6: Follow Up
- Confirm their contact information
- Set expectations for follow-up
- Thank them for their patience

## Practice Scenarios

### Scenario 1: Billing Dispute
Customer: "I've been charged twice for the same service! This is ridiculous!"

Good Response: "I can absolutely understand why you'd be upset about being charged twice. That would frustrate me too. Let me pull up your account right now and see exactly what happened so we can get this resolved for you."

### Scenario 2: Technical Issues
Customer: "Your software crashed and I lost three hours of work! This is unacceptable!"

Good Response: "I'm so sorry that happened - losing three hours of work would be incredibly frustrating. Let me see what we can do to recover your data and prevent this from happening again."

### Scenario 3: Delayed Service
Customer: "I was promised my issue would be fixed yesterday, and nothing has been done!"

Good Response: "I sincerely apologize that we didn't meet the timeline we promised you. I can see why you'd be disappointed. Let me find out exactly what happened and get this prioritized right away."

## Body Language Tips (For Video Calls)

### Positive Body Language:
- Maintain eye contact
- Lean in slightly to show interest
- Keep an open posture
- Nod to show understanding
- Use calm hand gestures

### Avoid These:
- Crossing arms
- Looking away or distracted
- Fidgeting or tapping
- Rolling eyes or sighing
- Checking phone or computer

## After the De-escalation

### Document Everything:
- What caused the escalation
- How it was resolved
- Customer's final satisfaction level
- Any follow-up needed

### Self-Care:
- Take a short break if needed
- Practice deep breathing
- Debrief with a colleague if helpful
- Remember: their anger wasn't personal

## Key Takeaways

1. **Stay calm** - your energy affects theirs
2. **Listen first** - let them feel heard
3. **Acknowledge feelings** - validation is powerful
4. **Focus on solutions** - move toward resolution
5. **Follow through** - do what you say you'll do

Remember: De-escalation is a skill that improves with practice. Every difficult interaction is an opportunity to get better at helping people and building stronger customer relationships.`,
    },
    {
      id: 4,
      title: "Building Customer Rapport Quickly",
      category: "Customer Service",
      type: "article",
      readTime: "3 min",
      rating: 4.6,
      views: 750,
      description: "Simple techniques to establish trust and connection with customers from the first interaction.",
      tags: ["rapport", "trust", "first impression"],
      lastUpdated: "5 days ago",
      content: `# Building Customer Rapport Quickly

The first few seconds of any customer interaction set the tone for the entire experience. Building rapport quickly can transform a routine support call into a positive relationship-building opportunity.

## What is Rapport?

Rapport is a harmonious relationship characterized by:
- Mutual understanding
- Trust and respect
- Comfortable communication
- Shared connection

## The First 30 Seconds Matter

### Your Opening Sets the Stage:
**Instead of:** "How can I help you today?"
**Try:** "Hi! I'm [Name], and I'm here to help you get this sorted out. What's going on?"

### Key Elements of a Strong Opening:
1. **Warm greeting** with your name
2. **Positive energy** in your voice
3. **Immediate helpfulness** signal
4. **Personal touch** when appropriate

## The HEART Method for Building Rapport

### H - Humanize the Interaction
- Use the customer's name frequently
- Share appropriate personal touches
- Show genuine interest in their situation
- Remember details from previous interactions

### E - Empathize Genuinely
- "That sounds really frustrating"
- "I can understand why you'd be concerned"
- "I'd feel the same way in your situation"

### A - Ask Thoughtful Questions
- "How has this been affecting your work?"
- "What would be the ideal outcome for you?"
- "When did you first notice this issue?"

### R - Respond with Understanding
- Paraphrase what you heard
- Acknowledge their feelings
- Show you're actively listening

### T - Take Action Together
- "Let's figure this out together"
- "Here's what we can do..."
- "I'm going to make sure this gets resolved"

## Quick Rapport-Building Techniques

### 1. Mirror Their Communication Style
- **If they're formal:** Match their professional tone
- **If they're casual:** Be friendly and relaxed
- **If they're urgent:** Show appropriate urgency
- **If they're detailed:** Be thorough in your responses

### 2. Use Positive Language
**Instead of:** "I can't do that"
**Say:** "Here's what I can do for you"

**Instead of:** "That's not possible"
**Say:** "Let me find another way to help"

### 3. Find Common Ground
- Shared experiences ("I've been there too")
- Similar challenges ("That's a common concern")
- Mutual goals ("We both want this resolved quickly")

### 4. Show Genuine Interest
- Ask follow-up questions
- Remember details they share
- Comment appropriately on their situation

## Conversation Starters That Build Connection

### For Business Customers:
- "How is this affecting your team's productivity?"
- "What's your biggest priority right now?"
- "I want to make sure we solve this efficiently for you"

### For Individual Customers:
- "I can hear the frustration in your voice"
- "Let's get this sorted out so you can get back to your day"
- "I'm here to make this as easy as possible for you"

## Non-Verbal Rapport Building (Video Calls)

### Visual Cues:
- **Smile genuinely** - it comes through in your voice
- **Make eye contact** with the camera
- **Use open body language** - uncrossed arms
- **Nod to show understanding**

### Vocal Cues:
- **Match their pace** - don't rush if they're thoughtful
- **Use appropriate volume** - not too loud or soft
- **Vary your tone** - avoid monotone delivery
- **Pause for emphasis** - give them time to process

## Overcoming Rapport Barriers

### When They're Angry:
- Don't take it personally
- Acknowledge their frustration first
- Focus on solutions, not blame
- Stay calm and professional

### When They're Skeptical:
- Be transparent about processes
- Explain your reasoning
- Offer proof or examples
- Follow through on small promises first

### When They're in a Hurry:
- Acknowledge their time constraints
- Be efficient but thorough
- Summarize key points clearly
- Offer follow-up if needed

## Cultural Considerations

### Be Aware of:
- Different communication styles
- Varying expectations of formality
- Time zone considerations
- Language barriers (speak clearly, avoid idioms)

### Universal Rapport Builders:
- Respect and courtesy
- Active listening
- Genuine helpfulness
- Professional competence

## Maintaining Rapport Throughout the Interaction

### During Problem-Solving:
- Keep them informed of your progress
- Explain what you're doing and why
- Ask for their input when appropriate
- Celebrate small wins together

### When Delivering Bad News:
- Lead with empathy
- Explain the situation clearly
- Offer alternatives when possible
- Focus on next steps

### At the End:
- Summarize what was accomplished
- Confirm their satisfaction
- Offer additional help
- Thank them for their time

## Quick Wins for Instant Rapport

1. **Use their name** within the first minute
2. **Acknowledge wait times** if applicable
3. **Show enthusiasm** for helping them
4. **Ask about their experience** so far
5. **Offer multiple solutions** when possible

## Red Flags: Rapport Killers

- Being too familiar too quickly
- Interrupting their story
- Sounding scripted or robotic
- Dismissing their concerns
- Making assumptions about their needs

## Measuring Rapport Success

### You'll Know You've Built Rapport When:
- They start sharing more details
- Their tone becomes more relaxed
- They thank you for your help
- They ask for your name for future reference
- The conversation flows naturally

## Key Takeaways

- **First impressions matter** - start strong
- **Genuine interest** beats scripted responses
- **Active listening** is your best tool
- **Empathy** creates instant connection
- **Consistency** builds lasting trust

Remember: People do business with people they like and trust. Building rapport isn't about being fake or overly friendly - it's about creating genuine human connections that make the support experience better for everyone involved.`,
    },
    {
      id: 5,
      title: "Handling Refund Requests Professionally",
      category: "Customer Service",
      type: "guide",
      readTime: "6 min",
      rating: 4.8,
      views: 1100,
      description: "Step-by-step guide for processing refunds while maintaining customer satisfaction.",
      tags: ["refunds", "policy", "satisfaction"],
      lastUpdated: "1 week ago",
      content: `# Handling Refund Requests Professionally

Refund requests are among the most sensitive customer interactions. How you handle them can determine whether a customer leaves satisfied or becomes a vocal critic of your company.

## Understanding Refund Psychology

### Why Customers Request Refunds:
- **Product didn't meet expectations**
- **Technical issues or bugs**
- **Changed circumstances**
- **Found a better alternative**
- **Billing errors or disputes**
- **Poor customer service experience**

### Customer Emotions During Refund Requests:
- Disappointment
- Frustration
- Anxiety about the process
- Concern about getting money back
- Sometimes embarrassment

## The Professional Refund Process

### Step 1: Listen and Understand (2-3 minutes)
**Do:**
- Let them explain the full situation
- Ask clarifying questions
- Take notes on key details
- Show empathy for their situation

**Don't:**
- Interrupt or rush them
- Immediately jump to policy
- Make assumptions about their motives
- Sound defensive

### Step 2: Acknowledge and Empathize (1 minute)
**Effective Phrases:**
- "I understand why you'd want a refund in this situation"
- "I can see how this didn't meet your expectations"
- "Let me see what options we have for you"
- "I want to make sure we handle this properly"

### Step 3: Review Account and Policy (2-3 minutes)
**Check:**
- Purchase date and amount
- Product/service details
- Previous interactions
- Refund policy applicability
- Any special circumstances

### Step 4: Present Options Clearly (2-3 minutes)
**Structure Your Response:**
1. Start with what you CAN do
2. Explain the process clearly
3. Set realistic timelines
4. Offer alternatives if full refund isn't possible

### Step 5: Process and Confirm (1-2 minutes)
**Final Steps:**
- Confirm refund amount and method
- Provide reference numbers
- Explain next steps
- Set follow-up expectations

## Common Refund Scenarios and Responses

### Scenario 1: Within Policy, Valid Request
**Customer:** "I bought this software last week, but it doesn't work with my system."

**Response:** "I completely understand - compatibility issues are frustrating. Since you purchased this within our 30-day window and it's a technical compatibility issue, I can absolutely process a full refund for you. Let me get that started right away."

### Scenario 2: Outside Policy Window
**Customer:** "I bought this 6 months ago but never used it. Can I get a refund?"

**Response:** "I understand you'd like to return this. While our standard policy is 30 days, let me see what options we might have. I can offer you a store credit for 50% of the purchase price, or we could look at exchanging it for a different product that might be more useful for you."

### Scenario 3: Partial Use/Consumption
**Customer:** "I used this service for 2 weeks but it's not what I expected."

**Response:** "I appreciate you giving us a try for those two weeks. Since you did use the service, I can offer you a prorated refund for the unused portion, which would be about 75% of your payment. Would that work for you?"

### Scenario 4: Technical Issues
**Customer:** "Your app keeps crashing and I can't use it."

**Response:** "I'm sorry you're experiencing these technical issues - that's definitely not the experience we want you to have. Let me first see if our technical team can resolve this quickly. If not, I'll be happy to process a full refund while we work on fixing the underlying issue."

## Refund Policy Guidelines

### When to Approve Full Refunds:
- Within policy timeframe
- Product defects or technical issues
- Service not delivered as promised
- Billing errors
- Customer service failures

### When to Offer Partial Refunds:
- Outside policy window but valid concerns
- Partial use of service/product
- Goodwill gestures for loyal customers
- Compromise solutions

### When to Offer Alternatives:
- Store credit instead of cash refund
- Product exchange or upgrade
- Extended trial period
- Additional support/training

### When to Decline (Diplomatically):
- Clear policy violations with no extenuating circumstances
- Obvious abuse or fraud
- Product worked as advertised
- Customer error after proper support

## Diplomatic Ways to Decline Refunds

### The Sandwich Method:
1. **Positive/Understanding:** "I understand your situation..."
2. **Policy/Limitation:** "Our policy doesn't typically cover..."
3. **Alternative/Positive:** "However, here's what I can do..."

### Example Responses:

**For Policy Violations:**
"I understand you'd like a refund, and I wish I could make an exception. Our policy is designed to be fair to all customers, and in this case, the purchase was made 8 months ago, which is well outside our 30-day window. However, I can offer you a 25% discount on a newer version of the product, or I can connect you with our technical team to see if we can resolve the issues you're experiencing."

**For Working Products:**
"I can see you're not completely satisfied with the results, and I appreciate your feedback. The product is working as designed and advertised, so a refund wouldn't typically apply. However, I'd love to help you get better results. Can I connect you with our success team for some additional training, or would you be interested in exploring a different product that might better fit your needs?"

## Handling Difficult Refund Situations

### When They Become Angry:
1. Stay calm and professional
2. Acknowledge their frustration
3. Focus on solutions, not blame
4. Escalate if necessary

### When They Threaten Legal Action:
1. Remain professional
2. Document everything
3. Follow company escalation procedures
4. Don't make legal statements

### When They Mention Competitors:
1. Don't badmouth competitors
2. Focus on your company's strengths
3. Offer to match reasonable competitor policies
4. Emphasize your commitment to customer satisfaction

## Processing Refunds: Best Practices

### Documentation Requirements:
- Original purchase information
- Reason for refund
- Customer communication
- Approval authorization
- Processing confirmation

### Timeline Management:
- Set realistic expectations
- Explain processing delays (banking, etc.)
- Provide tracking information when possible
- Follow up proactively

### Communication During Processing:
- Send confirmation emails
- Provide reference numbers
- Explain next steps clearly
- Offer to answer questions

## Turning Refunds into Positive Experiences

### Recovery Strategies:
1. **Exceed expectations** on processing speed
2. **Follow up** to ensure satisfaction
3. **Ask for feedback** on how to improve
4. **Invite them back** with special offers
5. **Thank them** for their business

### Building Future Relationships:
- "We'd love another chance to serve you"
- "Please keep us in mind for future needs"
- "Your feedback helps us improve"
- "You're always welcome back"

## Refund Prevention Strategies

### Proactive Measures:
- Clear product descriptions
- Realistic expectations setting
- Good onboarding processes
- Responsive customer support
- Regular check-ins with new customers

### Early Warning Signs:
- Multiple support tickets
- Complaints about functionality
- Requests for extensive help
- Comparisons to competitors
- Expressions of buyer's remorse

## Key Metrics to Track

### Refund-Related KPIs:
- Refund rate by product/service
- Time to process refunds
- Customer satisfaction with refund process
- Retention rate after refund discussions
- Conversion of refund requests to alternatives

## Scripts and Templates

### Opening Response:
"Thank you for reaching out about your refund request. I want to make sure we handle this properly for you. Can you help me understand what led to this request so I can see what options we have?"

### Policy Explanation:
"Our refund policy is designed to be fair while allowing us to continue providing quality service. In your situation, [explain specific policy application]. Here's what I can do for you..."

### Alternative Offering:
"While a full refund isn't possible in this case, I don't want to leave you without options. I can offer [specific alternatives]. Which of these would work best for you?"

### Closing Confirmation:
"I've processed your [refund/credit/exchange] and you should see it reflected in [timeframe]. Your reference number is [number]. Is there anything else I can help you with today?"

## Key Takeaways

- **Listen first** - understand before responding
- **Show empathy** - acknowledge their situation
- **Be transparent** - explain policies clearly
- **Offer alternatives** - find creative solutions
- **Follow through** - do what you promise
- **Learn from feedback** - use it to improve

Remember: A well-handled refund request can actually strengthen customer relationships. Even when customers don't get exactly what they want, they'll remember how professionally and caringly you treated them.`,
    },

    // Technical Issues Articles (5 articles)
    {
      id: 6,
      title: "API Integration Troubleshooting",
      category: "Technical Issues",
      type: "guide",
      readTime: "10 min",
      rating: 4.5,
      views: 650,
      description: "Common API integration issues and their solutions.",
      tags: ["api", "technical", "troubleshooting"],
      lastUpdated: "1 week ago",
      content: `# API Integration Troubleshooting Guide

API integrations are the backbone of modern software systems, but they can be complex to troubleshoot when things go wrong. This guide covers the most common issues and their solutions.

## Understanding API Basics

### What is an API?
An Application Programming Interface (API) allows different software applications to communicate with each other. Think of it as a waiter in a restaurant - it takes your order (request) to the kitchen (server) and brings back your food (response).

### Common API Types:
- **REST APIs** - Most common, uses HTTP methods
- **GraphQL APIs** - Flexible query language
- **SOAP APIs** - Older, XML-based protocol
- **WebSocket APIs** - Real-time communication

## Most Common API Issues

### 1. Authentication Problems (401/403 Errors)

**Symptoms:**
- "Unauthorized" error messages
- "Access denied" responses
- API calls failing immediately

**Common Causes:**
- Expired API keys
- Incorrect credentials
- Wrong authentication method
- Missing required headers

**Solutions:**
1. Verify that the API key is valid and has not expired.
2. Ensure that the credentials provided are correct.
3. Check that the authentication method used matches the API's requirements.
4. Confirm that all required headers are included in the request.

### 2. Endpoint Not Found (404 Errors)

**Symptoms:**
- "Endpoint not found" error messages
- API calls returning no data
- Incorrect URL paths

**Common Causes:**
- Typographical errors in the endpoint URL
- Changes in the API's endpoint structure
- Incorrect API version being used

**Solutions:**
1. Double-check the endpoint URL for any typos.
2. Verify that the endpoint structure matches the API documentation.
3. Ensure that the correct API version is being used.
4. Update the endpoint URL if necessary based on the latest API documentation.

### 3. Request Timeout (504 Errors)

**Symptoms:**
- API calls taking longer than expected
- "Request timeout" error messages
- Unresponsive API responses

**Common Causes:**
- Network issues between the client and server
- Server overload or high traffic
- Long-running processes on the server
- Incorrect timeout settings

**Solutions:**
1. Check for network connectivity issues between the client and server.
2. Monitor server traffic and consider scaling resources if necessary.
3. Optimize server processes to reduce response times.
4. Adjust timeout settings to accommodate longer processing times.

### 4. Invalid Request (400 Errors)

**Symptoms:**
- "Invalid request" error messages
- Missing required parameters
- Incorrect data formats

**Common Causes:**
- Missing required fields in the request payload
- Data types not matching the API's expectations
- Incorrect request methods (GET, POST, etc.)

**Solutions:**
1. Ensure all required fields are included in the request payload.
2. Verify that data types match the API's requirements.
3. Confirm that the correct request method is being used.
4. Validate the request payload against the API documentation.

### 5. Server Error (500 Errors)

**Symptoms:**
- "Server error" messages
- Unexpected behavior
- Incomplete data responses

**Common Causes:**
- Bugs or issues in the server code
- Database connectivity problems
- Insufficient server resources
- Configuration errors

**Solutions:**
1. Check the server logs for error messages and stack traces.
2. Verify database connectivity and ensure it's functioning correctly.
3. Ensure the server has sufficient resources (CPU, memory, etc.).
4. Review server configuration settings and make necessary adjustments.

## Additional Tips

- **Use API Testing Tools**: Tools like Postman or Insomnia can help you test API requests and identify issues quickly.
- **Document API Requests**: Keep detailed records of API requests and responses for troubleshooting and auditing purposes.
- **Stay Updated**: Regularly review API documentation and updates to ensure compatibility and efficiency.
- **Communicate Clearly**: Provide clear and concise error messages to customers, guiding them on how to resolve issues.

By following these troubleshooting steps and tips, you can effectively resolve common API integration issues and maintain a smooth and reliable API integration process.`,
    },
    {
      id: 7,
      title: "Debugging Common JavaScript Errors",
      category: "Technical Issues",
      type: "guide",
      readTime: "8 min",
      rating: 4.6,
      views: 700,
      description: "Guide to identifying and fixing common JavaScript errors.",
      tags: ["javascript", "errors", "debugging"],
      lastUpdated: "2 weeks ago",
      content: `# Debugging Common JavaScript Errors

JavaScript is a versatile language, but it can also be prone to errors. This guide helps you identify and fix some of the most common JavaScript errors.

## Understanding JavaScript Errors

JavaScript errors can occur due to various reasons, including syntax errors, runtime errors, and logical errors. Proper debugging techniques are essential to resolve these issues efficiently.

## Common JavaScript Errors

### 1. Syntax Errors

**Symptoms:**
- Code doesn't run
- Browser console shows error messages
- Highlighted lines in the code editor

**Common Causes:**
- Missing semicolons
- Incorrect use of brackets
- Typos in variable names or keywords

**Solutions:**
1. Check the highlighted lines in the code editor for syntax issues.
2. Ensure all semicolons are present.
3. Verify that brackets are correctly used and nested.
4. Look for typos in variable names and keywords.

### 2. Reference Errors

**Symptoms:**
- "ReferenceError: [variable] is not defined" messages
- Code fails to execute

**Common Causes:**
- Using a variable before declaring it
- Incorrect scope of variable usage
- Typos in variable names

**Solutions:**
1. Declare variables before using them.
2. Ensure variables are used within their correct scope.
3. Check for typos in variable names.

### 3. Type Errors

**Symptoms:**
- "TypeError: [object] is not a function" messages
- "TypeError: Cannot read properties of undefined" messages

**Common Causes:**
- Calling a method on a non-function object
- Accessing properties of undefined or null objects

**Solutions:**
1. Verify that the object is a function before calling a method on it.
2. Check that the object is defined and not null before accessing its properties.
3. Use type-checking functions like typeof to ensure correct types.

### 4. Range Errors

**Symptoms:**
- "RangeError: Maximum call stack size exceeded" messages
- Infinite loops or recursive functions

**Common Causes:**
- Recursive functions without proper termination conditions
- Infinite loops due to incorrect loop conditions

**Solutions:**
1. Ensure recursive functions have proper termination conditions.
2. Review loop conditions to prevent infinite loops.
3. Use debugging tools to step through code and identify problematic areas.

### 5. URI Errors

**Symptoms:**
- "URIError: URI malformed" messages
- Issues with URL encoding or decoding

**Common Causes:**
- Incorrect URL encoding or decoding
- Invalid characters in URLs

**Solutions:**
1. Use encodeURIComponent and decodeURIComponent for proper URL encoding and decoding.
2. Validate URLs to ensure they contain only valid characters.

## Debugging Techniques

### 1. Use the Browser Console
The browser console is a powerful tool for identifying and fixing JavaScript errors.

### 2. Set Breakpoints
Breakpoints allow you to pause code execution and inspect variables and program flow.

### 3. Use console.log
Insert console.log statements to output variable values and program flow.

### 4. Step Through Code
Use debugging tools to step through code line by line, observing how variables change.

### 5. Check for Typos
Typos are a common source of errors. Double-check variable names, function names, and keywords.

## Additional Tips

- **Use Linters**: Tools like ESLint can help identify syntax and style issues in your code.
- **Write Tests**: Unit tests can help catch errors before they reach production.
- **Stay Updated**: Regularly review JavaScript documentation and updates to avoid deprecated features.
- **Communicate Clearly**: Provide clear and concise error messages to customers, guiding them on how to resolve issues.

By following these debugging techniques and tips, you can effectively identify and fix common JavaScript errors, ensuring smoother and more reliable code execution.`,
    },
    {
      id: 8,
      title: "Optimizing Database Performance",
      category: "Technical Issues",
      type: "article",
      readTime: "7 min",
      rating: 4.7,
      views: 800,
      description: "Strategies for improving database performance and efficiency.",
      tags: ["database", "performance", "optimization"],
      lastUpdated: "3 weeks ago",
      content: `# Optimizing Database Performance

Database performance is critical for the smooth operation of any application. This article covers strategies for improving database performance and efficiency.

## Understanding Database Performance

Database performance can be affected by various factors, including query optimization, indexing, hardware resources, and database design. Proper optimization techniques are essential to ensure efficient database operations.

## Common Performance Issues

### 1. Slow Query Execution

**Symptoms:**
- Queries taking longer than expected
- High load times for application pages

**Common Causes:**
- Inefficient queries
- Lack of proper indexing
- Large datasets without optimization

**Solutions:**
1. Analyze and optimize queries using tools like EXPLAIN.
2. Create indexes on frequently queried columns.
3. Consider database partitioning for large datasets.

### 2. High CPU Usage

**Symptoms:**
- Slow response times
- Database server becoming unresponsive

**Common Causes:**
- Complex queries or stored procedures
- Inefficient use of resources
- High traffic or concurrent connections

**Solutions:**
1. Simplify complex queries and stored procedures.
2. Monitor resource usage and optimize accordingly.
3. Scale hardware resources if necessary to handle high traffic.

### 3. Memory Leaks

**Symptoms:**
- Increasing memory usage over time
- Database server crashing due to insufficient memory

**Common Causes:**
- Unreleased resources or connections
- Inefficient data handling

**Solutions:**
1. Ensure all resources and connections are properly released.
2. Optimize data handling to reduce memory usage.
3. Regularly monitor and manage memory usage.

### 4. Disk I/O Bottlenecks

**Symptoms:**
- Slow read/write operations
- High latency in database responses

**Common Causes:**
- Insufficient disk space
- Poor disk performance
- High disk contention

**Solutions:**
1. Ensure sufficient disk space is available.
2. Upgrade to faster disk storage if necessary.
3. Optimize disk usage to reduce contention.

### 5. Network Latency

**Symptoms:**
- Slow data transfer between client and server
- High latency in database responses

**Common Causes:**
- Network congestion
- Inefficient data transfer protocols
- Large data payloads

**Solutions:**
1. Monitor network traffic and identify congestion points.
2. Use efficient data transfer protocols like HTTP/2.
3. Optimize data payloads to reduce transfer times.

## Optimization Strategies

### 1. Query Optimization

- Use EXPLAIN to analyze query execution plans.
- Avoid using SELECT *; specify only necessary columns.
- Use JOINs efficiently to reduce data retrieval times.

### 2. Indexing

- Create indexes on frequently queried columns.
- Use composite indexes for multi-column queries.
- Regularly review and update indexes.

### 3. Hardware Resources

- Scale CPU, memory, and disk resources as needed.
- Use load balancers to distribute traffic evenly.
- Consider using cloud-based solutions for scalable resources.

### 4. Database Design

- Normalize database design to reduce redundancy.
- Denormalize for performance improvements if necessary.
- Use appropriate data types and constraints.

### 5. Caching

- Implement caching strategies to reduce database load.
- Use in-memory caches like Redis for faster access.
- Regularly clear and update caches.

## Additional Tips

- **Monitor Performance**: Use monitoring tools to track database performance and identify bottlenecks.
- **Regular Maintenance**: Perform regular maintenance tasks like vacuuming and reindexing.
- **Stay Updated**: Regularly review database documentation and updates to avoid deprecated features.
- **Communicate Clearly**: Provide clear and concise error messages to customers, guiding them on how to resolve issues.

By following these optimization strategies and tips, you can effectively improve database performance and efficiency, ensuring smoother and more reliable application operations.`,
    },
    {
      id: 9,
      title: "Troubleshooting Network Connectivity Issues",
      category: "Technical Issues",
      type: "guide",
      readTime: "9 min",
      rating: 4.8,
      views: 900,
      description: "Guide to identifying and resolving network connectivity issues.",
      tags: ["network", "connectivity", "troubleshooting"],
      lastUpdated: "4 weeks ago",
      content: `# Troubleshooting Network Connectivity Issues

Network connectivity issues can disrupt the functionality of any application. This guide helps you identify and resolve common network connectivity issues.

## Understanding Network Connectivity

Network connectivity refers to the ability of devices to communicate with each other over a network. Proper troubleshooting techniques are essential to ensure reliable network connections.

## Common Connectivity Issues

### 1. Connection Refused (ECONNREFUSED)

**Symptoms:**
- Unable to connect to a server
- "Connection refused" error messages

**Common Causes:**
- Server is not running
- Firewall blocking the connection
- Incorrect server address or port

**Solutions:**
1. Verify that the server is running and accessible.
2. Check firewall settings to ensure the connection is not blocked.
3. Confirm that the server address and port are correct.

### 2. Connection Timeout (ETIMEDOUT)

**Symptoms:**
- Slow or unresponsive network connections
- "Connection timeout" error messages

**Common Causes:**
- Network congestion
- Server overload
- Incorrect timeout settings

**Solutions:**
1. Monitor network traffic and identify congestion points.
2. Scale server resources if necessary to handle high traffic.
3. Adjust timeout settings to accommodate longer processing times.

### 3. DNS Resolution Failure

**Symptoms:**
- Unable to resolve domain names
- "DNS resolution failed" error messages

**Common Causes:**
- Incorrect DNS settings
- DNS server issues
- Network configuration errors

**Solutions:**
1. Verify DNS settings and ensure they are correct.
2. Check the status of DNS servers and consider using alternative DNS services.
3. Review network configuration settings and make necessary adjustments.

### 4. Packet Loss

**Symptoms:**
- Intermittent connectivity issues
- Slow data transfer rates

**Common Causes:**
- Network congestion
- Physical network issues
- Incorrect routing configurations

**Solutions:**
1. Monitor network traffic and identify congestion points.
2. Check physical network connections and cables.
3. Review routing configurations and make necessary adjustments.

### 5. Network Authentication Failures

**Symptoms:**
- Unable to authenticate network connections
- "Authentication failed" error messages

**Common Causes:**
- Incorrect credentials
- Expired authentication tokens
- Network configuration issues

**Solutions:**
1. Verify that credentials are correct and up-to-date.
2. Ensure authentication tokens are valid and not expired.
3. Review network configuration settings and make necessary adjustments.

## Troubleshooting Techniques

### 1. Use Network Diagnostic Tools

- Tools like Ping, Traceroute, and Netstat can help identify network issues.

### 2. Check Network Configuration

- Verify that network settings, including IP addresses and routing configurations, are correct.

### 3. Test Connectivity

- Use tools like Telnet or Curl to test connectivity to servers and endpoints.

### 4. Monitor Network Traffic

- Use monitoring tools to track network traffic and identify congestion points.

### 5. Check Physical Connections

- Ensure that network cables and hardware are properly connected and functioning.

## Additional Tips

- **Stay Updated**: Regularly review network documentation and updates to avoid deprecated features.
- **Communicate Clearly**: Provide clear and concise error messages to customers, guiding them on how to resolve issues.
- **Regular Maintenance**: Perform regular maintenance tasks like cable replacements and firmware updates.
- **Use Cloud Services**: Consider using cloud-based solutions for scalable and reliable network connectivity.

By following these troubleshooting techniques and tips, you can effectively identify and resolve network connectivity issues, ensuring reliable and efficient network operations.`,
    },
    {
      id: 10,
      title: "Securing Your Application Against Common Vulnerabilities",
      category: "Technical Issues",
      type: "article",
      readTime: "6 min",
      rating: 4.9,
      views: 1000,
      description: "Strategies for securing your application against common vulnerabilities.",
      tags: ["security", "vulnerabilities", "protection"],
      lastUpdated: "5 weeks ago",
      content: `# Securing Your Application Against Common Vulnerabilities

Application security is crucial for protecting sensitive data and maintaining user trust. This article covers strategies for securing your application against common vulnerabilities.

## Understanding Application Security

Application security involves protecting your application from various threats, including unauthorized access, data breaches, and malicious attacks. Proper security measures are essential to ensure the safety and integrity of your application.

## Common Vulnerabilities

### 1. SQL Injection

**Symptoms:**
- Unauthorized access to database
- Data manipulation or theft

**Common Causes:**
- Insecure database queries
- Lack of input validation

**Solutions:**
1. Use parameterized queries or prepared statements.
2. Validate and sanitize all user inputs.
3. Regularly review and update database queries.

### 2. Cross-Site Scripting (XSS)

**Symptoms:**
- Malicious scripts executing on user pages
- Data theft or session hijacking

**Common Causes:**
- Insecure output handling
- Lack of input validation

**Solutions:**
1. Use output encoding to prevent script execution.
2. Validate and sanitize all user inputs.
3. Regularly review and update output handling code.

### 3. Cross-Site Request Forgery (CSRF)

**Symptoms:**
- Unauthorized actions performed on behalf of users
- Data manipulation or theft

**Common Causes:**
- Lack of CSRF protection mechanisms
- Insecure session management

**Solutions:**
1. Implement CSRF tokens for form submissions.
2. Use secure session management practices.
3. Regularly review and update CSRF protection mechanisms.

### 4. Insecure Authentication

**Symptoms:**
- Unauthorized access to user accounts
- Data theft or session hijacking

**Common Causes:**
- Weak password policies
- Lack of secure authentication mechanisms

**Solutions:**
1. Enforce strong password policies.
2. Use secure authentication mechanisms like OAuth or JWT.
3. Regularly review and update authentication practices.

### 5. Buffer Overflows

**Symptoms:**
- Application crashes or unexpected behavior
- Data corruption or loss

**Common Causes:**
- Insecure memory management
- Lack of input validation

**Solutions:**
1. Use secure memory management practices.
2. Validate and sanitize all user inputs.
3. Regularly review and update memory management code.

## Security Strategies

### 1. Input Validation

- Validate and sanitize all user inputs to prevent injection attacks.

### 2. Use Secure Coding Practices

- Follow secure coding guidelines to prevent common vulnerabilities.

### 3. Implement Access Controls

- Use role-based access controls to restrict access to sensitive data.

### 4. Regular Security Audits

- Perform regular security audits and vulnerability assessments to identify and fix issues.

### 5. Use Encryption

- Encrypt sensitive data both in transit and at rest to protect against unauthorized access.

## Additional Tips

- **Stay Updated**: Regularly review security documentation and updates to avoid deprecated features.
- **Communicate Clearly**: Provide clear and concise error messages to customers, guiding them on how to resolve issues.
- **Regular Maintenance**: Perform regular maintenance tasks like code updates and security patches.
- **Use Security Tools**: Consider using security tools like vulnerability scanners and intrusion detection systems.

By following these security strategies and tips, you can effectively secure your application against common vulnerabilities, ensuring the safety and integrity of your application and user data.`,
    },

    // Process Guidelines Articles (5 articles)
    {
      id: 11,
      title: "Ticket Priority Guidelines",
      category: "Process Guidelines",
      type: "guide",
      readTime: "3 min",
      rating: 4.9,
      views: 2100,
      description: "Understanding how to properly categorize and prioritize support tickets.",
      tags: ["tickets", "priority", "workflow"],
      lastUpdated: "1 week ago",
      content: `# Ticket Priority Guidelines

Proper ticket prioritization ensures that critical issues are addressed first while maintaining efficient workflow for all support requests.

## Priority Levels

### Critical (P1) - Response within 1 hour
**Definition:** Issues that completely prevent business operations or affect a large number of users.

**Examples:**
- Complete system outages
- Security breaches
- Data loss incidents
- Payment processing failures
- Critical functionality completely broken

**Response Requirements:**
- Immediate acknowledgment (within 15 minutes)
- Escalate to senior team immediately
- Provide hourly updates until resolved
- Document all actions taken

### High (P2) - Response within 4 hours
**Definition:** Issues that significantly impact business operations but have workarounds available.

**Examples:**
- Major feature not working for some users
- Performance issues affecting productivity
- Integration failures with important systems
- Login issues for multiple users

**Response Requirements:**
- Acknowledge within 1 hour
- Provide initial assessment within 4 hours
- Update every 4 hours until resolved
- Escalate if not resolved within 24 hours

### Medium (P3) - Response within 24 hours
**Definition:** Issues that affect individual users or have minimal business impact.

**Examples:**
- Individual user account issues
- Minor feature bugs
- Cosmetic interface problems
- Non-critical integrations failing

**Response Requirements:**
- Acknowledge within 4 hours
- Provide solution or workaround within 24 hours
- Update every 24 hours if ongoing
- Standard escalation procedures

### Low (P4) - Response within 72 hours
**Definition:** Minor issues, feature requests, or general questions.

**Examples:**
- Feature enhancement requests
- General how-to questions
- Documentation requests
- Minor cosmetic issues

**Response Requirements:**
- Acknowledge within 24 hours
- Provide response within 72 hours
- Can be batched with other low-priority items

## Prioritization Factors

### Business Impact
- Number of users affected
- Revenue impact
- Compliance implications
- Brand reputation risk

### Technical Severity
- System availability
- Data integrity
- Security implications
- Performance degradation

### Customer Type
- Enterprise vs. individual customers
- Premium support agreements
- Strategic partnerships
- Customer tier level

### Workaround Availability
- Can users continue working?
- Is there an alternative process?
- How complex is the workaround?

## Escalation Triggers

### Automatic Escalation
- P1 tickets not acknowledged within 15 minutes
- P2 tickets not resolved within 24 hours
- Any ticket approaching SLA breach
- Customer requests escalation

### Manual Escalation
- Technical complexity beyond current skill level
- Customer becomes increasingly frustrated
- Multiple related tickets from same customer
- Potential for broader system impact

## Priority Assessment Questions

### Ask Yourself:
1. How many users are affected?
2. Can users continue their work?
3. Is there a workaround available?
4. What's the business impact?
5. Is this a security concern?
6. What's the customer's tier level?

### Customer Questions:
- "How is this affecting your daily operations?"
- "How many people in your organization are impacted?"
- "Is there any way to work around this issue?"
- "What would happen if this isn't fixed today?"

## Common Prioritization Mistakes

### Over-Prioritizing
- Marking everything as urgent
- Letting customer emotion drive priority
- Not considering actual business impact
- Ignoring available workarounds

### Under-Prioritizing
- Missing security implications
- Not recognizing widespread impact
- Underestimating customer importance
- Focusing only on technical severity

## Priority Change Process

### When to Change Priority
- New information about impact discovered
- Workaround becomes unavailable
- Issue spreads to more users
- Customer provides additional context

### How to Change Priority
1. Document reason for change
2. Notify customer of new timeline
3. Update internal stakeholders
4. Adjust resource allocation
5. Follow new priority procedures

## Communication Templates

### P1 Acknowledgment
"We've received your critical issue report and have immediately escalated this to our senior technical team. We understand the urgency and will provide updates every hour until resolved. Our team is actively investigating and will have an initial assessment within 30 minutes."

### P2 Acknowledgment
"Thank you for reporting this issue. We've classified this as high priority and assigned it to our technical team. We'll provide an initial assessment within 4 hours and keep you updated on our progress every 4 hours."

### Priority Explanation
"Based on the information provided, I've set this as [Priority Level] because [reason]. This means we'll [response timeline and process]. If the situation changes or you have additional information that might affect the priority, please let me know immediately."

## Metrics to Track

### Response Times
- Time to first response by priority
- Time to resolution by priority
- SLA compliance rates
- Escalation frequency

### Quality Metrics
- Priority accuracy (how often priorities change)
- Customer satisfaction by priority level
- Resolution quality scores
- Repeat ticket rates

## Best Practices

### For Support Agents
- Always ask clarifying questions
- Document your reasoning
- Communicate priority clearly to customer
- Don't be afraid to escalate when unsure

### For Team Leads
- Review priority assignments regularly
- Provide feedback on prioritization decisions
- Ensure team understands guidelines
- Monitor SLA compliance

### For Customers
- Provide complete information upfront
- Be honest about business impact
- Mention any workarounds you've tried
- Update us if situation changes

## Key Takeaways

- Priority should reflect true business impact, not just customer emotion
- When in doubt, ask more questions before assigning priority
- Clear communication about priority and timelines sets proper expectations
- Regular review of priorities ensures resources are allocated effectively
- Documentation helps improve future prioritization decisions

Remember: Proper prioritization is about balancing customer needs with resource availability while ensuring the most critical issues get the attention they deserve.`,
    },
    {
      id: 12,
      title: "SLA Response Time Standards",
      category: "Process Guidelines",
      type: "article",
      readTime: "4 min",
      rating: 4.6,
      views: 1800,
      description: "Service Level Agreement standards and response time requirements.",
      tags: ["sla", "response time", "standards"],
      lastUpdated: "2 weeks ago",
      content: `# SLA Response Time Standards

Service Level Agreements (SLAs) define our commitment to customers regarding response times and resolution targets. Understanding and meeting these standards is crucial for customer satisfaction and business success.

## SLA Tiers by Customer Type

### Enterprise Customers
**Response Times:**
- Critical (P1): 15 minutes
- High (P2): 2 hours
- Medium (P3): 8 hours
- Low (P4): 24 hours

**Resolution Targets:**
- Critical: 4 hours
- High: 24 hours
- Medium: 72 hours
- Low: 5 business days

### Professional Customers
**Response Times:**
- Critical (P1): 1 hour
- High (P2): 4 hours
- Medium (P3): 24 hours
- Low (P4): 48 hours

**Resolution Targets:**
- Critical: 8 hours
- High: 48 hours
- Medium: 5 business days
- Low: 10 business days

### Standard Customers
**Response Times:**
- Critical (P1): 4 hours
- High (P2): 24 hours
- Medium (P3): 48 hours
- Low (P4): 72 hours

**Resolution Targets:**
- Critical: 24 hours
- High: 5 business days
- Medium: 10 business days
- Low: 15 business days

## Business Hours Definition

### Standard Business Hours
- Monday - Friday: 9:00 AM - 6:00 PM (Customer's local time)
- Excludes weekends and holidays
- Applies to Professional and Standard customers

### Extended Business Hours
- Monday - Friday: 6:00 AM - 10:00 PM (Customer's local time)
- Saturday: 9:00 AM - 5:00 PM
- Applies to Enterprise customers

### 24/7 Support
- Available for Critical (P1) issues only
- Enterprise customers with premium support
- Escalation required for after-hours support

## SLA Clock Management

### When SLA Clock Starts
- Ticket is created in our system
- Customer sends email to support
- Phone call is received
- Chat session is initiated

### When SLA Clock Pauses
- Waiting for customer response
- Customer requests to pause ticket
- Scheduled maintenance windows
- External vendor dependencies

### When SLA Clock Resumes
- Customer provides requested information
- Customer confirms issue still exists
- Maintenance window ends
- External dependencies are resolved

## Response vs. Resolution

### First Response
- Initial acknowledgment of the ticket
- Confirmation we've received and understood the issue
- Assignment of ticket ID and priority
- Next steps communication

### Resolution
- Issue is completely fixed
- Customer confirms satisfaction
- Workaround is provided and accepted
- Root cause is addressed

## SLA Breach Prevention

### Early Warning System
- Alerts at 50% of SLA time
- Escalation at 75% of SLA time
- Manager notification at 90% of SLA time
- Automatic escalation at 95% of SLA time

### Proactive Measures
- Regular ticket queue monitoring
- Resource allocation planning
- Skill-based routing
- Workload balancing

## Escalation Procedures

### Level 1 Escalation (Team Lead)
- SLA at 75% with no progress
- Technical complexity beyond agent skill
- Customer requests escalation
- Multiple related issues

### Level 2 Escalation (Manager)
- SLA at 90% or breached
- Level 1 escalation not resolved
- Customer threatens to cancel
- Media or legal involvement

### Level 3 Escalation (Director)
- Major customer at risk
- Systemic issues affecting multiple customers
- Regulatory or compliance concerns
- Executive customer complaints

## Communication Standards

### Initial Response Template
"Thank you for contacting [Company] support. We've received your [Priority] priority ticket #[Number] and understand you're experiencing [brief issue description]. Based on your [Customer Tier] support level, we're committed to providing updates every [timeframe] and working toward resolution within [target time]. I'll personally ensure this receives the attention it deserves."

### Progress Updates
- Provide specific actions taken
- Explain current status clearly
- Set expectations for next steps
- Include estimated timeline when possible

### SLA Breach Communication
"I want to personally apologize that we haven't met our committed response time for your ticket. This is not the level of service we strive to provide. I've escalated this to my manager and we're dedicating additional resources to resolve this quickly. You can expect [specific next steps and timeline]."

## Measuring SLA Performance

### Key Metrics
- First Response Time (FRT)
- Time to Resolution (TTR)
- SLA Compliance Rate
- Customer Satisfaction Score (CSAT)

### Reporting Frequency
- Real-time dashboards for agents
- Daily reports for team leads
- Weekly summaries for managers
- Monthly analysis for executives

### Performance Targets
- SLA Compliance: 95% or higher
- Customer Satisfaction: 4.5/5 or higher
- First Contact Resolution: 70% or higher
- Escalation Rate: Less than 10%

## Special Circumstances

### Holiday Coverage
- Reduced staffing acknowledged
- Extended response times communicated
- Critical issues still receive priority
- Advance notice provided to customers

### Maintenance Windows
- Scheduled maintenance excludes SLA
- Emergency maintenance pauses SLA
- Customer notification required
- Post-maintenance verification

### Force Majeure
- Natural disasters
- Internet outages
- Power failures
- Government restrictions

## Customer Communication

### Setting Expectations
- Clearly explain SLA terms during onboarding
- Provide SLA documentation
- Regular reminders of support channels
- Training on priority classification

### Managing Expectations
- Be realistic about resolution times
- Explain factors affecting timeline
- Offer alternatives when possible
- Keep customers informed of delays

## Continuous Improvement

### Regular Reviews
- Monthly SLA performance analysis
- Customer feedback incorporation
- Process optimization opportunities
- Technology enhancement needs

### Training Requirements
- New agent SLA training
- Regular refresher sessions
- Escalation procedure practice
- Customer communication skills

## Best Practices

### For Agents
- Acknowledge tickets immediately
- Set realistic expectations
- Communicate proactively
- Document thoroughly

### For Team Leads
- Monitor queue regularly
- Balance workloads effectively
- Provide coaching on SLA management
- Escalate appropriately

### For Managers
- Review SLA performance weekly
- Address systemic issues
- Invest in team training
- Communicate with stakeholders

## Key Takeaways

- SLAs are commitments that must be taken seriously
- Proactive communication prevents many escalations
- Early escalation is better than SLA breaches
- Customer tier determines response expectations
- Continuous monitoring and improvement are essential

Remember: SLAs aren't just numbers - they represent our promise to customers and directly impact their trust in our service.`,
    },
    {
      id: 13,
      title: "Quality Assurance Checklist",
      category: "Process Guidelines",
      type: "guide",
      readTime: "5 min",
      rating: 4.7,
      views: 1600,
      description: "Comprehensive checklist for ensuring quality in customer support interactions.",
      tags: ["quality", "checklist", "standards"],
      lastUpdated: "3 weeks ago",
      content: `# Quality Assurance Checklist

This comprehensive checklist ensures consistent, high-quality customer support interactions across all channels and team members.

## Pre-Interaction Preparation

### Knowledge Preparation
- [ ] Review customer's previous tickets and interactions
- [ ] Check customer's account status and subscription level
- [ ] Verify any known issues or ongoing incidents
- [ ] Ensure access to necessary tools and resources
- [ ] Review relevant documentation or procedures

### Technical Setup
- [ ] Test all communication tools (phone, chat, screen sharing)
- [ ] Verify access to customer management systems
- [ ] Check knowledge base and documentation access
- [ ] Ensure stable internet connection
- [ ] Have escalation contacts readily available

## Initial Customer Contact

### Professional Greeting
- [ ] Use appropriate greeting for time of day
- [ ] Introduce yourself with name and role
- [ ] Confirm customer's identity appropriately
- [ ] Ask how you can help today
- [ ] Set positive, helpful tone from start

### Information Gathering
- [ ] Listen actively without interrupting
- [ ] Ask clarifying questions to understand fully
- [ ] Confirm understanding by summarizing
- [ ] Identify customer's desired outcome
- [ ] Assess urgency and impact appropriately

## Problem Analysis and Resolution

### Technical Investigation
- [ ] Follow systematic troubleshooting approach
- [ ] Document all steps taken
- [ ] Explain what you're doing to the customer
- [ ] Test solutions thoroughly before presenting
- [ ] Consider multiple resolution options

### Solution Presentation
- [ ] Explain solution in customer-friendly language
- [ ] Provide step-by-step instructions when needed
- [ ] Confirm customer understands each step
- [ ] Offer to walk through solution together
- [ ] Provide alternative options when available

## Communication Quality

### Language and Tone
- [ ] Use professional, friendly language
- [ ] Avoid technical jargon unless necessary
- [ ] Show empathy for customer's situation
- [ ] Maintain positive attitude throughout
- [ ] Adapt communication style to customer preference

### Clarity and Completeness
- [ ] Provide clear, specific instructions
- [ ] Include all necessary information
- [ ] Anticipate follow-up questions
- [ ] Offer additional resources or documentation
- [ ] Confirm customer has everything needed

## Customer Experience

### Responsiveness
- [ ] Respond promptly to customer inquiries
- [ ] Keep customer informed of progress
- [ ] Set realistic expectations for resolution time
- [ ] Follow up proactively when promised
- [ ] Escalate appropriately when needed

### Personalization
- [ ] Use customer's name throughout interaction
- [ ] Reference their specific situation
- [ ] Acknowledge their business or use case
- [ ] Show appreciation for their patience
- [ ] Tailor solutions to their needs

## Resolution and Follow-up

### Solution Verification
- [ ] Confirm solution resolves the issue completely
- [ ] Test functionality with customer when possible
- [ ] Address any remaining concerns
- [ ] Provide prevention tips for future
- [ ] Document resolution for future reference

### Closing the Interaction
- [ ] Summarize what was accomplished
- [ ] Confirm customer satisfaction
- [ ] Provide ticket number or reference
- [ ] Explain next steps if any
- [ ] Invite customer to contact again if needed

## Documentation Standards

### Ticket Documentation
- [ ] Record accurate problem description
- [ ] Document all troubleshooting steps taken
- [ ] Note customer's responses and feedback
- [ ] Include resolution details and outcome
- [ ] Add any relevant customer preferences

### Knowledge Sharing
- [ ] Update knowledge base if new solution found
- [ ] Share insights with team if applicable
- [ ] Flag systemic issues for product team
- [ ] Contribute to FAQ updates
- [ ] Document process improvements

## Escalation Criteria

### When to Escalate
- [ ] Issue beyond your technical expertise
- [ ] Customer requests to speak with manager
- [ ] SLA timeline at risk of being missed
- [ ] Customer becomes increasingly frustrated
- [ ] Potential security or compliance issue

### Escalation Process
- [ ] Provide complete context to next level
- [ ] Explain what has been tried already
- [ ] Include customer's preferred outcome
- [ ] Set expectations with customer about escalation
- [ ] Follow up to ensure smooth transition

## Channel-Specific Considerations

### Email Support
- [ ] Use professional email signature
- [ ] Include relevant links or attachments
- [ ] Format for easy reading and scanning
- [ ] Proofread before sending
- [ ] Set appropriate urgency level

### Phone Support
- [ ] Speak clearly and at appropriate pace
- [ ] Use hold appropriately and ask permission
- [ ] Summarize key points verbally
- [ ] Confirm spelling of important information
- [ ] End call professionally

### Chat Support
- [ ] Respond quickly to maintain engagement
- [ ] Use proper grammar and punctuation
- [ ] Break long responses into multiple messages
- [ ] Use emojis appropriately if company culture allows
- [ ] Provide transcript or summary at end

### Video Support
- [ ] Ensure professional appearance and background
- [ ] Test audio and video quality beforehand
- [ ] Share screen effectively when needed
- [ ] Maintain eye contact with camera
- [ ] Record session if customer consents

## Quality Metrics

### Response Quality
- [ ] First contact resolution achieved when possible
- [ ] Customer satisfaction score of 4+ out of 5
- [ ] No unnecessary back-and-forth exchanges
- [ ] Solution addresses root cause, not just symptoms
- [ ] Customer feels heard and valued

### Process Adherence
- [ ] All required fields completed in ticket
- [ ] Proper categorization and tagging applied
- [ ] SLA requirements met or exceeded
- [ ] Escalation procedures followed correctly
- [ ] Documentation standards maintained

## Continuous Improvement

### Self-Assessment
- [ ] Regularly review your own interactions
- [ ] Seek feedback from customers and colleagues
- [ ] Identify areas for skill development
- [ ] Stay updated on product changes
- [ ] Participate in training opportunities

### Team Contribution
- [ ] Share knowledge and best practices
- [ ] Mentor new team members
- [ ] Provide constructive feedback to peers
- [ ] Contribute to process improvements
- [ ] Participate in team meetings and discussions

## Common Quality Pitfalls to Avoid

### Communication Mistakes
- [ ] Avoid using "I don't know" without offering alternatives
- [ ] Don't make promises you can't keep
- [ ] Avoid blaming other departments or systems
- [ ] Don't rush customers through explanations
- [ ] Avoid technical jargon without explanation

### Process Shortcuts
- [ ] Don't skip verification steps to save time
- [ ] Avoid incomplete documentation
- [ ] Don't escalate without attempting resolution
- [ ] Avoid generic responses to specific questions
- [ ] Don't close tickets without customer confirmation

## Emergency Situations

### Critical Issues
- [ ] Acknowledge severity immediately
- [ ] Escalate to appropriate level quickly
- [ ] Provide frequent updates
- [ ] Coordinate with technical teams
- [ ] Document timeline and actions taken

### Angry Customers
- [ ] Remain calm and professional
- [ ] Listen without becoming defensive
- [ ] Acknowledge their frustration
- [ ] Focus on solutions, not blame
- [ ] Escalate if situation doesn't improve

## Key Performance Indicators

### Individual Metrics
- Customer Satisfaction Score (CSAT)
- First Contact Resolution Rate
- Average Response Time
- Ticket Quality Score
- Escalation Rate

### Team Metrics
- Overall CSAT Score
- SLA Compliance Rate
- Knowledge Base Utilization
- Process Adherence Score
- Continuous Improvement Contributions

## Final Quality Check

Before closing any customer interaction, ask yourself:
- [ ] Would I be satisfied with this level of service?
- [ ] Have I exceeded the customer's expectations?
- [ ] Is the customer better off than when they started?
- [ ] Have I represented the company professionally?
- [ ] Would I want this interaction to be reviewed by my manager?

Remember: Quality isn't just about solving problems - it's about creating positive experiences that build customer loyalty and trust.`,
    },
    {
      id: 14,
      title: "Escalation Matrix and Procedures",
      category: "Process Guidelines",
      type: "guide",
      readTime: "6 min",
      rating: 4.8,
      views: 1900,
      description: "Complete guide to escalation procedures and decision matrix.",
      tags: ["escalation", "procedures", "matrix"],
      lastUpdated: "1 month ago",
      content: `# Escalation Matrix and Procedures

Effective escalation ensures that complex issues receive appropriate attention while maintaining efficient workflow and customer satisfaction.

## Escalation Levels

### Level 0: Self-Resolution (Agent Level)
**Scope:** Standard issues within agent expertise
**Timeline:** Immediate to 2 hours
**Authority:** 
- Standard troubleshooting procedures
- Basic account modifications
- Common configuration changes
- FAQ and knowledge base solutions

### Level 1: Team Lead Escalation
**Scope:** Complex technical issues or process exceptions
**Timeline:** 2-8 hours
**Authority:**
- Advanced troubleshooting procedures
- Account modifications requiring approval
- Process exceptions within guidelines
- Customer retention decisions up to $500

### Level 2: Manager Escalation
**Scope:** High-impact issues or significant process deviations
**Timeline:** 8-24 hours
**Authority:**
- Cross-departmental coordination
- Policy exceptions and interpretations
- Customer retention decisions up to $2,000
- Resource allocation decisions

### Level 3: Director Escalation
**Scope:** Strategic issues or major incidents
**Timeline:** 24-72 hours
**Authority:**
- Executive customer relationships
- Major policy changes
- Significant financial decisions
- Legal and compliance issues

### Level 4: Executive Escalation
**Scope:** Company-wide impact or critical relationships
**Timeline:** As needed
**Authority:**
- Strategic business decisions
- Major customer relationships
- Public relations issues
- Regulatory compliance

## Escalation Triggers

### Technical Triggers
- [ ] Issue requires expertise beyond current level
- [ ] Multiple systems or departments involved
- [ ] Potential security or data breach
- [ ] System-wide impact or outage
- [ ] Custom development or engineering required

### Customer-Related Triggers
- [ ] Customer specifically requests escalation
- [ ] High-value customer (Enterprise tier)
- [ ] Customer threatens to cancel or leave
- [ ] Legal action mentioned or threatened
- [ ] Media or public relations involvement

### Process Triggers
- [ ] SLA breach imminent or occurred
- [ ] Policy exception required
- [ ] Financial impact exceeds authority level
- [ ] Regulatory or compliance concerns
- [ ] Repeated failures on same issue

### Time-Based Triggers
- [ ] Issue open longer than priority guidelines
- [ ] No progress made in reasonable timeframe
- [ ] Customer waiting longer than acceptable
- [ ] Approaching critical business deadlines
- [ ] End of business day with unresolved critical issue

## Decision Matrix

### Priority vs. Customer Tier Escalation
| Priority | Standard | Professional | Enterprise |
|----------|----------|--------------|------------|
| P1 (Critical) | Level 1 immediately | Level 2 immediately | Level 3 immediately |
| P2 (High) | Level 1 after 4 hours | Level 1 after 2 hours | Level 2 after 1 hour |
| P3 (Medium) | Level 1 after 24 hours | Level 1 after 8 hours | Level 1 after 4 hours |
| P4 (Low) | Level 1 after 72 hours | Level 1 after 24 hours | Level 1 after 8 hours |

### Financial Authority Matrix
| Level | Refunds | Credits | Discounts | Retention Offers |
|-------|---------|---------|-----------|------------------|
| Agent | $50 | $100 | 10% | $100 |
| Team Lead | $200 | $500 | 25% | $500 |
| Manager | $1,000 | $2,000 | 50% | $2,000 |
| Director | $5,000 | $10,000 | 75% | $10,000 |
| Executive | Unlimited | Unlimited | Unlimited | Unlimited |

## Escalation Procedures

### Step 1: Assessment
- [ ] Verify escalation is necessary
- [ ] Determine appropriate escalation level
- [ ] Gather all relevant information
- [ ] Document current status and actions taken
- [ ] Identify urgency and impact

### Step 2: Preparation
- [ ] Complete escalation form or template
- [ ] Attach relevant documentation
- [ ] Prepare summary of issue and attempts
- [ ] Identify customer's desired outcome
- [ ] Note any special circumstances

### Step 3: Handoff
- [ ] Contact escalation recipient directly
- [ ] Provide complete context and background
- [ ] Explain what has been tried already
- [ ] Share customer communication history
- [ ] Set expectations for next steps

### Step 4: Customer Communication
- [ ] Inform customer of escalation
- [ ] Explain what this means for them
- [ ] Provide new contact information if needed
- [ ] Set expectations for timeline
- [ ] Confirm their availability for follow-up

### Step 5: Follow-up
- [ ] Monitor progress of escalated issue
- [ ] Provide additional information if requested
- [ ] Update customer on status changes
- [ ] Ensure smooth resolution
- [ ] Document outcome and lessons learned

## Escalation Templates

### Internal Escalation Email
**Subject:** ESCALATION - [Priority] - [Customer Name] - [Brief Issue Description]

**Issue Summary:**
- Customer: [Name, Tier, Account ID]
- Issue: [Detailed description]
- Impact: [Business impact and urgency]
- Priority: [P1/P2/P3/P4 with justification]

**Actions Taken:**
- [List all troubleshooting steps]
- [Include timestamps and outcomes]
- [Note customer responses]

**Current Status:**
- [Where things stand now]
- [What's blocking progress]
- [Customer's current state]

**Escalation Reason:**
- [Why escalation is needed]
- [What expertise/authority required]
- [Timeline constraints]

**Customer Expectations:**
- [What customer is hoping for]
- [Any commitments made]
- [Communication preferences]

### Customer Escalation Communication
"I want to ensure you receive the best possible support for this issue. I'm escalating your case to [Name/Title] who has additional expertise in [area]. They will contact you within [timeframe] and will have full context of our conversation. Your ticket number remains [#] and you can reference this in any future communications."

## Special Escalation Scenarios

### After-Hours Escalations
- [ ] Verify issue meets after-hours criteria
- [ ] Use emergency contact procedures
- [ ] Document justification for after-hours escalation
- [ ] Follow up during business hours
- [ ] Review escalation appropriateness

### Cross-Department Escalations
- [ ] Identify correct department and contact
- [ ] Provide complete technical context
- [ ] Establish communication bridge
- [ ] Monitor progress across departments
- [ ] Coordinate customer communications

### External Vendor Escalations
- [ ] Verify vendor escalation procedures
- [ ] Prepare vendor-specific information
- [ ] Establish three-way communication
- [ ] Monitor vendor response times
- [ ] Maintain customer relationship during vendor resolution

## Escalation Metrics

### Response Time Metrics
- Time from escalation to acknowledgment
- Time from escalation to first action
- Time from escalation to resolution
- Customer satisfaction with escalation process

### Quality Metrics
- Escalation appropriateness rate
- Successful resolution rate post-escalation
- Customer satisfaction scores
- Repeat escalation rate

### Process Metrics
- Escalation volume by level
- Most common escalation reasons
- Escalation prevention opportunities
- Training needs identification

## De-escalation Techniques

### When Customer Requests Escalation
- [ ] Acknowledge their request respectfully
- [ ] Ask what specific outcome they're seeking
- [ ] Explain what you can still try
- [ ] Offer timeline for escalation if needed
- [ ] Provide options for immediate relief

### When You Want to Avoid Escalation
- [ ] Be honest about limitations
- [ ] Offer creative alternatives
- [ ] Involve customer in solution development
- [ ] Provide frequent updates
- [ ] Set realistic expectations

## Common Escalation Mistakes

### Escalating Too Early
- Not attempting standard resolution steps
- Escalating due to customer pressure alone
- Avoiding difficult conversations
- Lack of confidence in own abilities

### Escalating Too Late
- Letting SLA breach occur
- Allowing customer frustration to build
- Attempting solutions beyond expertise
- Not recognizing complexity early

### Poor Escalation Communication
- Incomplete information transfer
- Not setting customer expectations
- Failing to follow up
- Inadequate documentation

## Best Practices

### For Agents
- Don't be afraid to escalate when appropriate
- Provide complete context during escalation
- Stay involved until resolution
- Learn from escalated cases
- Build relationships with escalation contacts

### For Team Leads
- Be available for escalations
- Provide coaching on escalation decisions
- Review escalation patterns for training needs
- Support agents during difficult escalations
- Maintain escalation quality standards

### For Managers
- Monitor escalation metrics regularly
- Provide feedback on escalation decisions
- Ensure adequate escalation resources
- Review and update escalation procedures
- Communicate escalation trends to leadership

## Escalation Prevention

### Proactive Measures
- Comprehensive agent training
- Regular knowledge base updates
- Clear process documentation
- Adequate staffing levels
- Early warning systems

### Early Intervention
- Monitor ticket aging reports
- Identify struggling agents quickly
- Provide just-in-time coaching
- Recognize escalation patterns
- Address systemic issues promptly

## Key Takeaways

- Escalation is a tool for better customer service, not a failure
- Early escalation is often better than late escalation
- Complete information transfer is crucial for successful escalations
- Customer communication during escalation is as important as the escalation itself
- Regular review and improvement of escalation processes ensures effectiveness

Remember: The goal of escalation is to provide customers with the best possible resolution while developing team capabilities and improving processes.`,
    },
    {
      id: 15,
      title: "Documentation Standards and Best Practices",
      category: "Process Guidelines",
      type: "article",
      readTime: "5 min",
      rating: 4.5,
      views: 1400,
      description: "Guidelines for creating and maintaining high-quality documentation.",
      tags: ["documentation", "standards", "best practices"],
      lastUpdated: "2 months ago",
      content: `# Documentation Standards and Best Practices

Effective documentation is the foundation of consistent, high-quality customer support. This guide establishes standards for creating, maintaining, and utilizing documentation across all support activities.

## Documentation Principles

### Clarity and Simplicity
- Use clear, concise language
- Avoid unnecessary jargon or technical terms
- Write for your audience's knowledge level
- Use active voice when possible
- Break complex information into digestible chunks

### Accuracy and Completeness
- Verify all information before publishing
- Include all necessary steps and details
- Test procedures before documenting
- Update information when changes occur
- Cite sources and references when appropriate

### Consistency and Structure
- Follow established templates and formats
- Use consistent terminology throughout
- Maintain uniform style and tone
- Apply standard formatting conventions
- Organize information logically

## Types of Documentation

### Customer-Facing Documentation
**Knowledge Base Articles**
- Step-by-step tutorials
- Troubleshooting guides
- Feature explanations
- FAQ responses
- Best practices guides

**User Manuals**
- Comprehensive product guides
- Getting started tutorials
- Advanced feature documentation
- Integration instructions
- API documentation

### Internal Documentation
**Process Documentation**
- Standard operating procedures
- Escalation procedures
- Quality guidelines
- Training materials
- Policy documents

**Technical Documentation**
- System architecture guides
- Troubleshooting procedures
- Configuration instructions
- Integration guides
- Security protocols

## Documentation Structure

### Article Template
**Title:** Clear, descriptive, and searchable
**Summary:** Brief overview of what the article covers
**Prerequisites:** What users need before starting
**Steps:** Numbered, sequential instructions
**Examples:** Real-world scenarios and use cases
**Troubleshooting:** Common issues and solutions
**Related Articles:** Links to relevant content

### Standard Sections
1. **Introduction** - What this document covers
2. **Scope** - Who this applies to and when
3. **Procedure** - Step-by-step instructions
4. **Examples** - Practical applications
5. **Troubleshooting** - Common problems and solutions
6. **References** - Additional resources

## Writing Guidelines

### Language and Tone
- Use professional but friendly tone
- Write in second person ("you") for instructions
- Be direct and specific
- Avoid ambiguous terms like "might" or "could"
- Use positive language when possible

### Formatting Standards
- Use numbered lists for sequential steps
- Use bullet points for non-sequential items
- Bold important terms and concepts
- Use code formatting for technical elements
- Include screenshots and diagrams when helpful

### Content Organization
- Start with most important information
- Group related information together
- Use headings and subheadings effectively
- Include table of contents for long documents
- Provide clear navigation and cross-references

## Visual Elements

### Screenshots and Images
- Use high-quality, clear images
- Highlight relevant areas with callouts
- Keep images current with latest UI
- Use consistent styling for annotations
- Optimize file sizes for web delivery

### Diagrams and Flowcharts
- Create clear, easy-to-follow diagrams
- Use standard symbols and conventions
- Include legends when necessary
- Ensure diagrams are accessible
- Update diagrams when processes change

### Videos and Interactive Content
- Keep videos focused and concise
- Include captions for accessibility
- Provide video transcripts
- Use interactive elements sparingly
- Ensure content works across devices

## Quality Assurance

### Review Process
1. **Author Review** - Self-check for accuracy and clarity
2. **Peer Review** - Colleague verification
3. **Technical Review** - Subject matter expert validation
4. **Editorial Review** - Grammar and style check
5. **Final Approval** - Manager or designated approver

### Quality Checklist
- [ ] Information is accurate and current
- [ ] Steps are clear and complete
- [ ] Language is appropriate for audience
- [ ] Formatting follows standards
- [ ] Links and references work correctly
- [ ] Images and media are optimized
- [ ] Content is accessible to all users

## Maintenance and Updates

### Regular Review Schedule
- **Monthly:** High-traffic articles
- **Quarterly:** Standard documentation
- **Annually:** Comprehensive review of all content
- **As needed:** When products or processes change

### Update Triggers
- Product feature changes
- Process modifications
- Customer feedback indicating confusion
- Support ticket trends showing gaps
- Regulatory or compliance changes

### Version Control
- Track all changes with timestamps
- Maintain change logs
- Archive outdated versions
- Notify stakeholders of significant updates
- Coordinate updates across related documents

## Accessibility Standards

### Content Accessibility
- Use descriptive headings and subheadings
- Provide alt text for all images
- Ensure sufficient color contrast
- Use clear, simple language
- Structure content logically

### Technical Accessibility
- Follow WCAG 2.1 guidelines
- Test with screen readers
- Ensure keyboard navigation works
- Provide multiple format options
- Include captions for video content

## Search Optimization

### Keyword Strategy
- Research common search terms
- Include keywords naturally in content
- Use synonyms and variations
- Optimize titles and headings
- Tag content appropriately

### Metadata and Tagging
- Write compelling meta descriptions
- Use relevant tags and categories
- Include related article suggestions
- Optimize for internal search
- Monitor search analytics

## Collaboration and Feedback

### Stakeholder Involvement
- Include subject matter experts in creation
- Gather input from customer-facing teams
- Involve customers in testing when appropriate
- Coordinate with product and engineering teams
- Engage legal and compliance as needed

### Feedback Collection
- Provide easy feedback mechanisms
- Monitor customer support tickets for gaps
- Conduct regular user surveys
- Analyze usage analytics
- Implement suggestion systems

## Tools and Technology

### Documentation Platforms
- Choose tools that support collaboration
- Ensure version control capabilities
- Select platforms with good search functionality
- Consider integration with other systems
- Evaluate accessibility features

### Content Management
- Establish clear file naming conventions
- Organize content in logical hierarchies
- Implement approval workflows
- Set up automated backups
- Plan for content migration

## Metrics and Analytics

### Usage Metrics
- Page views and unique visitors
- Time spent on pages
- Search queries and results
- Download and sharing statistics
- User feedback ratings

### Quality Metrics
- Customer satisfaction with documentation
- Reduction in support tickets for documented topics
- Time to find information
- Accuracy of self-service resolutions
- Content freshness and currency

## Training and Development

### Team Training
- Documentation writing skills
- Tool usage and best practices
- Style guide adherence
- Accessibility requirements
- Quality assurance processes

### Continuous Improvement
- Regular training updates
- Sharing best practices
- Learning from other organizations
- Staying current with industry standards
- Investing in skill development

## Common Documentation Pitfalls

### Content Issues
- Assuming too much prior knowledge
- Skipping important steps
- Using inconsistent terminology
- Failing to update outdated information
- Not testing procedures before publishing

### Process Issues
- Lack of clear ownership
- Insufficient review processes
- Poor change management
- Inadequate feedback collection
- Not measuring effectiveness

## Best Practices Summary

### For Writers
- Know your audience and their needs
- Test all procedures before documenting
- Use clear, simple language
- Include relevant examples and context
- Seek feedback and iterate

### For Reviewers
- Check for accuracy and completeness
- Verify procedures work as described
- Ensure consistency with style guides
- Consider accessibility requirements
- Provide constructive feedback

### For Managers
- Establish clear documentation standards
- Provide adequate time and resources
- Implement quality assurance processes
- Monitor usage and effectiveness
- Invest in team training and development

## Key Takeaways

- Good documentation saves time for both customers and support teams
- Consistency in format and style improves usability
- Regular updates and maintenance are essential
- User feedback is crucial for continuous improvement
- Accessibility should be considered from the beginning

Remember: Documentation is not just about recording information - it's about enabling others to succeed independently and efficiently.`,
    },
    {
      id: 16,
      title: "Using the AI Assistant Effectively",
      category: "Tools & Features",
      type: "video",
      readTime: "8 min",
      rating: 4.7,
      views: 4300,
      description: "Video tutorial on maximizing productivity with our AI-powered assistant.",
      tags: ["ai", "assistant", "productivity"],
      lastUpdated: "3 days ago",
      content: `# Using the AI Assistant Effectively

Our AI Assistant is designed to enhance your productivity and provide instant support for common tasks. This comprehensive guide will help you maximize its potential.

## Getting Started with AI Assistant

### Accessing the AI Assistant
- Available in the main dashboard sidebar
- Click the AI Assistant icon or use keyboard shortcut Ctrl+A
- Available 24/7 for instant assistance
- Works across all major browsers and devices

### Initial Setup
- No special configuration required
- Automatically syncs with your user profile
- Learns from your interaction patterns
- Respects your privacy and data security

## Core Features

### Instant Query Resolution
The AI Assistant can help with:
- Password reset procedures
- Account troubleshooting steps
- Feature explanations and tutorials
- Policy clarifications
- Technical documentation lookup

### Smart Suggestions
- Proactive recommendations based on your current task
- Context-aware help suggestions
- Related article recommendations
- Best practice tips
- Workflow optimization suggestions

### Natural Language Processing
- Ask questions in plain English
- No need for specific commands or syntax
- Understands context and follow-up questions
- Handles multiple topics in one conversation
- Supports various communication styles

## Effective Query Techniques

### Be Specific and Clear
**Instead of:** "Help with login"
**Try:** "Customer can't log in after password reset, getting error message 'invalid credentials'"

**Instead of:** "Email problem"
**Try:** "Customer not receiving confirmation emails, checked spam folder already"

### Provide Context
- Mention the customer's situation
- Include error messages or symptoms
- Specify what troubleshooting steps you've already tried
- Note the customer's technical skill level
- Include relevant account or system information

### Use Follow-up Questions
- Ask for clarification on complex solutions
- Request alternative approaches
- Seek additional resources or documentation
- Ask for escalation criteria
- Request related troubleshooting steps

## Common Use Cases

### Password and Account Issues
**Query:** "Customer forgot password and security questions, how to verify identity?"

**AI Response:** Provides step-by-step identity verification process, including:
- Alternative verification methods
- Required documentation
- Security protocols to follow
- Escalation procedures if needed
- Documentation requirements

### Technical Troubleshooting
**Query:** "API integration failing with 401 error, customer using correct credentials"

**AI Response:** Offers comprehensive troubleshooting guide:
- Common causes of 401 errors
- Step-by-step verification process
- Alternative authentication methods
- Testing procedures
- When to escalate to technical team

### Feature Explanations
**Query:** "How does the new dashboard analytics feature work?"

**AI Response:** Provides detailed explanation including:
- Feature overview and benefits
- Step-by-step setup instructions
- Common use cases and examples
- Troubleshooting tips
- Links to detailed documentation`,
    },
    {
      id: 19,
      title: "Mood Tracking and Wellness Tips",
      category: "Wellness",
      type: "article",
      readTime: "4 min",
      rating: 4.6,
      views: 750,
      description: "How to use mood tracking effectively and maintain work-life balance.",
      tags: ["wellness", "mood", "balance"],
      lastUpdated: "5 days ago",
      content: `# Mood Tracking and Wellness Tips

Your mental health and emotional well-being directly impact your performance, relationships, and overall quality of life. Mood tracking is a powerful tool for understanding patterns and maintaining balance.

## Why Track Your Mood?

### Benefits of Mood Tracking
- **Identify patterns** - Notice what affects your mood
- **Early warning system** - Catch negative trends before they escalate
- **Measure progress** - See improvements over time
- **Better self-awareness** - Understand your emotional responses
- **Improved communication** - Articulate how you're feeling to others

## How to Use the Mood Tracker

### Daily Check-ins
1. **Rate your mood** on a scale of 1-10
2. **Select emotions** that best describe how you feel
3. **Note triggers** - what influenced your mood today?
4. **Add context** - work stress, personal events, sleep quality
5. **Set intentions** - what will help tomorrow be better?

### Weekly Reviews
Look for patterns:
- Which days are typically better/worse?
- What activities boost your mood?
- Are there recurring stressors?
- How does sleep affect your emotional state?

## Wellness Strategies for Support Teams

### Managing Work Stress

#### Before Your Shift
- **Set intentions** for the day
- **Review your goals** and priorities
- **Practice deep breathing** for 2-3 minutes
- **Organize your workspace** for efficiency

#### During Your Shift
- **Take micro-breaks** between difficult calls
- **Practice the 20-20-20 rule** (every 20 minutes, look at something 20 feet away for 20 seconds)
- **Stay hydrated** and eat nutritious snacks
- **Use positive self-talk** after challenging interactions

#### After Your Shift
- **Decompress ritual** - change clothes, wash hands, take deep breaths
- **Physical activity** - even a 10-minute walk helps
- **Connect with loved ones** outside of work
- **Engage in hobbies** that bring you joy

### Building Emotional Resilience

#### The STOP Technique
When feeling overwhelmed:
- **S** - Stop what you're doing
- **T** - Take a breath
- **O** - Observe your thoughts and feelings
- **P** - Proceed with intention

#### Cognitive Reframing
Transform negative thoughts:
- "This customer hates me" → "This customer is frustrated with their situation"
- "I'm terrible at this job" → "I'm learning and improving every day"
- "This day is ruined" → "This moment is challenging, but it will pass"

### Self-Care Essentials

#### Physical Wellness
- **Sleep hygiene** - 7-9 hours of quality sleep
- **Regular exercise** - even 15 minutes daily makes a difference
- **Nutritious eating** - fuel your body and brain properly
- **Hydration** - aim for 8 glasses of water daily

#### Mental Wellness
- **Mindfulness practice** - 5-10 minutes of meditation
- **Journaling** - process thoughts and emotions
- **Learning** - engage in activities that challenge your mind
- **Boundaries** - separate work and personal time

#### Social Wellness
- **Quality relationships** - invest in meaningful connections
- **Community involvement** - volunteer or join groups
- **Professional support** - don't hesitate to seek help when needed
- **Team bonding** - build positive relationships with colleagues

## Warning Signs to Watch For

### Emotional Red Flags
- Persistent sadness or irritability
- Loss of interest in activities you usually enjoy
- Feeling overwhelmed most days
- Difficulty concentrating
- Changes in sleep or appetite

### Physical Red Flags
- Chronic fatigue
- Frequent headaches
- Muscle tension
- Digestive issues
- Getting sick more often

### Behavioral Red Flags
- Isolating from friends and family
- Increased use of alcohol or substances
- Procrastination or decreased productivity
- Neglecting self-care
- Increased conflicts with others

## When to Seek Additional Support

Don't wait until you're in crisis. Consider professional help if:
- Symptoms persist for more than two weeks
- Your mood significantly impacts work or relationships
- You're having thoughts of self-harm
- You're using substances to cope
- Friends or family express concern

## Resources Available

### Internal Resources
- Employee Assistance Program (EAP)
- Mental health benefits through insurance
- Flexible work arrangements
- Wellness programs and initiatives

### External Resources
- Mental Health America: mhanational.org
- Crisis Text Line: Text HOME to 741741
- National Suicide Prevention Lifeline: 988
- Headspace or Calm apps for meditation

## Creating Your Wellness Plan

### Daily Habits (5-10 minutes)
- Morning intention setting
- Mood check-in
- Gratitude practice
- Evening reflection

### Weekly Habits (30-60 minutes)
- Mood pattern review
- Physical activity planning
- Social connection time
- Hobby or creative pursuit

### Monthly Habits (1-2 hours)
- Comprehensive wellness assessment
- Goal adjustment
- Professional development
- Relationship nurturing

Remember: Taking care of your mental health isn't selfish—it's essential. When you're well, you can better serve others and enjoy a more fulfilling life.

Your well-being matters, and small, consistent actions can lead to significant improvements in your overall quality of life.`,
    },
  ])

  const [articleLikes, setArticleLikes] = useState<{ [key: number]: number }>({
    1: 23,
    2: 31,
    3: 18,
    4: 15,
    5: 27,
    6: 12,
    7: 19,
    8: 34,
    9: 28,
    10: 16,
    11: 45,
    12: 38,
    13: 22,
    14: 29,
    15: 33,
    16: 14,
    17: 26,
    18: 41,
    19: 17,
    20: 24,
    21: 35,
  })

  const [articleComments, setArticleComments] = useState<{ [key: number]: number }>({
    1: 8,
    2: 12,
    3: 6,
    4: 4,
    5: 9,
    6: 3,
    7: 7,
    8: 15,
    9: 11,
    10: 5,
    11: 18,
    12: 14,
    13: 8,
    14: 10,
    15: 13,
    16: 4,
    17: 9,
    18: 16,
    19: 6,
    20: 8,
    21: 12,
  })

  const [userLikedArticles, setUserLikedArticles] = useState<number[]>([])

  // Form state for adding/editing articles
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "article",
    description: "",
    content: "",
    tags: "",
    readTime: "",
  })

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      type: "",
      description: "",
      content: "",
      tags: "",
      readTime: "",
    })
  }

  const handleAddArticle = () => {
    const newArticle: Article = {
      id: Math.max(...articles.map((a) => a.id)) + 1,
      title: formData.title,
      category: formData.category,
      type: formData.type,
      description: formData.description,
      content: formData.content,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      readTime: formData.readTime,
      rating: 0,
      views: 0,
      lastUpdated: "Just now",
    }

    setArticles([...articles, newArticle])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article)
    setFormData({
      title: article.title,
      category: article.category,
      type: article.type,
      description: article.description,
      content: article.content || "",
      tags: article.tags.join(", "),
      readTime: article.readTime,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateArticle = () => {
    if (!editingArticle) return

    const updatedArticles = articles.map((article) =>
      article.id === editingArticle.id
        ? {
            ...article,
            title: formData.title,
            category: formData.category,
            type: formData.type,
            description: formData.description,
            content: formData.content,
            tags: formData.tags.split(",").map((tag) => tag.trim()),
            readTime: formData.readTime,
            lastUpdated: "Just now",
          }
        : article,
    )

    setArticles(updatedArticles)
    setIsEditDialogOpen(false)
    setEditingArticle(null)
    resetForm()
  }

  const handleDeleteArticle = (articleId: number) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter((article) => article.id !== articleId))
      setBookmarkedArticles(bookmarkedArticles.filter((id) => id !== articleId))
    }
  }

  const toggleBookmark = (articleId: number) => {
    setBookmarkedArticles((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId],
    )
  }

  const getSearchSuggestions = (query: string) => {
    if (query.length < 2) return []

    const suggestions = new Set<string>()
    articles.forEach((article) => {
      article.tags.forEach((tag) => {
        if (tag.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(tag)
        }
      })
      if (article.title.toLowerCase().includes(query.toLowerCase())) {
        suggestions.add(article.title)
      }
    })

    return Array.from(suggestions).slice(0, 5)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    if (value.length >= 2) {
      setSearchSuggestions(getSearchSuggestions(value))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const popularTopics = [
    { name: "Customer Service", count: articles.filter((a) => a.category === "Customer Service").length },
    { name: "Technical Issues", count: articles.filter((a) => a.category === "Technical Issues").length },
    { name: "Process Guidelines", count: articles.filter((a) => a.category === "Process Guidelines").length },
    { name: "Tools & Features", count: articles.filter((a) => a.category === "Tools & Features").length },
    { name: "Wellness", count: articles.filter((a) => a.category === "Wellness").length },
  ]

  const recentlyViewed = [
    { title: "Password Reset Procedures", time: "2 hours ago" },
    { title: "Escalation Matrix", time: "Yesterday" },
    { title: "Team Communication Guidelines", time: "2 days ago" },
  ]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTopic =
      !selectedTopic ||
      (selectedTopic === "Bookmarked" ? bookmarkedArticles.includes(article.id) : article.category === selectedTopic)

    return matchesSearch && matchesTopic
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "guide":
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "guide":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    }
  }

  const categories = ["Customer Service", "Technical Issues", "Process Guidelines", "Tools & Features", "Wellness"]

  const handleReadArticle = (article: Article) => {
    setSelectedArticle(article)
    setIsArticleReaderOpen(true)

    // Update view count
    const updatedArticles = articles.map((a) => (a.id === article.id ? { ...a, views: a.views + 1 } : a))
    setArticles(updatedArticles)
  }

  const handleLikeArticle = (articleId: number) => {
    const isLiked = userLikedArticles.includes(articleId)

    if (isLiked) {
      // Unlike
      setUserLikedArticles((prev) => prev.filter((id) => id !== articleId))
      setArticleLikes((prev) => ({ ...prev, [articleId]: (prev[articleId] || 0) - 1 }))
    } else {
      // Like
      setUserLikedArticles((prev) => [...prev, articleId])
      setArticleLikes((prev) => ({ ...prev, [articleId]: (prev[articleId] || 0) + 1 }))
    }
  }

  const handleCommentArticle = (articleId: number) => {
    // Simulate adding a comment
    setArticleComments((prev) => ({ ...prev, [articleId]: (prev[articleId] || 0) + 1 }))
    alert("Comment functionality would open a comment dialog here!")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/employee" className="flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Knowledge Base</h1>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Article</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Article</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter article title"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="article">Article</SelectItem>
                          <SelectItem value="guide">Guide</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="readTime">Read Time</Label>
                    <Input
                      id="readTime"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="e.g., 5 min"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of the article"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Full article content"
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddArticle} disabled={!formData.title || !formData.category}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Article
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter article title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="guide">Guide</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-readTime">Read Time</Label>
              <Input
                id="edit-readTime"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                placeholder="e.g., 5 min"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the article"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Full article content"
                rows={6}
              />
            </div>
            <div>
              <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
              <Input
                id="edit-tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="tag1, tag2, tag3"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateArticle} disabled={!formData.title || !formData.category}>
                <Save className="h-4 w-4 mr-2" />
                Update Article
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Article Reader Dialog */}
      <Dialog open={isArticleReaderOpen} onOpenChange={setIsArticleReaderOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className={selectedArticle ? getTypeColor(selectedArticle.type) : ""}>
                  <div className="flex items-center space-x-1">
                    {selectedArticle && getTypeIcon(selectedArticle.type)}
                    <span className="capitalize">{selectedArticle?.type}</span>
                  </div>
                </Badge>
                <Badge variant="outline">{selectedArticle?.category}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => selectedArticle && toggleBookmark(selectedArticle.id)}
                  className={
                    selectedArticle && bookmarkedArticles.includes(selectedArticle.id) ? "text-yellow-500" : ""
                  }
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      selectedArticle && bookmarkedArticles.includes(selectedArticle.id) ? "fill-current" : ""
                    }`}
                  />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DialogTitle className="text-2xl font-bold mt-4">{selectedArticle?.title}</DialogTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{selectedArticle?.readTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{selectedArticle?.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>{selectedArticle?.views} views</span>
              </div>
              <span>Updated {selectedArticle?.lastUpdated}</span>
            </div>
          </DialogHeader>
          <div className="mt-6">
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{selectedArticle?.description}</p>
              <div className="whitespace-pre-wrap text-gray-900 dark:text-gray-100 leading-relaxed">
                {selectedArticle?.content || "Content not available for this article."}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags:</span>
              {selectedArticle?.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectedArticle && handleLikeArticle(selectedArticle.id)}
                  className={
                    userLikedArticles.includes(selectedArticle?.id || 0) ? "text-blue-600 border-blue-600" : ""
                  }
                >
                  <ThumbsUp
                    className={`h-4 w-4 mr-2 ${userLikedArticles.includes(selectedArticle?.id || 0) ? "fill-current" : ""}`}
                  />
                  Like ({selectedArticle ? articleLikes[selectedArticle.id] || 0 : 0})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectedArticle && handleCommentArticle(selectedArticle.id)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comment ({selectedArticle ? articleComments[selectedArticle.id] || 0 : 0})
                </Button>
              </div>
              <Button onClick={() => setIsArticleReaderOpen(false)}>Close Article</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search articles, guides, and tutorials..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10 pr-4 py-3 text-lg"
            />

            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg mt-1 z-10">
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(suggestion)
                      setShowSuggestions(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Popular Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {popularTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTopic(selectedTopic === topic.name ? null : topic.name)}
                    className={`w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left ${
                      selectedTopic === topic.name ? "bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500" : ""
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        selectedTopic === topic.name ? "text-blue-600 dark:text-blue-400" : ""
                      }`}
                    >
                      {topic.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {topic.count}
                    </Badge>
                  </button>
                ))}
                {selectedTopic && (
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="w-full flex items-center justify-center p-2 mt-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    Clear Filter
                  </button>
                )}
              </CardContent>
            </Card>

            {/* Bookmarked Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>Bookmarked</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <button
                  onClick={() => setSelectedTopic(selectedTopic === "Bookmarked" ? null : "Bookmarked")}
                  className={`w-full flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left ${
                    selectedTopic === "Bookmarked"
                      ? "bg-yellow-50 dark:bg-yellow-900/20 border-l-2 border-yellow-500"
                      : ""
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      selectedTopic === "Bookmarked" ? "text-yellow-600 dark:text-yellow-400" : ""
                    }`}
                  >
                    My Bookmarks
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {bookmarkedArticles.length}
                  </Badge>
                </button>
              </CardContent>
            </Card>

            {/* Recently Viewed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recently Viewed</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentlyViewed.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {searchQuery
                      ? `Search results for "${searchQuery}"`
                      : selectedTopic
                        ? `${selectedTopic} Articles`
                        : "All Articles"}
                  </h2>
                  <p className="text-sm text-gray-500">{filteredArticles.length} articles found</p>
                </div>

                <div className="grid gap-4">
                  {filteredArticles.map((article) => (
                    <Card key={article.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getTypeColor(article.type)}>
                                <div className="flex items-center space-x-1">
                                  {getTypeIcon(article.type)}
                                  <span className="capitalize">{article.type}</span>
                                </div>
                              </Badge>
                              <Badge variant="outline">{article.category}</Badge>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 cursor-pointer">
                              {article.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 mb-3">{article.description}</p>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{article.readTime}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span>{article.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-4 w-4" />
                                <span>{article.views} views</span>
                              </div>
                              <span>Updated {article.lastUpdated}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                              {article.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <Button variant="ghost" size="icon" onClick={() => handleEditArticle(article)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteArticle(article.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleBookmark(article.id)}
                              className={bookmarkedArticles.includes(article.id) ? "text-yellow-500" : ""}
                            >
                              <Bookmark
                                className={`h-4 w-4 ${bookmarkedArticles.includes(article.id) ? "fill-current" : ""}`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLikeArticle(article.id)}
                              className={userLikedArticles.includes(article.id) ? "text-blue-600" : ""}
                            >
                              <ThumbsUp
                                className={`h-4 w-4 ${userLikedArticles.includes(article.id) ? "fill-current" : ""}`}
                              />
                              <span className="ml-1 text-xs">Like ({articleLikes[article.id] || 0})</span>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleCommentArticle(article.id)}>
                              <MessageCircle className="h-4 w-4" />
                              <span className="ml-1 text-xs">Comment ({articleComments[article.id] || 0})</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                              <span className="ml-1 text-xs">Share</span>
                            </Button>
                          </div>

                          <Button variant="default" size="sm" onClick={() => handleReadArticle(article)}>
                            Read Article
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="articles">
                <div className="grid gap-4">
                  {filteredArticles
                    .filter(article => article.type === "article")
                    .map((article) => (
                      <Card key={article.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge className={getTypeColor(article.type)}>
                                  <div className="flex items-center space-x-1">
                                    {getTypeIcon(article.type)}
                                    <span className="capitalize">{article.type}</span>
                                  </div>
                                </Badge>
                                <Badge variant="outline">{article.category}</Badge>
                              </div>

                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 cursor-pointer">
                                {article.title}
                              </h3>

                              <p className="text-gray-600 dark:text-gray-400 mb-3">{article.description}</p>

                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{article.readTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span>{article.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <TrendingUp className="h-4 w-4" />
                                  <span>{article.views} views</span>
                                </div>
                                <span>Updated {article.lastUpdated}</span>
                              </div>

                              <div className="flex flex-wrap gap-2 mt-3">
                                {article.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Button variant="default" size="sm" onClick={() => handleReadArticle(article)}>
                              Read Article
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="guides">
                <div className="grid gap-4">
                  {filteredArticles
                    .filter(article => article.type === "guide")
                    .map((article) => (
                      <Card key={article.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge className={getTypeColor(article.type)}>
                                  <div className="flex items-center space-x-1">
                                    {getTypeIcon(article.type)}
                                    <span className="capitalize">{article.type}</span>
                                  </div>
                                </Badge>
                                <Badge variant="outline">{article.category}</Badge>
                              </div>

                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 cursor-pointer">
                                {article.title}
                              </h3>

                              <p className="text-gray-600 dark:text-gray-400 mb-3">{article.description}</p>

                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{article.readTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span>{article.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <TrendingUp className="h-4 w-4" />
                                  <span>{article.views} views</span>
                                </div>
                                <span>Updated {article.lastUpdated}</span>
                              </div>

                              <div className="flex flex-wrap gap-2 mt-3">
                                {article.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Button variant="default" size="sm" onClick={() => handleReadArticle(article)}>
                              Read Article
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="videos">
                <div className="grid gap-4">
                  {filteredArticles
                    .filter(article => article.type === "video")
                    .map((article) => (
                      <Card key={article.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge className={getTypeColor(article.type)}>
                                  <div className="flex items-center space-x-1">
                                    {getTypeIcon(article.type)}
                                    <span className="capitalize">{article.type}</span>
                                  </div>
                                </Badge>
                                <Badge variant="outline">{article.category}</Badge>
                              </div>

                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 cursor-pointer">
                                {article.title}
                              </h3>

                              <p className="text-gray-600 dark:text-gray-400 mb-3">{article.description}</p>

                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{article.readTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span>{article.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <TrendingUp className="h-4 w-4" />
                                  <span>{article.views} views</span>
                                </div>
                                <span>Updated {article.lastUpdated}</span>
                              </div>

                              <div className="flex flex-wrap gap-2 mt-3">
                                {article.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Button variant="default" size="sm" onClick={() => handleReadArticle(article)}>
                              Watch Video
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="faq">
                <div className="grid gap-4">
                  {filteredArticles
                    .filter(article => article.type === "faq")
                    .map((article) => (
                      <Card key={article.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge className={getTypeColor(article.type)}>
                                  <div className="flex items-center space-x-1">
                                    {getTypeIcon(article.type)}
                                    <span className="capitalize">{article.type}</span>
                                  </div>
                                </Badge>
                                <Badge variant="outline">{article.category}</Badge>
                              </div>

                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 cursor-pointer">
                                {article.title}
                              </h3>

                              <p className="text-gray-600 dark:text-gray-400 mb-3">{article.description}</p>

                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{article.readTime}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span>{article.rating}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <TrendingUp className="h-4 w-4" />
                                  <span>{article.views} views</span>
                                </div>
                                <span>Updated {article.lastUpdated}</span>
                              </div>

                              <div className="flex flex-wrap gap-2 mt-3">
                                {article.tags.map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <Button variant="default" size="sm" onClick={() => handleReadArticle(article)}>
                              Read FAQ
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
