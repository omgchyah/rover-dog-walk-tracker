from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema

from core.models import Pet, Place, Review, PetWalkDetail, WalkPoint, Walk
from core.serializers import (
    PetSerializer,
    PlaceSerializer,
    ReviewSerializer,
    PetWalkDetailSerializer,
    WalkPointSerializer,
    WalkSerializer,
)


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class WalkViewSet(viewsets.ModelViewSet):
    queryset = Walk.objects.all()
    serializer_class = WalkSerializer

    # This creates the URL: /walk/{id}/pet/{pet_pk}/
    @action(
        detail=True,
        methods=["patch", "get", "put", "delete", "post"],
        url_path="pet/(?P<pet_pk>[^/.]+)",
    )
    def update_specific_pet(self, request, pk=None, pet_pk=None):
        """
        Manages a specific pet's report within a walk.
        Supports GET, PATCH, PUT, and DELETE.
        """
        walk = self.get_object()

        if request.method == "POST":
            data = request.data.copy()
            data["walk"] = walk
            data["pet"] = pet_pk
            serializer = PetWalkDetailSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)

        detail = get_object_or_404(PetWalkDetail, walk=walk, pet_id=pet_pk)

        if request.method == "GET":
            serializer = PetWalkDetailSerializer(detail)
            return Response(serializer.data)

        elif request.method in ["PUT", "PATCH"]:
            partial = request.method == "PATCH"
            serializer = PetWalkDetailSerializer(
                detail, data=request.data, partial=partial
            )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)

        elif request.method == "DELETE":
            detail.delete()
            return Response(status=204)

    # Create the URL for walk/{id}/add_point
    @extend_schema(
        request=WalkPointSerializer,
        responses={201: WalkPointSerializer},
        description="Add a singleGPS coordinate to this specific walk.",
    )
    @action(detail=True, methods=["post"], url_path="add_point")
    def add_point(self, request, pk=None):
        walk = self.get_object()

        data = request.data.copy()
        data["walk"] = walk.id

        serializer = WalkPointSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class PetWalkDetailViewSet(viewsets.ModelViewSet):
    queryset = PetWalkDetail.objects.all()
    serializer_class = PetWalkDetailSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["walk", "pet"]


class WalkPointsViewSet(viewsets.ModelViewSet):
    queryset = WalkPoint.objects.all()
    serializer_class = WalkPointSerializer
