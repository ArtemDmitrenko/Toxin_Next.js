import styles from './subscribe.module.scss';

type SubscribeProps = {
  action: string,
};

const Subscribe = (props: SubscribeProps) => {
  const { action } = props;
  const { container, input, buttonArrow } = styles;

  return (
    <form method="post" action={action}>
      <div className={container}>
        <input className={input} type="email" name="email" placeholder="Email" />
        <button className={buttonArrow} type="submit" name="subscribe" aria-label="button for submitting a subscription form" />
      </div>
    </form>
  );
};

export default Subscribe;
