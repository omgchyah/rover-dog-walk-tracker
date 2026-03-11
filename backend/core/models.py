from django.db import models

# Create your models here.
class Pet(models.Model):
    class PetType(models.TextChoices):
        DOG = "Dog", "DOG"
        CAT = "Cat", "CAT"
        
    name = models.CharField(max_length=50, blank=False, null=False)
    #Can be change to owner_id once I create MVP (backlog)
    owner_name = models.CharField(max_length=50, blank=False, null=False)
    pet_type = models.CharField(
        max_length=5,
        choices=PetType.choices,
        default=PetType.DOG
    )
    #Can use an API of dog to populate the breed (backlog)
    breed = models.CharField(max_length=30, default='mixed')
    is_social = models.BooleanField(default=True)
    is_pipican_allowed = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.name} ({self.get_pet_type_display()})"