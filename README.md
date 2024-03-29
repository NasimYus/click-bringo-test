# Click | Bringo | Test project

Испонитель: **Насим Юсупов**

## Структура папок

- `public` -- статические некомпилируемые файлы проекта
- `src/assets` -- компилируемые файлы ассетов
- `src/components` -- переиспользуемые компоненты
- `src/router` -- Маршрутизатор
- `src/layouts` -- Компоненты обертки
- `src/infrastructure` -- инфраструктура, отвечающая за работу с эндпоинтами бэка. Содержит определение инстанса axios
- `src/store` -- локальное хранилище проекта (Pinia)
- `src/utils` -- переиспользуемые функции
- `src/views` -- компоненты страниц
- `src/App.vue` -- корневой компонент приложения
- `src/main.ts` -- точка входа проекта

## Требования к среде разработки

- [NodeJS](https://nodejs.org/) - версия 18
- [NPM](https://www.npmjs.com/) - обычно поставляется вместе с NodeJS, рекомендуется версия 9.5.1


## Начало работы

### Шаг 1

Для установки зависимостей переходим в корневую директорию проекта и запускаем команду:

```sh
npm i
```

### Шаг 2

Для того, чтобы запустить локальный фронт разработки выполните команду:

```sh
npm run serve
```

### Шаг 3

Теперь нужно запустить локальный сервер. Для этого откройте новый терминал и выполните команду:

```sh
npm run db:serve
```

Готово!








