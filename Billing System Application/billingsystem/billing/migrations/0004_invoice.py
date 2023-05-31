# Generated by Django 4.2 on 2023-05-30 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billing', '0003_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bill_number', models.IntegerField()),
                ('customer_name', models.CharField(max_length=255)),
                ('item_name', models.CharField(max_length=255)),
                ('item_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('invoice_date', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
