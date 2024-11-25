'use client';

import styles from './page.module.css';
import TestComponent from '@/components/testComponent';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <TestComponent />
      </main>
    </div>
  );
}
