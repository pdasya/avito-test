import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage: React.FC = () => {
  return (
    <main className={styles.notFound}>
      <section className={styles.notFoundWrap}>
        <p className={styles.head}>
          4
          <span>
            <img
              src="/error.svg"
              alt="page not found"
              width={170}
              height={200}
            />
          </span>
          4
        </p>
        <h2 className={styles.h2head}>Страница не найдена</h2>
        <p className={styles.message}>
          Извините, но запрашиваемая страница не существует.
        </p>
        <Link className={styles.linkToHome} to="/">
          Вернуться на главную
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
