const Price = ({ price, currency = '€' }) => {
  const [prefix, value] = price;

  if (prefix !== 'p' || isNaN(value)) {
    return '?';
  }
  return <>{currency.repeat(value)}</>;
};

export default Price;
