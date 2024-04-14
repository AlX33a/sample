import os
from datetime import timedelta
from pathlib import Path

from .utils import strtobool

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv(
    "DJANGO_SECRET_KEY",
    "django-insecure-3&!7^1akqquti54005p=i!ox#!du4$2r$5tu^qw56ey5s17pmq",
)

DEBUG = strtobool(os.getenv("DJANGO_DEBUG", "True"))

ADMIN_URL = os.getenv("DJANGO_ADMIN_URL", "admin")

ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "*").split(",")

CSRF_TRUSTED_ORIGINS = os.getenv(
    "DJANGO_CSRF_TRUSTED_ORIGINS", "http://localhost:81"
).split(",")

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTOCOL', 'http')

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.postgres",
    "django.contrib.sites",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth.registration",
    "dj_rest_auth",
    "corsheaders",
    "drf_spectacular",
    "rest_framework",
    "rest_framework.authtoken",
    "feed",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = "main.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "main.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DJANGO_DATABASE_NAME", "db"),
        "USER": os.getenv("DJANGO_DATABASE_USER", "root"),
        "PASSWORD": os.getenv("DJANGO_DATABASE_PASSWORD", "root"),
        "HOST": os.getenv("DJANGO_DATABASE_HOST", "db"),
        "PORT": "5432",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "ru-ru"

TIME_ZONE = "Europe/Moscow"

USE_I18N = True

USE_TZ = True

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

STATIC_URL = "static/"
STATIC_ROOT = "static/"

MEDIA_URL = "media/"
MEDIA_ROOT = "media/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

SITE_ID = 1

#######################################################################################
# DRF SETTINGS
#######################################################################################
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
    'rest_framework.permissions.AllowAny',

    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "dj_rest_auth.jwt_auth.JWTCookieAuthentication",
    ),
}

#######################################################################################
# DJ REST AUTH SETTINGS
#######################################################################################
REST_AUTH = {
    "USE_JWT": True,
    "JWT_AUTH_COOKIE": "my-app-auth",
    "JWT_AUTH_REFRESH_COOKIE": "my-refresh-token",
}

#######################################################################################
# SIMPLEJWT SETTINGS
#######################################################################################
ACCESS_TOKEN_LIFETIME_MIN = float(os.getenv("DJANGO_ACCESS_TOKEN_LIFETIME_MIN", 30))
REFRESH_TOKEN_LIFETIME_DAY = float(os.getenv("DJANGO_REFRESH_TOKEN_LIFETIME_DAY", 1))
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=ACCESS_TOKEN_LIFETIME_MIN),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=REFRESH_TOKEN_LIFETIME_DAY),
}

#######################################################################################
# CORS SETTINGS
#######################################################################################
CORS_ALLOW_ALL_ORIGINS = strtobool(os.getenv("DJANGO_CORS_ALLOW_ALL_ORIGINS", "True"))

CORS_ALLOWED_ORIGINS = os.getenv(
    "DJANGO_CORS_ALLOWED_ORIGINS", "http://localhost:81"
).split(",")

SPECTACULAR_SETTINGS = {
    "TITLE": "MAIN API",
    "DESCRIPTION": "Тестовый сервис",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "COMPONENT_SPLIT_REQUEST": True,
    "SCHEMA_PATH_PREFIX": r"/api",
}
