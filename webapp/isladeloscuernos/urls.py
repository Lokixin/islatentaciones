from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('parejas/', views.ParejasView.as_view(), name='parejas'),
    path('solteros/', views.SolterosView.as_view(), name='solteros'),
    path('solteras/', views.SolterasView.as_view(), name='solteras'),
    path('vote/', views.handleVote, name='vote'),
    path('votesoltero/', views.handleVoteSoltero, name='votesoltero'),
    path('votesoltera/', views.handleVoteSoltera, name='votesoltera'),
    path('getstats/', views.getstats, name='getstats'),
]