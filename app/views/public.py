import json, uuid

from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import HttpResponse

from app.forms.user_signup import UserForm
from app.forms.login import LoginForm
from app.models.models import UserProfile

def home(request):
	if request.method == 'POST':
	    response = {}
	    data = {}
	    user_form = UserForm(data=request.POST)

	    if user_form.is_valid():
	        user = user_form.save()
	        user.set_password(user.password)
	        user.save()

	        user = authenticate(username=request.POST['username'], password=request.POST['password'])
	        login(request, user)

	        profile = UserProfile.objects.create(user=user, request_key=uuid.uuid4().hex)

	        data['url'] = "http://%s" % request.get_host()
	        response['data'] = data
	        response['success'] = 'success'

	    else:
	        errors = user_form.errors.as_json()
	        data['errors'] = errors
	        response['data'] = data
	        response['failed'] = 'failed'

	    return HttpResponse(json.dumps(response), content_type='application/json')

	elif request.user.is_authenticated and request.user.username != '':
		return render(request, "dashboard.html")

	user_form = UserForm()
	login_form = LoginForm()
	return render(request, "public/home.html", {"user_form" : user_form, "login_form" : login_form})




