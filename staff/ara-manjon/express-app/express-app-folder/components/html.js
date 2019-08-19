function Html(content) {
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>EXPRESS-APP</title>
                <link rel="stylesheet" href="/style.css">
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap" rel="stylesheet">
                
                <link rel="icon" href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/apple/198/front-facing-baby-chick_1f425.png">
            </head>
            <body>
                ${content}
            </body>
        </html>`
}

module.exports = Html