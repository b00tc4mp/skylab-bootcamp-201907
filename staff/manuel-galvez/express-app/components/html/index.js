const Footer = require('../footer')

function Html(content) {
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link rel="stylesheet" type="text/css" href="/style.css" />
                <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css?family=Roboto:300&display=swap" rel="stylesheet">
                <title>Document</title>
            </head>
            <body>
                <div class="wrapper">
                    ${content}
                    ${Footer()}
                </div>
            </body>
        </html>`
}

module.exports = Html