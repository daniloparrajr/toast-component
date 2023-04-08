import {useContext} from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { ToastContext } from "../../providers/ToastProvider";

function ToastShelf() {
  const {toasts, handleDismissToast } = useContext(ToastContext);
  const filteredToasts = toasts.filter(toast => toast.hidden !== true);

  return (
    <ol className={styles.wrapper}>
      {filteredToasts.map(({id, variant, message})=>(
        <li key={id} className={styles.toastWrapper}>
          <Toast onDismiss={() => handleDismissToast(id)} variant={variant}>{message}</Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
