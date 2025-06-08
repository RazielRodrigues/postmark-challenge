const http = require('node:http')

const server = http.createServer({}, async (req, res) => {
    try {

        const postmark = req.body || {};
        console.log('Postmark data:', postmark);

        const devTo = await fetch("https://dev.to/api/articles", {
            method: "POST",
            headers: {
                "api-key": process.env.DEV_TO_TOKEN,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "article": {
                    "title": postmark.Subject || 'Draft',
                    "body_markdown": postmark.TextBody || 'Draft',
                    "published": true,
                }
            }),
        });

        const responseDevTo = await devTo.json();
/*         const { url } = responseDevTo;
        const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

        client.sendEmail({
            "From": process.env.SENDER_EMAIL,
            "To": process.env.SENDER_EMAIL,
            "Subject": "Article " + postmark.Subject + " Published successfuly!",
            "TextBody": "Your article has been Published : " + url
        }); */

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': process.env.CORS_ORIGIN });
        res.end(JSON.stringify(responseDevTo));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': process.env.CORS_ORIGIN });
        res.end(JSON.stringify({ error: error.message }));
    }
});

server.listen(3001, "localhost");
console.log("Listening: http://localhost:3001");