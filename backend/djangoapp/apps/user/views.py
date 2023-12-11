from django.http import HttpRequest, HttpResponse
from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, UpdateSerializer


# class UserView(APIView):
    
#     model = CustomUser

#     def get_queryset(self):
#         return self.model.objects.all().order_by('id')
    
#     def get(self, request: HttpRequest) -> HttpResponse:
#         user_model = self.get_queryset()
#         serializer = UserSerializer(user_model, many=True)
#         return Response(serializer.data)


class RegisterView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = []
    serializer_class = RegisterSerializer
    model = get_user_model()
    http_method_names = ['post']
    validator = ...


class LoginView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = []
    serializer_class = LoginSerializer
    model = get_user_model()
    http_method_names = ['post']
    # validator = ...

    def post(self, request: HttpRequest) -> HttpResponse:
        login_data = request.data.get('email') if 'email' in request.data else request.data.get('cpf')
        password = request.data.get('password')

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = self.model.objects.get(email=serializer.data.get('email'))
            # user = self.model.objects.get(email=serializer.data.get('cpf'))

            refresh = RefreshToken.for_user(user)
            access = AccessToken.for_user(user)

            return Response({
                'refresh': str(refresh),
                'access': str(access),
            })

        return Response(serializer.errors)


class UpdateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = []
    serializer_class = UpdateSerializer
    model = get_user_model()
    http_method_names = ['put']
    validator = ...