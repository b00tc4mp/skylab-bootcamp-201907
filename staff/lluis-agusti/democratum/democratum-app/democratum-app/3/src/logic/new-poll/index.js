const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus) { 

    return (async () => {

        const response = await fetch(`${REACT_APP_API_URL}/polls`, {
            method: 'post',
            headers: { 
                'content-type': 'application/json',
                'authorization': `bearer ${this.__token__}`
            },
            body: JSON.stringify({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus })
        })

        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}