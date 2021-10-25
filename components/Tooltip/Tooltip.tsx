import { useState } from 'react';

import styles from './tooltip.module.scss';

const Tooltip = ({ text = '' }: { text: string }) => {
  const [isActive, setActive] = useState(false);

  const handleIconFocus = () => setActive(true);
  const handleIconBlur = () => setActive(false);

  return (
    <span className={styles.container}>
      <button
        className={styles.icon}
        type="button"
        aria-label="info icon"
        onMouseOver={handleIconFocus}
        onMouseOut={handleIconBlur}
        onFocus={handleIconFocus}
        onBlur={handleIconBlur}
      />
      {isActive && <span className={styles.tooltip}>{text}</span>}
    </span>
  );
};

export default Tooltip;
