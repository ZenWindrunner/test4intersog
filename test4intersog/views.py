# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.http import HttpResponse
from django.shortcuts import render
import json

from .celery import get_media_tags


def home(request):
    context = {}

    return render(request, "index.html", context)


def init_media(request, count=None):
    count = int(count)
    task_id = get_media_tags.delay(count)
    get_task_id = request.GET.get('get_task_id', None)
    if get_task_id == True:
        return HttpResponse(json.dumps(task_id))

    context = {'task_id': task_id,
               'count': count,
               }

    return render(request, "result.html", context)


def result_media(request):
    task_id = request.GET.get('task_id', None)
    results = get_media_tags.AsyncResult(task_id)
    if results.ready():
        context = {'results': results.get()}
        return HttpResponse(json.dumps(context))

    return HttpResponse(status=204)





