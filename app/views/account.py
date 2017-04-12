import json
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout, authenticate, login
from django.shortcuts import HttpResponseRedirect, HttpResponse, render

from app.forms.login import LoginForm
from app.models.models import UserProfile

@login_required
def log_out(request):
    logout(request)
    return HttpResponseRedirect('/')


def log_in(request):
    if request.method == 'POST':
        login_form = LoginForm(data=request.POST)
        if login_form.is_valid():
            response = {}
            data = {}
            user = authenticate(username=request.POST['login_username'], password=request.POST['login_password'])
            if user:
                if user.is_active:
                    login(request, user)
                    data['url'] = "http://%s%s" % (request.get_host(), '/')
                    response['success'] = 'success'
                    response['data'] = data
                    return HttpResponse(json.dumps(response), content_type='application/json')
                else:
                    # User is not active
                    data['errors'] = ["Your Account is disabled"]
                    response['data'] = data
                    response['failed'] = 'failed'
                    return HttpResponse(json.dumps(response), content_type='application/json')

            else:
                data['errors'] = ["Invalid login information"]
                response['data'] = data
                response['failed'] = 'failed'
                return HttpResponse(json.dumps(response), content_type='application/json')
    else:
        user_form = UserForm()
        login_form = LoginForm()
        return render(request, 'public/home.html', {'user_form': user_form, 'login_form': login_form})


def ajax_request_key(request):
    if request.method == 'GET':
        response = {}
        data = {}
        data['request_key'] = UserProfile.objects.get(user=request.user.id).request_key
        response['data'] = data
        response['success'] = 'success'
        return HttpResponse(json.dumps(response), content_type='application/json')


    print "ajax get req"