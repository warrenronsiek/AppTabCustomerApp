/**
 * Created by warren on 7/5/17.
 */
import {toLength} from 'lodash'

export default function passwordValidator(password) {
  if (password) {
    const hasLength = password.length >= 8,
      hasSymbol = !!password.match(/[\[\].,\/#!$%\^&\*;:{}=\-_`~()\?@]/),
      hasDigit = !!password.match(/\d/),
      hasUpper = !!password.match(/[A-Z]/),
      hasLower = !!password.match(/[a-z]/),
      isValid = hasLength && hasDigit && hasUpper && hasLower && hasSymbol;
    return {
      hasLength,
      hasSymbol,
      hasDigit,
      hasUpper,
      hasLower,
      isValid
    };
  }
}