from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from core.serializers import PlaceSerializer
from core.models import Place
from rest_framework.decorators import api_view


class HelloView(APIView):
    def get(self, request):
        return Response({"msg": "Hello World"})


@api_view(["GET"])
def place_list(request):
    places = Place.objects.all()
    serializer = PlaceSerializer(places, many=True)
    return Response(serializer.data)
