# Generated by Django 4.2.19 on 2025-03-16 14:15

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("orders", "0003_remove_order_items_order_items"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="order",
            name="items",
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.DeleteModel(
            name="OrderItem",
        ),
    ]
