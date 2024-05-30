from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Contact


@api_view()
@permission_classes([IsAuthenticated])
def hello_world(request):
    return Response({"message": "Hello, world!"})

@api_view(['POST'])
def handle_contact_request(request):
    if request.method == 'POST':
        email = request.GET.get('email')
        username = request.GET.get('username')

        if email and username:
            # Сохраняем данные в базу данных
            contact = Contact(email=email, username=username)
            contact.save()

            return JsonResponse({'message': 'Данные успешно сохранены в базе данных.'})
        else:
            return JsonResponse({'error': 'Отсутствуют email или username в запросе.'}, status=400)
    else:
        return JsonResponse({'error': 'Метод запроса не поддерживается.'}, status=405)
