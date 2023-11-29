import os
import environ
from .base import *
#import django_heroku


env = environ.Env()
env.read_env()

#django_heroku.settings(locals())

DEBUG = False
SECRET_KEY = env("DJANGO_SECRET_KEY")
ALLOWED_HOSTS = ["https://aegis-admu.vercel.app","https://aegis.ateneo.edu","https://aegis-admin.netlify.app/", "aegis-admin.netlify.app", "aegis-dj.ateneo.edu", "aegis-backend.herokuapp.com", "localhost", "https://aegis-backend.netlify.app", "https://aegis-admin-gamma.vercel.app", "https://aegis-admin.ateneo.edu"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "PORT": env("POSTGRES_PORT"),
        "HOST": env("POSTGRES_HOST"),
        "NAME": env("POSTGRES_DB"),
        "USER": env("POSTGRES_USER"),
        "PASSWORD": env("POSTGRES_PASSWORD"),
        "ATOMIC_REQUESTS": True,
    }
}
#ALLOWED_HOSTS = ["35.220.166.96"]
CORS_ORIGIN_WHITELIST = ["https://aegis-admu.vercel.app","https://aegis.ateneo.edu", "https://aegis-admin.netlify.app/", "aegis-admin.netlify.app", "https://aegis.ateneo.edu", "aegis-backend.herokuapp.com", "https://aegis-backend.netlify.app", "https://aegis-admin-gamma.vercel.app", "https://aegis-admin.ateneo.edu"]
CORS_ALLOW_CREDENTIALS = True

SENDGRID_API_KEY = env("SENDGRID_API_KEY")
# print(env("SENDGRID_API_KEY"))
# CHANGE
DEFAULT_FROM_EMAIL = env("FROM_EMAIL")

ACCOUNT_ADAPTER = "accounts.adapter.DefaultAccountAdapterCustom"
# CHANGE
URL_FRONT = "https://aegis.ateneo.edu/"


SESSION_COOKIE_SECURE = True
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {"require_debug_false": {"()": "django.utils.log.RequireDebugFalse"}},
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(module)s "
            "%(process)d %(thread)d %(message)s"
        }
    },
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "root": {"level": "INFO", "handlers": ["console"]},
    "loggers": {
        "django.request": {"handlers": [], "level": "ERROR", "propagate": True,},
        "django.security.DisallowedHost": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": True,
        },
    },
}
