import logic from '../index'
import call from '../../utils/call/index'

const updateUser = function(data) {
    const { id, token } = sessionStorage

    return call(
      `http://localhost:8080/api/users/${id}`, 
      'put', 
      { 
        "Content-Type": "application/json",
        'Authorization': `${token}` 
      }, 
      data
    )
    .then(response => {
      if (response.status === 400) throw new Error(response.error)
      return response
  })
}

export default updateUser