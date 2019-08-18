function Html(content) {
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                
                <link rel="stylesheet" href="/style.css" type="text/css">
                <link href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans|Titillium+Web&display=swap" rel="stylesheet">
                <link rel="icon" href="favicon.ico" type="image/x-icon" />
               
                <title>Document</title>
               
            </head>
            
            <body class="wrapper">
                ${content}
            </body>
        </html>`
}

module.exports = Html