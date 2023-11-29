# Environment Setup

Clone **all** the repos.
For each repo, make sure you are in the following branches:
- AEGIS-Server: `aegis-2024-develop`
- aegis-admin: `main`
- AEGIS-Frontend: `develop`

## Backend

1. Create a python virtual environment through any method.
2. Install requirements.txt located in `requirements/local.txt`

## Frontend

3. In admin-frontend, delete package-lock.json.
4. Install requirements for frontend through `yarn` or `npm`. (Yarn is preferred in existing README)
5. Do the same for AEGIS-frontend.

## `.env`

5. Put the .env file in `config/settings/.env`.

Make sure it has the following fields:

```
SECRET_KEY=TEMPKEYAEGISSERVER
DB_NAME=aegis2024
DB_USER=
DB_PW=
DB_HOST=localhost
DB_PORT=5432
SENDGRID_API_KEY=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
FROM_EMAIL=justin.carlo.reyes@obf.ateneo.edu
```

`SENDGRID_API_KEY` will not be used for the meantime, it is just to get through reading the 
environment variables since we will be temporarily disabling verification functionality.

Set up the database with PostgreSQL.

```sql
CREATE DATABASE aegis2024;
```

# Starting Up Servers

`python manage.py migrate`

`python manage.py runserver`

`yarn start`

# Creating Accounts

## Create Super User

`python manage.py createsuperuser`

## Create User

The API endpoint for creating an account is `/auth/registration`.

When creating an account, make sure the username is an ID number that starts with 1 or 2, 
and use an OBF email for the email.

Temporarily disable email verification through `config/settings/base.py` and change the following value:

`ACCOUNT_EMAIL_VERIFICATION = 'none'`

You should now be able to login and access `localhost:3000`.

## Giving User Access to AEGIS-admin

Through `/backend/`, make sure the user has `is_staff` checked.

# Troubleshooting

Database issues through `./manage.py runserver`; ask other backend ppl

If there is a problem with the frontend, try commenting out / deleting 
all instances of `<ReactNotification />` from App.jsx located in `admin-frontend/src/`.

`webpack` issues in AEGIS-Frontend: replace first line with

```js
const withPWA = require('next-pwa')({
  dest: 'public',
});
```


