
/**
 * checks if user is logged in, retruns a boolean
 */

export default function () {
    return !!this.__token__
}