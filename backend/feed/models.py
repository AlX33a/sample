from django.db import models

class Contact(models.Model):
    email = models.EmailField(max_length=100)
    username = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.username} - {self.email}"