const http = require('node:http')

const server = http.createServer({}, async (req, res) => {
    const devTo = process.env.DEV_TO_TOKEN;

    const tokenResponse = await fetch("https://dev.to/api/articles/?username=razielrodrigues", {
        method: "GET",
        //headers: {
        //    "Authorization": "Basic {credentials}",
        //    "Content-Type": "application/x-www-form-urlencoded",
        //},
        //body: new URLSearchParams("grant_type=authorization_code&refresh_token=xxx&client_id=OC-AZLzpxR9SXd1&client_secret=cnvcaIbMrsN8SiRu1DHIXoJnLAq-SETqjDbbhZvgGIG9LJd87a6a3c37"),
    });

    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
    res.end(JSON.stringify(tokenResponse))
})

server.listen(3001, "localhost")
console.log("Listening: http://localhost:3001")
