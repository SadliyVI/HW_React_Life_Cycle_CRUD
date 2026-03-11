# Домашнее задание к занятию React: Жизненный цикл и HTTP

## CRUD (React + Vite + TypeScript)

[![Deploy to GitHub Pages](https://github.com/SadliyVI/HW_React_Life_Cycle_CRUD/actions/workflows/main.yml/badge.svg)](https://github.com/SadliyVI/HW_React_Life_Cycle_CRUD/actions/workflows/main.yml)

CRUD-приложение для заметок с HTTP-запросами без перезагрузки страницы.
> Важно: В онлайн-демо на GitHub Pages backend по умолчанию недоступен, т.к. `localhost:7070` работает только на локальном компьютере.
> Для полноценной работы нужно задеплоить backend и указать его адрес в `VITE_API_URL` (см. .env.production),
> либо запустить backend локально.

## Возможности

- Загрузка списка заметок (GET `/notes`)
- Добавление заметки (POST `/notes`)
- Удаление заметки (DELETE `/notes/:id`)
- Ручное обновление списка (кнопка refresh)
- Обработка состояний загрузки/ошибок
- Валидация: запрет отправки пустой заметки

## Структура

- `src/` — фронтенд
- `backend/` — backend (Express) + `api.rest`

## Запуск проекта локально

### Вариант A: одной командой (frontend + backend)

>npm i
>npm run backend:install
>npm run dev:all
>
>Backend: <http://localhost:7070/notes/>
>Frontend (Vite): обычно <http://localhost:5173/>

### Вариант B: в двух терминалах

1) Backend

>cd backend
>npm i
>npm start
>Backend: <http://localhost:7070/notes/>

1) Frontend

>npm i
>npm run dev
>Frontend (Vite): обычно <http://localhost:5173/>

## Online demo

[![Online demo](public/demo.jpg)](https://sadliyvi.github.io/HW_React_Life_Cycle_CRUD/)
