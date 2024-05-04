import { resetBalance } from './balance';
import { resetEvent } from './event';
import { resetUser } from './user';

export const resetEverything = () => {
  resetBalance();
  resetEvent();
  resetUser();
};
