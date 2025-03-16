# Generated by Django 4.2.19 on 2025-03-16 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("orders", "0007_alter_order_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="status",
            field=models.CharField(
                choices=[("P", "Preparing"), ("C", "Finished"), ("X", "Awaiting")],
                default="P",
                max_length=1,
            ),
        ),
    ]
