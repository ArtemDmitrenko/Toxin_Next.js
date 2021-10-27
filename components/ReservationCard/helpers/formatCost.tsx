const formatCost = (cost: number): string => (
  cost.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
);

export default formatCost;
