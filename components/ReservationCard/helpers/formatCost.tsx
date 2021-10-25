const formatCost = (cost: number): string => (
  cost.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
);

export default formatCost;
