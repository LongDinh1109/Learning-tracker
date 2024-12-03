import React, { ReactNode } from "react";
import styles from "../styles/components/form.module.css";
interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  error?: string;
}

const Form = ({
  children,
  onSubmit,
  className,
  header,
  footer,
  error,
}: FormProps) => {
  return (
    <div className={styles.container}>
      {header && <div className={styles.header}>{header}</div>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
        className={className + " " + styles.form}
      >
        {children}
      </form>
      {error && <div className={styles.error}>{error}</div>}
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Form;
