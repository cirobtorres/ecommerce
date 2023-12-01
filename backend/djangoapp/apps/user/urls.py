from django.urls import path

from . import views


app_name = 'user'

urlpatterns = [
    path(route='all', view=views.UserView.as_view()),
]
