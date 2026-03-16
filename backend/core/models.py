from django.db import models


# Create your models here.
class Place(models.Model):
    class PlaceCategory(models.TextChoices):
        LODGING = "Lodging"
        CAFE = "Cafe"
        RESTAURANT = "Restaurant"
        PARK = "Park"
        PIPI_CAN = "Pipí can"
        FUN = "Fun"
        BUSINESS = "Business"
        STORE = "Store"

    name = models.CharField(max_length=100, blank=False, null=False)
    description = models.CharField(max_length=150, blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    allows_unleashed = models.BooleanField(default=False)
    requires_entry_fee = models.BooleanField(default=False)
    is_enclosed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Review(models.Model):
    author_name = models.CharField(max_length=20)
    title = models.CharField(max_length=50, blank=False, null=False)
    star = models.DecimalField(max_length=5, max_digits=3, decimal_places=2)
    body = models.TextField(blank=True, null=True)
    note = models.CharField(blank=True, null=True)
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name="reviews")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.star}* - {self.title}"


class Pet(models.Model):
    class PetType(models.TextChoices):
        DOG = "Dog"
        CAT = "Cat"

    name = models.CharField(max_length=50, blank=False, null=False)
    # Can be change to owner_id once I create MVP (backlog)
    owner_name = models.CharField(max_length=50, blank=False, null=False)
    pet_type = models.CharField(
        max_length=5, choices=PetType.choices, default=PetType.DOG
    )
    # Can use an API of dog to populate the breed (backlog)
    breed = models.CharField(max_length=30, default="mixed")
    is_social = models.BooleanField(default=True)
    is_pipican_allowed = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.get_pet_type_display()})"


class Walk(models.Model):
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)

    pets = models.ManyToManyField(
        Pet, verbose_name="list of pets", through="PetWalkDetail"
    )

    def __str__(self):
        return f"Date: {self.start_time.strftime('%Y-%m-%d %H:%M')}. Pets: {', '.join([p.name for p in self.pets.all()])}"


class PetWalkDetail(models.Model):
    class MoodTypes(models.TextChoices):
        AS_USUAL = "As usual"
        HAPPY = "Happy"
        SAD = "Sad"
        ANXIOUS = "Anxious"
        LETHARGIC = "Lethargic"
        TIRED = "Tired"

    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, related_name="pet")
    walk = models.ForeignKey(Walk, on_delete=models.CASCADE, related_name="details")
    poops = models.IntegerField(default=0)
    pees = models.IntegerField(default=0)
    mood = models.CharField(
        max_length=20, choices=MoodTypes, default=MoodTypes.AS_USUAL
    )


class WalkPoint(models.Model):
    walk = models.ForeignKey(Walk, on_delete=models.CASCADE, related_name="points")
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]
