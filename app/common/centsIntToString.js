
/*
  converts stripe 'amounts' to presentable strings. E.g. 1599 => '15.99'
 */
export default (centsInt) => {
  let amountPlaceholder = centsInt.toString().split('');
  amountPlaceholder.reverse();
  amountPlaceholder.splice(2, 0, '.');
  amountPlaceholder.reverse();
  amountPlaceholder = amountPlaceholder.join('');
  return amountPlaceholder
}