# DL2026_Spring_FQA_Kazak

Автоматизированные end-to-end тесты для сайта **Automation Test Store** на **Playwright + TypeScript**.

## Быстрый запуск
### 1. Клонировать репозиторий
```bash
git clone https://github.com/kazakulyana58-dot/DL2026_Spring_FQA_Kazak.git
cd DL2026_Spring_FQA_Kazak
```
### 2. Установить зависимости
```Bash 
npm install
```
### 3. Установить браузеры Playwright (выполнить один раз)
```Bash
npx playwright install --with-deps
```
### 4. Запуск тестов
| Команда                    | Что делает                                              |
|----------------------------|---------------------------------------------------------|
| `npm test`                 | Запуск всех тестов (headless)                           |
| `npm run test:headed`      | Запуск тестов с видимым браузером                       |
| `npm run test:ui`          | Интерактивный режим Playwright UI (рекомендуется)       |
| `npm run test:report`      | Открыть красивый HTML-отчёт                             |
| `npm run test:debug`       | Запуск в режиме отладки                                 |
