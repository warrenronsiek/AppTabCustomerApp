/**
 * Created by warren on 7/4/17.
 */

export default function phoneNumberHandler(phoneNumber) {
  const stripped = phoneNumber.replace(/[\s()\-]/g, ''),
    length = stripped.length;
  if  (length <= 3) {
    return stripped.replace(/(\d{1,3})/, '($1');
  } else if ((length > 3) && (length < 7)) {
    return stripped.replace(/(\d{1,3})(\d{1,3})/, '($1) $2');
  } else {
    return stripped.replace(/(\d{1,3})(\d{1,3})(\d{1,4})/, '($1) $2-$3');
  }
}