from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from profiles.models import Profile, ProfileState
from profiles.api.serializer import ProfileSerializer, ProfileStateSerializer, ProfilePhotoSerializer
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework import mixins
from profiles.api.permissions import UpdateYourselfOrReadOnly, UpdateStateYourselfOrReadOnly

class ProfileViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet):

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated, UpdateYourselfOrReadOnly]



class ProfileStateViewSet(ModelViewSet):
    
    serializer_class = ProfileStateSerializer
    permission_classes = [IsAuthenticated, UpdateStateYourselfOrReadOnly]

    def get_queryset(self):
        queryset = ProfileState.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(user_profile__user__username = username)
        return queryset

    def perform_create(self, serializer):
        user_profile = self.request.user.profile
        serializer.save(user_profile=user_profile)


class ProfilePhotoUpdateView(generics.UpdateAPIView):
    serializer_class = ProfilePhotoSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profil_instance = self.request.user.profile
        return profil_instance
    

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate

class LoginView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=400)

from django.contrib.auth.models import User
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.http import JsonResponse

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # POST isteğiyle gelen verileri al
        username = request.data.get('username')
        email = request.data.get('email')
        password1 = request.data.get('password1')
        password2 = request.data.get('password2')

        print(request.data)
        print(self)

        # Kullanıcı adı veya e-posta adresi zaten kullanımda mı diye kontrol et
        if User.objects.filter(username__iexact=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        if User.objects.filter(email__iexact=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        # İki şifrenin de eşleşip eşleşmediğini kontrol et
        if password1.lower() != password2.lower():
            return JsonResponse({'error': "Passwords don't match"}, status=400)

        # Kullanıcı oluştur
        user = User.objects.create_user(username=username, email=email, password=password1)
        
        # Oluşturulan kullanıcıya oturum anahtarı (token) oluştur
        token, _ = Token.objects.get_or_create(user=user)
        
        # Başarılı yanıtı döndür
        return Response({'token': token.key})
