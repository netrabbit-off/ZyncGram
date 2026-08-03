# ZyncGram

[![zync.jpg](https://i.postimg.cc/5N4LDWXg/zync.jpg)](https://postimg.cc/s1LMZ89G)
[![zync2.jpg](https://i.postimg.cc/tJYyVgrc/zync2.jpg)](https://postimg.cc/T5MBzTvj)

**Zync** — это приложение для управления Telegram-юзерботом через мобильный интерфейс. Проект состоит из серверной части на **Go** и мобильного клиента на **React Native (Expo)**.

---

## Содержание

- [**Основные возможности**](#основные-возможности)
- [**Технологический стек**](#технологический-стек)
- [**Установка и запуск**](#установка-и-запуск)
  - [**Настройка**](#настройка)
  - [**Установка Redis**](#установка-redis-debianubuntu)
  - [**Запуск**](#запуск)
  - [**Мобильное приложение**](#мобильное-приложение)
- [**Обзор команд юзербота**](#обзор-команд-юзербота)
  - [**Антиспам**](#антиспам)
- [**Структура проекта**](#структура-проекта)

---

## Основные возможности

- 📱 **Мобильное управление** – интуитивный интерфейс с тёмной темой.
- 🤖 **Полный контроль над юзерботом** – запуск, остановка, настройка поведения.
- 🛡️ **Встроенный антиспам**
- 😄 **Автоматические реакции**
- 📊 **Статистика активности** – отслеживание количества обработанных сообщений и других метрик.

## Технологический стек

### Сервер (Backend)
- **Go**
- **Gin**
- **[GoGram](https://github.com/AmarnathCJD/gogram)**
- **Redis**

### Мобильное приложение (Frontend)
- **React Native** + **Expo** – кросс-платформенная разработка.
- **AsyncStorage** – локальное хранение настроек.
- **Навигация** – вкладки (главная, статистика, настройки).

---

## Установка и запуск

Клонирование репозитория
```sh
git clone https://github.com/netrabbit-off/ZyncGram.git
```
```sh
cd ZyncGram/backend
```
Копируем файл конфигурации
```sh
cp .env-example .env
```

### Настройка
**.env:**
```
APP_ID=111111
APP_HASH=31c------------------------eprst
PHONE=+78005553535

AUTH_TOKEN=secretT0ken
REDIS_ADDR=localhost:6379

PORT=8080
```
- **APP_ID**, **APP_HASH** – стандартные Telegram данные, берутся [здесь](https://my.telegram.org)
- **PHONE** – номер телефона аккаунта Telegram
- **AUTH_TOKEN** – придумайте сами, токен для авторизации позже понадобится в мобильном приложении.
- **REDIS_ADDR** – если все делать по инструкции ниже, менять не придётся.
- **PORT** – менять без необходимости не нужно.
---

### Установка Redis (Debian/Ubuntu)

#### Установка и запуск Redis
```sh
sudo apt update
sudo apt install -y redis-server
sudo systemctl enable --now redis-server
sudo systemctl status redis-server
```

#### Проверка
```sh
redis-cli ping
```
Если **PONG** – идём дальше.

#### Включаем AOF
```sh
sudo cp /etc/redis/redis.conf /etc/redis/redis.conf.bak

sudo sed -i \
  -e 's/^appendonly .*/appendonly yes/' \
  -e 's/^# *appendfsync .*/appendfsync everysec/' \
  /etc/redis/redis.conf

sudo systemctl restart redis-server
sudo systemctl status redis-server
```

#### Проверка
```sh
redis-cli CONFIG GET appendonly
```

Ожидаем:
```
1) "appendonly"
2) "yes"
```

---

### Запуск
#### Установим Golang
```sh
sudo apt install golang-go
```

Запустим скрипт в первый раз локально.
```sh
go mod download
go run cmd/userbot/main.go
```
Скрипт попросит код подтверждения Telegram – вводим его.
После авторизации выключаем **CTRL-C**

#### Проверям создался ли файл сессии
```sh
ls -la session.dat
```

---

#### Установка Docker
```sh
sudo apt install ca-certificates gnupg curl
```
**Ubuntu:**
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
**Debian:**
```sh
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

**Установка (Общая для Debian и Ubuntu)**
```sh
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin
```

**Установка Docker Compose**
```sh
sudo mkdir -p /usr/local/lib/docker/cli-plugins/
sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/lib/docker/cli-plugins/docker-compose
sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
```

**Проверям**
```sh
docker compose version
```

---

#### Запускаем сервер через Docker
```sh
docker-compose build
docker-compose up -d
```

---

### Мобильное приложение

1) Скачать и установить **.apk** файл с последнего релиза
2) Открываем приложение **Zync**

[![zync3.jpg](https://i.postimg.cc/jjZK9nCJ/zync3.jpg)](https://postimg.cc/4K7rHd6J)

- Адрес сервера – вводим **http://[адрес вашего сервера]:[порт указанный в .env]**. Изначально – **8080**
- Токен авторизации – **AUTH_TOKEN**, который вы ввели в **.env**

3) Нажимаем **Подключиться**

---

## Обзор команд юзербота

- ``/ping`` – проверка работоспособности + время отклика

[![ping.jpg](https://i.postimg.cc/Pr3RBbMd/ping.jpg)](https://postimg.cc/BXFpFKyz)

- ``/stats``, ``/стата`` – статистика чата за последние 5000 сообщений. Количество сообщений от **каждого участика**, топ самых используемых слов. **Не рекомендуется к запуску в крупном групповом чате**

- ``/info``, ``/инфа`` – показывает информацию о чате и сообщении, может быть как просто сообщением, так и ответом на сообщение.

[![info.jpg](https://i.postimg.cc/HLh5mxhr/info.jpg)](https://postimg.cc/3y2WCK7h)

- Анимированный смех – не требует команду, запускается автоматически, можно отключить в приложении **Zync** (**``Настройки -> Настроить автоматику -> Смех``**)

[![laugh.gif](https://i.postimg.cc/x17xx03m/laugh.gif)](https://postimg.cc/Sn6fjb5Q)

- Анимация ключевых слов – не требует команду, запускается автоматически, можно отключить в приложении **Zync** (**``Настройки -> Настроить автоматику -> Анимация``**)

[![animate.gif](https://i.postimg.cc/fyZY2PPv/animate.gif)](https://postimg.cc/ft23k8D3)

### Антиспам

Автоматически блокирует пользователей, которые пишут слишком быстро, под прицел не попадают контакты.
Можно отключить в приложении Zync (**``Настройки -> Настройки автоматики -> Антиспам``**)

---

## Структура проекта

```
├── cmd
│   └── userbot
│       └── main.go            # Точка входа
├── internal
│   ├── api
│   │   ├── controllers        # Обработчики API ручек
│   │   │   ├── bot.go
│   │   │   ├── profile.go
│   │   │   ├── settings.go
│   │   │   └── stats.go
│   │   ├── middlewares
│   │   │   └── auth.go        # Мидлтварь для проверки авторизации
│   │   └── router.go          # Структура роутера
│   ├── bot
│   │   ├── antispam.go
│   │   ├── client.go          # Структура Telegram клиента
│   │   ├── handlers.go        # Обработчики команд
│   │   └── registry.go
│   ├── config
│   │   └── config.go          # Парсер конфига из .env
│   ├── repository
│   │   └── redis              # Redis-репозиторий
│   │       ├── client.go
│   │       └── stats.go
│   └── service                # Бизнес-логика
│       ├── bot_service
│       │   └── bot.go
│       ├── profile
│       │   └── profile.go
│       ├── settings.go
│       └── stats.go
├── pkg
│   ├── dictionary             # Map-константы
│   │   ├── censored.go        # Словарь с матами (для определения)
│   │   └── ignored.go
│   ├── models
│   │   ├── response.go        # Шаблон http ответа
│   │   └── settings.go        # Модель настроек
│   └── utils                  # Доп. утилиты
│       └── string.go
└── session.dat
```
