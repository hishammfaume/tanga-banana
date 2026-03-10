import * as migration_20260310_211432_init from './20260310_211432_init';

export const migrations = [
  {
    up: migration_20260310_211432_init.up,
    down: migration_20260310_211432_init.down,
    name: '20260310_211432_init'
  },
];
