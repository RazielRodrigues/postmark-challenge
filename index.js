const http = require('node:http')

const server = http.createServer({}, async (req, res) => {
    try {

        const postmark = req.body || {};

        console.log('Postmark data:', postmark);
 
/*         const responseDevTo = await fetch("https://dev.to/api/articles", {
            method: "POST",
            headers: {
                "api-key": process.env.DEV_TO_TOKEN,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "article": {
                    "title": 'TESTE',
                    "body_markdown": 'TESTE',
                    "published": false,
                }
            }),
        });

        const responseData = await responseDevTo.json();  */

        res.writeHead(200, {'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'});
        res.end(JSON.stringify(postmark));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ error: error.message }));
    }
});

server.listen(3001, "localhost");
console.log("Listening: http://localhost:3001");