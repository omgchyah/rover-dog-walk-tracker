from rest_framework import status
from rest_framework.test import APITestCase
from core.models import Walk, Pet, PetWalkDetail, WalkPoint
from django.urls import reverse


class WalkTest(APITestCase):
    def setUp(self):
        self.pet = Pet.objects.create(
            name="Moka",
            owner_name="Joanna",
            pet_type=Pet.PetType.CAT,
            breed="Siamese",
            is_social=False,
            is_pipican_allowed=False,
        )
        self.walk = Walk.objects.create()
        self.walk_detail = PetWalkDetail.objects.create(
            walk=self.walk, pet=self.pet, mood=PetWalkDetail.MoodTypes.HAPPY
        )

    def test_get_walk_with_pet_details(self):
        url = reverse(
            "walk-update-specific-pet",
            kwargs={"pk": self.walk.id, "pet_pk": self.pet.id},
        )
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data["pet"]["name"], self.pet.name)

    def test_update_pet_details_in_walk(self):
        url = reverse(
            "walk-update-specific-pet",
            kwargs={"pk": self.walk.id, "pet_pk": self.pet.id},
        )
        data = {"poops": 1, "pees": 2, "mood": PetWalkDetail.MoodTypes.SAD}
        response = self.client.patch(url, data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.walk_detail.refresh_from_db()
        self.assertEqual(self.walk_detail.poops, response.data["poops"])

    def test_add_new_point_to_walk(self):
        url = reverse("walk-add-point", kwargs={"pk": self.walk.id})
        data = {
            "latitude": 41.406273,
            "longitude": 2.169494,
        }

        response = self.client.post(url, data)
        print(response.data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.walk.refresh_from_db()
        self.assertEqual(self.walk.points.count(), 1)
        self.assertEqual(float(self.walk.points.first().latitude), data["latitude"])
