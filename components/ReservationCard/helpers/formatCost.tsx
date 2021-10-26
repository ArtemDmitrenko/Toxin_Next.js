const formatCost = (cost: number): string => (
  cost.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1\u00A0')
);

export default formatCost;
