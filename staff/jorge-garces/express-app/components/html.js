function Html(content) {
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link rel="stylesheet" type="text/css" href="/style.css" />
                <link href="https://fonts.googleapis.com/css?family=Barrio|Roboto&display=swap" rel="stylesheet">
                <title>Document</title>
            </head>
            <body>
                ${content}
            </body>
            <script src="https://kit.fontawesome.com/0ebe3f9bf2.js"></script>
        </html>`
}

module.exports = Html