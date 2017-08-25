# Test4intersog

This is a test application for Intersog. The purpose of the app is to get 'n' latest media with tags from Instagram account.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

Start Redis on localhost. If Redis is not running on localhost:6379 add a configuration file test4intersog/settings.py with

```
REDIS_HOST = 'redis.example.org'
REDIS_PORT = '6379'
```

Install packages with

```
pip install -r requirements.txt
```

Start celery worker from root of the project:

```
celery worker -A test4intersog -l info
```

## Start application
To start application on localhost:8000 from root of the project run:

```
cd test4intersog; ./manage.py runserver
```




