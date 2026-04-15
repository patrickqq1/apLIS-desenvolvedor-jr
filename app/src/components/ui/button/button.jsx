import styles from "./Button.module.css";

const Button = ({ children, type = "button", disabled = false, onClick }) => {
  return (
    <button
      className={styles.button}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
