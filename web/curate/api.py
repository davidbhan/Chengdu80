from django.http import HttpResponse


def index(req):
    if req.method == 'GET':
        return HttpResponse("OK")
    return HttpResponse(req.body)
