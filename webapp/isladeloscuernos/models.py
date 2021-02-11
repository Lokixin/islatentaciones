from django.db import models

# Create your models here.

class Pareja(models.Model):
    novio = models.CharField(max_length=100)    # Nombre del novio
    novia = models.CharField(max_length=100)    # Nombre de la novia
    foto = models.CharField(max_length=100)     # Nombre de la imagen de pareja
    tiempo = models.CharField(max_length=100)   # Años de relación
    votos = models.IntegerField(default=0)      # Número de votos  


class Soltero(models.Model):
    nombre = models.CharField(max_length=100)       # Nombre del soltere
    ciudad = models.CharField(max_length=100)       # Ciudad del soltere
    profesion = models.CharField(max_length=100)    # Trabajo del soltere
    foto = models.CharField(max_length=100)         # Foto del soltere
    edad = models.IntegerField(default=0)           # Edad del soltere 
    votos = models.IntegerField(default=0)          # Votos del soltere    


class Soltera(models.Model):
    nombre = models.CharField(max_length=100)       # Nombre del soltere
    ciudad = models.CharField(max_length=100)       # Ciudad del soltere
    profesion = models.CharField(max_length=100)    # Trabajo del soltere
    foto = models.CharField(max_length=100)         # Foto del soltere
    edad = models.IntegerField(default=0)           # Edad del soltere 
    votos = models.IntegerField(default=0)          # Votos del soltere   
