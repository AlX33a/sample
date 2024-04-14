echo "Making migrations"
python3 manage.py makemigrations

echo "Applying migrations"
python3 manage.py migrate

if [ "$ENVIRONMENT" = "DEV" ]; then

echo "Creating superuser from compose ENV vars"
python3 manage.py createsuperuser --noinput --email admin@ad.min

echo "Starting development server"
python3 manage.py runserver 0.0.0.0:81

elif [ "$ENVIRONMENT" = "PROD" ]; then

echo "Collecting static files"
python3 manage.py collectstatic --noinput

echo "Running gunicorn"
gunicorn --bind 0.0.0.0:8000 main.wsgi:application --timeout 1000 --workers  16

fi