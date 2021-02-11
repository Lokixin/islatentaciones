# Generated by Django 3.1.6 on 2021-02-10 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pareja',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('novio', models.CharField(max_length=100)),
                ('novia', models.CharField(max_length=100)),
                ('foto', models.CharField(max_length=100)),
                ('tiempo', models.CharField(max_length=100)),
                ('votos', models.IntegerField(default=0)),
            ],
        ),
    ]
