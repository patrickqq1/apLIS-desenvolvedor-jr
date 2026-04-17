import styles from "./card.module.css";

export const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};

// CardHeader.jsx

export const CardHeader = ({ children }) => {
  return <div className={styles.cardHeader}>{children}</div>;
};

// CardBody.jsx

export const CardBody = ({ children }) => {
  return <div className={styles.cardBody}>{children}</div>;
};

// CardFooter.jsx

export const CardFooter = ({ children }) => {
  return <div className={styles.cardFooter}>{children}</div>;
};
