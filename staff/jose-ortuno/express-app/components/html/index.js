function Html(content) {
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Express App</title>
                <link rel="stylesheet" href="/style.css">
                <link href="https://fonts.googleapis.com/css?family=Lato:400,400i|Lobster&display=swap" rel="stylesheet">
                <script src="https://kit.fontawesome.com/b4f0834533.js"></script>
            </head>
            <body>
                ${content}
            </body>
        </html>`
}

module.exports = Html