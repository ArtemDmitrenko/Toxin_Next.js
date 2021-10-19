import styles from './rulesList.module.scss';

type RulesListProps = {
  rulesHeader: string,
  rulesList: Array<{ id: string, title: string }>
};

const RulesList = ({ rulesHeader = '', rulesList = [] }: RulesListProps) => (
  <div className={styles.container}>
    <h2 className={styles.header}>{rulesHeader}</h2>
    <ul className={styles.list}>
      {
        rulesList.map(({ id, title }) => (
          <li className={styles.item} key={id}>
            {title}
          </li>
        ))
      }
    </ul>
  </div>
);

export default RulesList;
