import { test, expect } from '@playwright/test';

test.describe('Automation Test Store - Финальные тесты', () => {

  // Общий таймаут для медленного сайта
  test.setTimeout(90000);

  test.beforeEach(async ({ page }) => {
    await page.goto('https://automationteststore.com/', { waitUntil: 'domcontentloaded' });
  });

 test('Добавление товара в корзину через карточку', async ({ page }) => {
     // 1. Идем на страницу товара
     await page.goto('https://automationteststore.com/index.php?rt=product/product&product_id=50');

     // 2. Ждем именно ту кнопку, которую ты нашла на скриншоте
     // Ищем ссылку с классом cart, внутри которой есть текст Add to Cart
     const addToCartBtn = page.locator('a.cart:has-text("Add to Cart")');

     await expect(addToCartBtn).toBeVisible({ timeout: 15000 });

     // Кликаем (используем dispatchEvent - это надежнее для ссылок со скриптами onclick)
     await addToCartBtn.dispatchEvent('click');

    // 3. Ждем перехода в корзину
        await page.waitForURL(/.*checkout\/cart/, { waitUntil: 'domcontentloaded',
                                                        timeout: 20000 });

        // Проверки
        await expect(page.locator('.maintext')).toContainText('Shopping Cart');

        // Исправленный локатор: ищем таблицу, которая содержит заголовки корзины (Image/Name)
        const cartTable = page.getByRole('table').filter({ hasText: 'Image' });
        await expect(cartTable).toContainText('Skinsheen');
   });

  test('Переход по категориям меню (Обувь)', async ({ page }) => {
    // Навигация через категории
    await page.hover('nav.subnav >> text=Apparel & accessories');
    await page.click('text=Shoes');

    await expect(page.locator('.maintext')).toHaveText('Shoes');
    // Проверяем, что товары загрузились
    await expect(page.locator('.fixed_wrapper').first()).toBeVisible();
  });

  test('Проверка страницы контактов', async ({ page }) => {
    // Прямой переход для стабильности
    await page.goto('https://automationteststore.com/index.php?rt=content/contact');

    await page.fill('#ContactUsFrm_first_name', 'Ulyana');
    await page.fill('#ContactUsFrm_email', 'test@example.com');
    await page.fill('#ContactUsFrm_enquiry', 'Тестовое сообщение для лабораторной работы.');

    await page.click('button[title="Submit"]');

    // Проверка финального сообщения
    await expect(page.locator('.contentpanel')).toContainText('successfully sent');
  });

});