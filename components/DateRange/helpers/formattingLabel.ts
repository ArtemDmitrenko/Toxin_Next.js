type FormattingLabelProps = {
  label: string,
  view: string,
};

const formattingLabel = ({ label, view }: FormattingLabelProps): string => {
  if (view === 'month') {
    const formattedLabel = `${label.slice(0, (label.length - 3))}`;
    return formattedLabel;
  }
  return label;
};

export default formattingLabel;
