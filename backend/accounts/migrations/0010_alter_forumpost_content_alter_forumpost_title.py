# Generated by Django 5.1.1 on 2024-10-12 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_forumpost'),
    ]

    operations = [
        migrations.AlterField(
            model_name='forumpost',
            name='content',
            field=models.TextField(max_length=500),
        ),
        migrations.AlterField(
            model_name='forumpost',
            name='title',
            field=models.CharField(max_length=100),
        ),
    ]
