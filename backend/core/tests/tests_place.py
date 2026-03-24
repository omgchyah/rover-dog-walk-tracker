from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from core.models import Place
from django.urls import reverse


class PlaceTests(APITestCase):
    def setUp(self):
        self.list_url = reverse("place-list")
        self.place = Place.objects.create(
            name="Corgi Cafe",
            description="Very pet friendly!",
            category=Place.PlaceCategory.CAFE,
            latitude=41.406273124294,
            longitude=2.1694943269824636,
            allows_unleashed=True,
            requires_entry_fee=False,
            is_enclosed=True,
        )

    def test_get_place(self):
        """
        Ensure we can get all the place instances.
        """
        response = self.client.get(self.list_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), Place.objects.count())

    def test_get_one_place(self):
        """
        Ensure we can get one place instance by id.
        """
        url = reverse("place-detail", kwargs={"pk": self.place.id})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.place.name)
