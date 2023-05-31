from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add_item_to_cart/', views.add_item_to_cart, name='add_item_to_cart'),
    path('save-invoice/', views.save_invoice, name='save_invoice'),
]