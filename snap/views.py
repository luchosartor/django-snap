import json
from django.http import HttpResponse
from django.shortcuts import render
import snap_centrality as ctrl
import csv


def centrality(request):
    result = ctrl.get_node_centrality(request.POST['json'])  # receives json from csv file
    context = {
        'result': result,
    }
    return render(request, 'snap/centrality.html', context)  # should return json with metrics!


def dummy(request):
    return render(request, 'snap/dummy.html', {})


def get_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="sample.csv"'
    centrality_file = json.loads(request.POST['jtext'])

    writer = csv.writer(response, delimiter=',')
    writer.writerow(['startup_id', 'startup_name', 'degree', 'betweenness', 'closeness'])
    for row in centrality_file:
        writer.writerow(row)

    return response

# Create your views here.
