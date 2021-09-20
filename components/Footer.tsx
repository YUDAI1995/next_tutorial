import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="inner">
        <small>&copy; 2021 YUDAI1995</small>
      </div>
    </footer>
  );
};

export default Footer;
