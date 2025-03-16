# Generated by Django 4.2.19 on 2025-03-16 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("orders", "0006_remove_order_created_at_remove_order_items_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="status",
            field=models.CharField(
                choices=[("P", "Pending"), ("C", "Completed"), ("X", "Cancelled")],
                default="P",
                max_length=1,
            ),
        ),
    ]
