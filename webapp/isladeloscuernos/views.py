from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views import generic
from .models import Pareja, Soltera, Soltero

# Create your views here.


def index(request):
    return render(request, 'isladeloscuernos/stats.html')


class ParejasView(generic.ListView):
    template_name = 'isladeloscuernos/parejas.html'
    model = Pareja


class SolterosView(generic.ListView):
    template_name = 'isladeloscuernos/solteros.html'
    model = Soltero

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        context['tipo'] = 'solteros'
        return context


class SolterasView(generic.ListView):
    template_name = 'isladeloscuernos/solteros.html'
    model = Soltera

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        context['tipo'] = 'solteras'
        return context
    


def handleVote(request):
    if request.method == 'POST':
        res = {}
        
        identificador = int(request.POST["id"])
        pareja = Pareja.objects.get(id = identificador)
        pareja.votos += 1
        pareja.save()
        parejas = Pareja.objects.all()
        for pareja in parejas:
            key = f'{pareja.novio} y {pareja.novia}'
            res[key] = str(pareja.votos)
        else:
            res['msg'] = 'ok'
        return JsonResponse(res)
    else:
        return JsonResponse({'msg': 'This route cannot be accessed'})


def handleVoteSoltero(request):
    if request.method == 'POST':
        res = {}
        
        identificador = int(request.POST["id"])
        soltero = Soltero.objects.get(id = identificador)
        soltero.votos += 1
        soltero.save()
        solteros = Soltero.objects.all()
        for soltero in solteros:
            key = f'{soltero.nombre}'
            res[key] = str(soltero.votos)
        else:
            res['msg'] = 'ok'
        return JsonResponse(res)
    else:
        return JsonResponse({'msg': 'This route cannot be accessed'})


def handleVoteSoltera(request):
    if request.method == 'POST':
        res = {}
        identificador = int(request.POST["id"])
        soltero = Soltera.objects.get(id = identificador)
        soltero.votos += 1
        soltero.save()
        solteros = Soltera.objects.all()
        for soltero in solteros:
            key = f'{soltero.nombre}'
            res[key] = str(soltero.votos)
        else:
            res['msg'] = 'ok'
        return JsonResponse(res)
    else:
        return JsonResponse({'msg': 'This route cannot be accessed'})


def getstats(request):
    if request.method == 'GET':
        res = {}
        solteros = {}
        solteras = {}
        parejas = {}

        solterosTodos = Soltero.objects.all()
        for soltero in solterosTodos:
            key = f'{soltero.nombre}'
            solteros[key] = str(soltero.votos)

        solterasTodas = Soltera.objects.all()
        for soltero in solterasTodas:
            key = f'{soltero.nombre}'
            solteras[key] = str(soltero.votos)

        parejasTodas = Pareja.objects.all()
        for pareja in parejasTodas:
            key = f'{pareja.novio} y {pareja.novia}'
            parejas[key] = str(pareja.votos)

        res["solteros"] = solteros
        res["solteras"] = solteras
        res["parejas"] = parejas
        return JsonResponse(res)
    else:
         return JsonResponse({'msg': 'This route cannot be accessed'})