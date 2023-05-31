from django.db import models

# class Customer(models.Model):
#     name = models.CharField(max_length=255)

#     def __str__(self):
#         return self.name

# class Item(models.Model):
#     name = models.CharField(max_length=255)
#     price = models.DecimalField(max_digits=10, decimal_places=2)

#     def __str__(self):
#         return self.name

# class BillingRecord(models.Model):
#     customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
#     bill_number = models.IntegerField()
#     items = models.ManyToManyField(Item)

#     def __str__(self):
#         return str(self.bill_number)


class Invoice(models.Model):
    bill_number = models.IntegerField()
    customer_name = models.CharField(max_length=255)
    item_name = models.CharField(max_length=255)
    item_price = models.DecimalField(max_digits=10, decimal_places=2)
    invoice_date = models.DateField(auto_now_add=True)
