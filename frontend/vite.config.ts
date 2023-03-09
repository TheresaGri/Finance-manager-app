/// <reference types="vitest" />
import { defineConfig } from 'vite';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';

const vitestConfig: VitestUserConfigInterface = {
  test: {
    // vitest config, with helpful vitest typing :)
  }
};

export default defineConfig({
  test: vitestConfig.test,
  // and now: just vite config
});
