from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):

    # Ensure each member and request_id combination is unique
    class Meta:
        unique_together = (('user', 'request_id'),)

    user = models.OneToOneField(User)
    request_key = models.CharField(default='None', max_length=32)

    def __str__(self):
        return "%s" % self.user

class Device(models.Model):
	user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="devices")
	name = models.CharField(default="newDevice", max_length=32, unique=True)

class Temperature(models.Model):
	device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name='temperatures')
	temperature = models.DecimalField(max_digits=5, decimal_places=2)
	date = models.DateTimeField(auto_now=False, auto_now_add=True)