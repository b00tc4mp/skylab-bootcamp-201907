import { validate } from 'menu-planner-utils'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**Function that register a new day with four meals
 * @param {String} day  Day to be selected
 * @param {String} breakfast Meal of the day
 * @param {String} lunch Meal of the day
 * @param {String} snack Meal of the day
 * @param {String} dinner Meal of the day
 * @throws {Error} 'KO' Error that is thrown when an API error has ocurried
 * @return agree new day in API
 */
//day='', breakfast='', lunch='', snack='', dinner=''
export default function (day='', breakfast='', lunch='', snack='', dinner='') {

  validate.string(day,'day')
  validate.string(breakfast,'breakfast')
  validate.string(lunch,'lunch')
  validate.string(snack,'snack')
  validate.string(dinner,'dinner')
  
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