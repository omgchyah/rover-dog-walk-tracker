from rest_framework import serializers
from .models import Place, Review, Pet, Walk, PetWalkDetail, WalkPoint
from django.db.models import Avg


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = (
            "id",
            "author_name",
            "title",
            "star",
            "body",
            "note",
            "place",
            "created_at",
            "updated_at",
        )


class PlaceSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    average_review = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = (
            "id",
            "name",
            "description",
            "category",
            "latitude",
            "longitude",
            "allows_unleashed",
            "requires_entry_fee",
            "is_enclosed",
            "created_at",
            "updated_at",
            "reviews",
            "average_review",
            "review_count",
        )

    def get_average_review(self, obj):
        avg_rating = 0

        if obj.reviews.exists():
            avg_rating = obj.reviews.aggregate(Avg("star")).get("star__avg", 0)

        return round(avg_rating or 0, 1)

    def get_review_count(self, obj):
        return obj.reviews.count()


# Fields can be read-only or write_only


class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = (
            "id",
            "name",
            "owner_name",
            "pet_type",
            "breed",
            "is_social",
            "is_pipican_allowed",
        )


class PetWalkDetailSerializer(serializers.ModelSerializer):
    pet = PetSerializer(read_only=True)
    # Now we will see the details of the pet

    class Meta:
        model = PetWalkDetail
        fields = ("pet", "walk", "poops", "pees", "mood")


class WalkPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalkPoint
        fields = ("id", "latitude", "longitude", "created_at", "walk")


class WalkSerializer(serializers.ModelSerializer):
    details = PetWalkDetailSerializer(many=True, read_only=True)
    # We chain the pet->petwalkdetail->walk to see the details and the pet nested inside the details
    points = WalkPointSerializer(many=True, read_only=True)
    pets = serializers.PrimaryKeyRelatedField(many=True, queryset=Pet.objects.all())

    class Meta:
        model = Walk
        fields = ("id", "start_time", "end_time", "pets", "details", "points")
