
from django.shortcuts import render
from .models import  Invoice

def index(request):
    return render(request, 'index.html')

def add_item_to_cart(request):
    if request.method == 'POST':
        item_name = request.POST.get('item-name')
        item_price = request.POST.get('item-price')
        customer_name = request.POST.get('customer-name')
        bill_number = request.POST.get('bill-number')

        invoice = Invoice(
            bill_number=bill_number,
            customer_name=customer_name,
            item_name=item_name,
            item_price=item_price
        )
        invoice.save()

    return render(request, 'index.html')



def save_invoice(request):
    if request.method == "POST":
        bill_number = request.POST.get("bill_number")
        customer_name = request.POST.get("customer_name")
        item_name = request.POST.get("item_name")
        item_price = request.POST.get("item_price")

        invoice = Invoice(
            bill_number=bill_number,
            customer_name=customer_name,
            item_name=item_name,
            item_price=item_price
        )
        invoice.save()

    return render(request, 'index.html')





