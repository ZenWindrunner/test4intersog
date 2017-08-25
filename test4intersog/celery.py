from __future__ import absolute_import

import os
import requests
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'test4intersog.settings')

app = Celery('test4intersog')
app.config_from_object('django.conf:settings')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

@app.task
def get_media_tags(count):
    access_token = settings.USER_ACCESS_TOKEN
    count = count
    url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token={}&count={}'.format(access_token, count)
    resp = requests.get(url)
    resp_json = resp.json()
    media_objects = resp_json['data']
    urls_media = [obj['images']['standard_resolution']['url'] for obj in media_objects]
    tags_media = [obj['tags'] for obj in media_objects]
    tags = list(set(reduce(lambda x, y: x + y, tags_media)))
    media = zip(urls_media, tags_media)
    result = {'tags': tags,
              'media': media,
              }

    return result
