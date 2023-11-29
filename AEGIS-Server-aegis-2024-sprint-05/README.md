# Aegis Server

Aegis Server is the backend for AEGIS. This deals with their new application.

## Setup

1. Create a python environment with [virtualenv](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/) or [anaconda](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html) 

2. Activate the newly created virutal environment.

3. Setup a postgresql database. [Mac](https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb) [Windows](https://www.microfocus.com/documentation/idol/IDOL_12_0/MediaServer/Guides/html/English/Content/Getting_Started/Configure/_TRN_Set_up_PostgreSQL.htm) 
   
4. Create a new `.env` file in the `config/settings` folder. Template is in `.env.example`. 
  
5. Install dependencies with `pip install -r requirements/local.txt`.

6. Create a superuser with `python manage.py createsuperuser` 

7. Migrate database with `python manage.py migrate` 

8. Start development server with `python manage.py runserver`


## Development

```python
python manage.py runserver
```

## Testing

```python
coverage run manage.py test
```

### Generate a testing report:

```python
coverage html --omit="admin.py"
```

### Possible testing bugs

```bash
Creating test database for alias 'default'...
Got an error creating the test database: permission denied to create database
```

Fix this by running: `ALTER USER your_database_user CREATEDB;` in the `psql` shell.
