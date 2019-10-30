from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt


def index(req):
    if req.method == 'GET':
        return HttpResponse("OK")
    return HttpResponse(req.body)


@csrf_exempt
def update_basket(req):
    if req.method == 'POST':
        print(req.body)
        # Ideally send back proper responses
        return HttpResponse("OK")
