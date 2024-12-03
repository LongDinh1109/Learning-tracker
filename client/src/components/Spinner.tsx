import styles from '../styles/components/spinner.module.css';

interface SpinnerProps {
  size?: number; // Allow customization of the spinner size
  color?: string; // Allow customization of the spinner color
}

const Spinner = ({ size = 50, color = '#007bff' }: SpinnerProps) => {
  return (
    <div
      className={styles.spinner}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${size / 12}px`,
        borderTopColor: color,
      }}
    ></div>
  );
};

export default Spinner;
