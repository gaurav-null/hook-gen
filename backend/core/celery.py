import os
from celery import Celery
# Set default Django settings module for 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
app = Celery('core')
# Load settings from Django settings using namespace 'CELERY'
app.config_from_object('django.conf:settings', namespace='CELERY')
# Automatically discover tasks in all installed apps (looks for tasks.py)
app.autodiscover_tasks()