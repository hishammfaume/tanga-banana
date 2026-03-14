import * as migration_20260310_211432_init from './20260310_211432_init';
import * as migration_20260314_123059 from './20260314_123059';

export const migrations = [
  {
    up: migration_20260310_211432_init.up,
    down: migration_20260310_211432_init.down,
    name: '20260310_211432_init',
  },
  {
    up: migration_20260314_123059.up,
    down: migration_20260314_123059.down,
    name: '20260314_123059'
  },
];
