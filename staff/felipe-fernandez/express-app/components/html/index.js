function Html(content) {
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
                <link rel="stylesheet" type="text/css" href="/style.css" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
                <link href="https://fonts.googleapis.com/css?family=Playfair+Display&display=swap" rel="stylesheet">
            </head>
            <body>
            <h1>E-duck express app</h1>
                ${content}
            </body>
        </html>`
}

module.exports = Html