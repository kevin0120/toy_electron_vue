import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/');
  await page.goto('http://127.0.0.1:3000/#/');
  await page.getByText('test page').click();
  await page.getByText('test page曲线分析工位监控曲线叠加box分析设置参考曲线统计分析').click();
  await page.getByRole('list').click();
});
