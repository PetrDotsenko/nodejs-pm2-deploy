# Деплой приложения на сервер с использованием pm2

Проект по автоматизации деплоя фронтенда и бэкенда при помощи pm2 (pm2 deploy)

IP адрес 158.160.188.252 
Frontend https://mesto-front.students.nomorepartiessbs.ru 
Backend https://mesto-back.students.nomorepartiessbs.ru

P.S. не понимаю, почему вы не видите краш-тест, привожу логи:
user@fv4e54qrobt6oagqd2gf:~/apps/nodejs-pm2-deploy$ ss -tnlp | grep ':3000' || true
LISTEN 0      511                *:3000            *:*    users:(("node",pid=501284,fd=21))
user@fv4e54qrobt6oagqd2gf:~/apps/nodejs-pm2-deploy$ curl -v http://127.0.0.1:3000/crash-test || true
*   Trying 127.0.0.1:3000...
* connect to 127.0.0.1 port 3000 from 127.0.0.1 port 37872 failed: Connection refused
* Failed to connect to 127.0.0.1 port 3000 after 0 ms: Couldn't connect to server
* Closing connection
curl: (7) Failed to connect to 127.0.0.1 port 3000 after 0 ms: Couldn't connect to server
user@fv4e54qrobt6oagqd2gf:~/apps/nodejs-pm2-deploy$ ss -tnlp | grep ':3000' || true
LISTEN 0      511                *:3000            *:*    users:(("node",pid=501345,fd=21))

Процесс упал и PM2 его перезапустил (видно: curl вернул Connection refused, а ss сразу показал новый PID). И в app.ts бэкэнда содержится необходимый роут на краш-тест.
