This is a submission for the [Postmark Challenge: Inbox Innovators](https://dev.to/challenges/postmark).

## What I Built

I created **Dev.to Email Publisher**, a handy tool that lets developers post articles to the Dev.to platform straight from their email inbox! Powered by Postmark’s inbound email feature and integrated with the Dev.to API, this project showcases a practical way to streamline content creation. It’s a simple yet reusable solution that can be adapted for other platforms or used as-is for Dev.to. My goal was to make publishing as easy as sending an email, saving time for busy developers who want to share their ideas quickly.

## Demo
- **Clone the repostitory**: [Repostiory](https://github.com/RazielRodrigues/postmark-challenge)
- **Connect Dev.to**: Add your Dev.to API key (found in Dev.to settings under “Extensions”).
- **Send Test Email**: From your inbox, send to your email registered in postmark inbound:
- **Subject**: `Post: [Your Article Title]`
- **Subject**: `Post: [Your Article Title (tags: webdev programming php)]`
- **Body**: Markdown content
- **Check Response**: You’ll get a confirmation email from Postmark with an success or error of the publication.

### How It Works
1. **Compose Email**: Write your article in Markdown format and send it to the app’s designated email address (provided after setup).
2. **Postmark Processing**: Postmark’s inbound webhook captures the email and parses its content.
3. **Dev.to Publishing**: The app formats the email content and uses the Dev.to API to publish the article.
4. **Email Notification**: Receive a confirmation email via Postmark with the publication status or any errors.

## Code Repository

Explore the code: [github.com/RazielRodrigues/postmark-challenge](https://github.com/RazielRodrigues/postmark-challenge)

### Setup Instructions
To run locally, clone the repo and configure the `.env` file with:
- `SENDER_EMAIL`: An email registered with your domain.
- `DEV_TO_TOKEN`: Your Dev.to API key (get it from [Dev.to Settings > Extensions](https://dev.to/settings/extensions)).
- `POSTMARK_TOKEN`: Your Postmark API key (available at [Postmark Account > Tokens](https://account.postmarkapp.com)).

The README includes detailed setup steps.

## How I Built It

### Development Process
I kicked off by exploring Postmark’s inbound webhook and Dev.to’s API documentation. My approach was straightforward:
1. **API Setup**: Generated a Dev.to API key and configured Postmark’s webhook for inbound emails.
2. **Backend**: Built a Node.js server to handle email parsing, API requests, and user feedback.
3. **Email Workflow**: Parsed incoming emails to extract Markdown content and metadata, then sent them to Dev.to via its API.
4. **Notifications**: Used Postmark’s API to send confirmation emails to users.
5. **Deployment**: Deployed the app on Vercel for a smooth, scalable demo.

### Tech Stack
- **Backend**: Node.js
- **Deployment**: Vercel
- **APIs**: Dev.to API (publishing), Postmark Inbound Webhooks (email processing), Postmark API (notifications)
- **Email Client**: Postmark for sending confirmations

### Further improvement
- **Image Attachments**: Add images attachments into the post using email attachments
- **Edit Tools**: Ability to use the other tools for editing posts using the email

### Experience
Working with Postmark was nice! Their clear documentation and intuitive setup let me build the core functionality in under two hours. The inbound webhook was easy to configure, and the API for sending emails was reliable. This project convinced me to explore Postmark for future email-driven apps—it’s fast, developer-friendly, and perfect for this kind of innovation.

## Thanks for Participating!
This hackathon was a blast, and I’m thrilled to share my project. Thanks to Postmark for the awesome tools and to the Dev.to community for the inspiration!