import styles from './radioButton.module.scss';

type RadioButtonProps = {
  name: string,
  value: string,
  content: string,
  isDefaultChecked?: boolean,
};

const RadioButton = (props: RadioButtonProps) => {
  const {
    name,
    value,
    content,
    isDefaultChecked = false,
  } = props;

  return (
    <label className={styles.radioButton}>
      <input
        className={styles.input}
        type="radio"
        name={name}
        value={value}
        defaultChecked={isDefaultChecked}
      />
      <div className={styles.content}>{content}</div>
    </label>
  );
};

export default RadioButton;
