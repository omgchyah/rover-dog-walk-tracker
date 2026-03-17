from rest_framework import serializers
from .models import Place, Review, Pet, Walk, PetWalkDetail, WalkPoint


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
        )


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
        fields = ("latitude", "longitude", "created_at")


class WalkSerializer(serializers.ModelSerializer):
    details = PetWalkDetailSerializer(many=True, read_only=True)
    # We chain the pet->petwalkdetail->walk to see the details and the pet nested inside the details
    points = WalkPointSerializer(many=True, read_only=True)

    class Meta:
        model = Walk
        fields = ("id", "start_time", "end_time", "details", "points")
