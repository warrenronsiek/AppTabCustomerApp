/**
 * Created by warren on 7/5/17.
 */

export default function passwordValidator(password) {
  if (password) {
    return (
      (password.length >= 8) &&
      (!!password.match(/[\[\].,\/#!$%\^&\*;:{}=\-_`~()\?@]/)) &&
      (!!password.match(/[A-Z]/)) &&
      (!!password.match(/\d/))
    )
  } else {
    return false
  }
}