# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-12 14:16
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_device_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='device',
            old_name='user',
            new_name='user_profile',
        ),
    ]
