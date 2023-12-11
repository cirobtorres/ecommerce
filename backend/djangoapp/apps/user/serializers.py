from rest_framework.serializers import ModelSerializer

from .models import CustomUser


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['is_staff', 'is_superuser']


class LoginSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['is_staff', 'is_superuser']


class UpdateSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['is_staff', 'is_superuser']