# Запуск фронтенда
Перед началом работы необходимо перейти в папку frontend
```
cd frontend
```
Затем установить все необходимые зависимости
```
npm install
```
Далее можно запускать проект
```
npm run dev
```
# Запуск бекенда
Перед началом работы необходимо установить [Docker]("https://www.docker.com/products/docker-desktop/")
```
cd backend
```
После установки необходимо зайти в папку backend и запустить docker compose up (или docker-compose up, если первая команда не сработает)
```
cd backend
docker compose up # or docker-compose up
```
Затем можно переходить на http://localhost. Там будет крутиться REST API.

# Правила работы с гитом
## Commit flow
https://www.notion.so/Git-Flow-bce1e8a417114a11aee0a8d11feb0ddf?pvs=4
## Алгоритм взаимодействия с репозиторием
1. На странице issue в linear копируете имя ветки, чекаутитесь на неё и работаете в ней, создаём её всегда из main ветки!
```
git checkout -b <имя_ветки>
```
2. Перед сообщением в коммите добавляем issue id из linear
```
git commit -m "TEX-14: initial commit" # пример коммита
```
3. После завершения работы пушите результат работы в свою ветку, после чего кидаете запрос на pull request в main ветку на гитхабе и указываете ревьюеров 
```
git push origin <имя_ветки>
```
4. Ждете апрув от двух человек
