from django.contrib.auth import get_user_model
import os

User = get_user_model()
User.objects.create_superuser(os.environ["DJANGO_SUPERUSER_PASSWORD"], 'admin@ad.min', os.environ["DJANGO_SUPERUSER_USERNAME"])