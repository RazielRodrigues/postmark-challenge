const http = require('node:http')
const postmarkEmail = require("postmark");

const server = http.createServer({}, async (req, res) => {
    try {

        let body = '';
        req.on('data', chunk => {body += chunk.toString();});
        await new Promise(resolve => req.on('end', resolve));
        let postmark = {};
        if (body) {
            try {
                postmark = JSON.parse(body);
            } catch (e) {
                console.log('Failed to parse body:', e);
            }
        }

        let subject = postmark.Subject;

        // Get Tags
        const match = subject.match(/tags:\s*([^)]+)/);
        let tags = null;
        if (match) {
            tags = match[1].trim().split(' ').filter(Boolean).map(tag => tag.replace(/^#/, ''));
            subject = subject.replace(/\s*\(tags:.*\)/, '').trim();
        }

        const devTo = await fetch("https://dev.to/api/articles", {
            method: "POST",
            headers: {
                "api-key": process.env.DEV_TO_TOKEN,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "article": {
                    "title": subject || 'Draft',
                    "body_markdown": postmark.TextBody || 'Draft',
                    "published": true,
                    "tags": tags
                }
            }),
        });

        const responseDevTo = await devTo.json();
        const { url } = responseDevTo;
        const client = new postmarkEmail.ServerClient(process.env.POSTMARK_TOKEN);

        if (devTo.ok) {
            client.sendEmail({
                "From": process.env.SENDER_EMAIL,
                "To": process.env.SENDER_EMAIL,
                "Subject": "Article " + postmark.Subject + " Published successfuly!",
                "TextBody": "Your article has been Published : " + url
            });
        } else {
            client.sendEmail({
                "From": process.env.SENDER_EMAIL,
                "To": process.env.SENDER_EMAIL,
                "Subject": "Article " + postmark.Subject + " Publish error!",
                "TextBody": "Some error happened to Publish the article : " + responseDevTo.error
            });
        }

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': process.env.CORS_ORIGIN });
        res.end(JSON.stringify({responseDevTo}));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': process.env.CORS_ORIGIN });
        res.end(JSON.stringify({ error: error.message }));
    }
});

server.listen(3001, "localhost");
console.log("Listening: http://localhost:3001"); 