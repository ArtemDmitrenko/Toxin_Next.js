import style from './button.module.scss';

type BtnProps = {
  text: string,
  btnType: 'withBorder' | 'gradient',
};

const Button = (props: BtnProps) => {
  const { text, btnType } = props;
  const classes = [style.btn, style[btnType]];

  return (
    <button type="button" className={classes.join(' ')}>{text}</button>
  );
};

export default Button;
