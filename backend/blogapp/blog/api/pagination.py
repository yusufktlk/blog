from rest_framework.pagination import PageNumberPagination

class SinglePagination(PageNumberPagination):
    page_size = 1

class SmallPagination(PageNumberPagination):
    page_size = 10

class MediumPagination(PageNumberPagination):
    page_size = 25

class LargePagination(PageNumberPagination):
    page_size = 50