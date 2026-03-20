Тестовое задание — таблица с CRUD операциями, сортировкой, поиском и адаптивным дизайном.

## 🚀 Демо

[Ссылка на деплой (Vercel)](https://test-table-seven.vercel.app/)

## 📋 Функциональность

- Добавление, редактирование, удаление записей
- Валидация формы (все поля обязательны)
- Сортировка по всем колонкам (имя, дата, значение)
- Поиск по таблице с debounce (lodash)
- Уведомления о действиях (Ant Design message)
- Подтверждение удаления
- Полосатая таблица (zebra stripes) с hover-эффектом
- Адаптивная верстка (мобильные, планшеты, десктоп)
- TypeScript

## 🛠️ Технологии

- **React**
- **TypeScript**
- **Vite** — сборка
- **Ant Design** — UI-компоненты
- **dayjs** — работа с датами
- **lodash** — debounce для поиска
- **CSS Modules** — стилизация

## 🏗️ Структура проекта

src/
├── App.tsx
├── main.tsx
├── types.ts
├── components/
│ ├── TableComponent/
│ │ ├── TableComponent.tsx
│ │ └── TableComponent.module.css
│ ├── ActionsCell/
│ │ ├── ActionsCell.tsx
│ │ └── ActionsCell.module.css
│ ├── ItemForm/
│ │ ├── ItemForm.tsx
│ │ └── ItemForm.module.css
│ └── SearchAndAdd/
│ ├── SearchAndAdd.tsx
│ └── SearchAndAdd.module.css
└── hooks/
└── useTableData.ts

## 🚀 Запуск проекта

```bash
# Клонировать репозиторий
git clone https://github.com/Mikhail8815/test-table.git

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
```

📦 Сборка
```bash
npm run build
```

✨ Особенности

Кастомный хук useTableData — вся бизнес-логика вынесена из компонента

Debounce 500мс — поиск не дёргает таблицу при каждом символе

Адаптив — на мобильных устройствах поиск и кнопка располагаются вертикально, таблица имеет горизонтальный скролл

Типизация — все функции и пропсы строго типизированы, отсутствует any

📝 Требования из ТЗ
Таблица с колонками: Имя, Дата, Число, Действия

Кнопка "Добавить" — открывает модалку с формой

Валидация полей

Добавление новой строки

Редактирование строки

Удаление строки

Сортировка по всем колонкам 

Поиск по таблице 

Использование lodash (debounce) — показано

Деплой на Vercel

👤 Автор
Михаил Горленко
Telegram: @mikhail8815
GitHub: https://github.com/Mikhail8815
