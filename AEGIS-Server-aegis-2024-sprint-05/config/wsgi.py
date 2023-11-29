"""
WSGI config for aegis_backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os
import time 
import traceback 
import signal 
import sys 

from django.core.wsgi import get_wsgi_application

sys.path.append('/home/aegis-user/aegis-server')
#sys.path.append('/home/aegis-user/aegis-server/config/wsgi.py') 
# adjust the Python version in the line below as needed 
sys.path.append('/home/aegis-user/aegis-server/env/lib/python3.6/site-packages') 

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')
application = get_wsgi_application()
try: 
    application = get_wsgi_application()
    print("Hello WOlrd")
except Exception: 
    # Error loading applications
    print("Error") 
    if 'mod_wsgi' in sys.modules: 
        traceback.print_exc() 
        os.kill(os.getpid(), signal.SIGINT) 
        time.sleep(2.5) 
