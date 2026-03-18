from django.contrib import admin
from .models import Pet, Walk, PetWalkDetail, WalkPoint, Place, Review


# # Register your models here.


class WalkPointInline(admin.TabularInline):
    model = WalkPoint
    extra = 0  # Stops Django from showing empty rows
    readonly_fields = ("created_at",)


class PetWalkDetailInline(admin.TabularInline):
    model = PetWalkDetail
    extra = 1  # can easily add pets?


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ("name", "pet_type", "breed", "is_social", "is_pipican_allowed")


@admin.register(Walk)
class WalkAdmin(admin.ModelAdmin):
    list_display = ("id", "start_time", "end_time", "get_pets")
    list_filter = ("start_time",)
    search_fields = ("id",)
    inlines = [PetWalkDetailInline, WalkPointInline]

    def get_pets(self, obj):
        return ", ".join([pet.name for pet in obj.pets.all()])

    get_pets.short_description = "Pets on walk"

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.prefetch_related("pets")


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 0
    readonly_fields = ("created_at",)


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "category",
        "latitude",
        "longitude",
        "allows_unleashed",
        "requires_entry_fee",
        "is_enclosed",
        "created_at",
    )
    list_filter = ("category", "allows_unleashed", "is_enclosed")
    search_fields = ("name", "description")
    inlines = [ReviewInline]
