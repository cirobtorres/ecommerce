from django.http import HttpRequest, HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import CustomUser
from .serializers import UserSerializer


class UserView(APIView):
    
    model = CustomUser

    def get_queryset(self):
        return self.model.objects.all().order_by('id')
    
    def get(self, request: HttpRequest) -> HttpResponse:
        user_model = self.get_queryset()
        serializer = UserSerializer(user_model, many=True)
        return Response(serializer.data)