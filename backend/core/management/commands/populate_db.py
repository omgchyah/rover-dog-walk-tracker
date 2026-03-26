import random
from decimal import Decimal
from django.core.management.base import BaseCommand
from core.models import Place, Review, Pet
from .seed_places import places
from .seed_pets import pets_data
from .seed_reviews import review_templates, authors
from django.db import connection


class Command(BaseCommand):
    help = "Populate the database"

    def handle(self, *args, **kwargs):
        # Borramos datos previos para no duplicar (opcional, pero útil en desarrollo)
        with connection.cursor() as cursor:
            cursor.execute("""
                           TRUNCATE TABLE core_place RESTART IDENTITY    CASCADE;
                            TRUNCATE TABLE core_review RESTART IDENTITY CASCADE;
                           TRUNCATE TABLE core_pet RESTART IDENTITY CASCADE;
                           """)

        place_instances = [Place(**data) for data in places]
        # create places
        Place.objects.bulk_create(place_instances)

        self.stdout.write(
            self.style.SUCCESS(f"Successfully seeded {len(place_instances)} places!")
        )

        all_places = Place.objects.all()
        reviews_to_create = []

        for place in all_places:
            # Buscamos plantillas para la categoría o usamos una genérica
            templates = review_templates.get(
                place.category,
                [
                    {
                        "title": "Sitio recomendado",
                        "body": "Me gustó mucho la experiencia con mi perro.",
                        "star": 4.0,
                    }
                ],
            )

            # Creamos 1 o 2 reviews por sitio
            for _ in range(random.randint(1, 2)):
                template = random.choice(templates)

                raw_star = float(template["star"]) + random.uniform(-1, 0.5)
                star_rating = int(round(max(1, min(5, raw_star))))

                reviews_to_create.append(
                    Review(
                        place=place,
                        author_name=random.choice(authors),
                        title=template["title"],
                        body=template["body"],
                        star=star_rating,
                        note="Done with script",
                    )
                )

        # 3. Creamos las reseñas masivamente
        Review.objects.bulk_create(reviews_to_create)

        self.stdout.write(
            self.style.SUCCESS(
                f"¡Hecho! He creado {all_places.count()} lugares y {len(reviews_to_create)} reseñas."
            )
        )

        pets_instances = [Pet(**data) for data in pets_data]
        Pet.objects.bulk_create(pets_instances)
        self.stdout.write(
            self.style.SUCCESS(f"Done! Created {len(pets_instances)} pets!")
        )
