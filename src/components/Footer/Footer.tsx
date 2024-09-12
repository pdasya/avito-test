import { FC } from "react";
import styles from "./Footer.module.scss";
import githubImage from "/github.png";
import ylabImage from "/avito.png";

const Footer: FC = () => {
  return (
    <div className={styles.footerWrapper}>
      <a href="https://github.com/pdasya" className={styles.footerGithub}>
        <img
          src={githubImage}
          alt="github image"
          className={styles.footerGithubImage}
        ></img>
        pdasya
      </a>
      <p className={styles.footerYear}>2024</p>
      <a href="https://start.avito.ru/tech" className={styles.footerAvito}>
        <img
          src={ylabImage}
          alt="avito image"
          className={styles.footerAvitoImage}
        ></img>
      </a>
    </div>
  );
};

export default Footer;
