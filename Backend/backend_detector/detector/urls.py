
from django.urls import path
from .views import analyze_website

urlpatterns = [
    path('analyze/', analyze_website),

]