import json

from django.shortcuts import HttpResponse
from django.db import IntegrityError
from django.core import serializers

from app.models.models import Device, UserProfile

def ajax_add_device(request):
	if request.method == 'POST':
		response = {}
		data = {}
		device_name = request.POST['name']

		if not device_name:
			data['errors'] = "Device Name cannot be blank"
			response['data'] = data
			response['failed'] = 'failed'
			return HttpResponse(json.dumps(response), content_type='application/json')

		try:
			user_profile = UserProfile.objects.get(user=request.user)
			Device.objects.create(user_profile=user_profile, name=device_name)
			response['success'] = 'success'

		except IntegrityError as e:
			data['errors'] = "Device Name already exsists"
			response['data'] = data
			response['failed'] = 'failed'
		
		return HttpResponse(json.dumps(response), content_type='application/json')

def ajax_get_devices(request):
	if request.method == 'GET':
		response = {}
		data = {}
		user_profile = UserProfile.objects.get(user=request.user)
		# devices = serializers.serialize("json", user_profile.devices.all(), fields=('user_profile','name', 'temperatures'))

		data['devices'] = []
		for device in user_profile.devices.all():
			device_json = {}
			device_json['temperatures'] = []
			device_json['id'] = device.id
			device_json['name'] = device.name
			device_json['profile_id'] = device.user_profile.id
			for temp in device.temperatures.all():
				temp_json = {}
				temp_json['id'] = temp.id
				temp_json['temperature'] = float(temp.temperature)
				temp_json['date'] = temp.date.strftime("%Y-%m-%d %H:%M:%S")
				device_json['temperatures'].append(temp_json)
			data['devices'].append(device_json)

		response['data'] = data
		response['success'] = 'success'

		return HttpResponse(json.dumps(response), content_type='application/json')



