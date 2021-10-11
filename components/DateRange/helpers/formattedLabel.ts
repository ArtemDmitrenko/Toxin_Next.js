type FormattedLabelProps = {
  label: string,
  view: string,
};

const formattedLabel = ({ label, view }: FormattedLabelProps): string => {
  if (view === 'month') return `${label.slice(0, (label.length - 3))}`;
  return label;
};

export default formattedLabel;
