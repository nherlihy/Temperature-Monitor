from django.conf.urls import url
from app.views import public, account, device

urlpatterns = [
	url(r'^$', public.home, name='home'),
	url(r'^logout', account.log_out, name='logout'),
	url(r'^login', account.log_in, name='login'),
	url(r'^ajax/request_key', account.ajax_request_key, name='request_key'),
	url(r'^ajax/get_devices', device.ajax_get_devices, name='get_devices'),
	url(r'^ajax/add_device', device.ajax_add_device, name='add_device'),
]