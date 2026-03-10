import Image from 'next/image';
import styles from './Logo.module.css';

export function Logo() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.ring} aria-hidden="true" />
      <div className={styles.inner}>
        <Image
          src="/images/avatar.jpeg"
          alt=""
          fill
          sizes="44px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
