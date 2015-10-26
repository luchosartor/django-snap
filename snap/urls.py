__author__ = 'Lucho Sartor'
from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /polls/
    url(r'^$', views.dummy, name='dummy'),
    url(r'^centrality$', views.centrality, name='centrality'),
    url(r'^centrality/csv$', views.get_csv, name='csv'),
]
