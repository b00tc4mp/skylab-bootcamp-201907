const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (day, breakfast, lunch, snack, dinner) {

  return (async () => {
    const response = await fetch(`${REACT_APP_API_URL}/days`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${this.__token__}`
      },
      body: JSON.stringify({ day, breakfast, lunch, snack, dinner })
    })

    if (response.status !== 201) {
      const { error } = await response.json()

      throw Error(error)
    }
  })()
}