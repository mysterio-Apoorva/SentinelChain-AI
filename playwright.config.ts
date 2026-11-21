import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir:'./tests', testMatch:'browser.spec.ts', timeout:60000, use:{ channel:'msedge', headless:true }, workers:1, reporter:'list' });
