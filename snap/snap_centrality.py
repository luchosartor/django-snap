import json

__author__ = 'Lucho Sartor'

import lib.snap as snap


def get_node_centrality(csv_file):
    g = snap.TUNGraph.New()  # new undirected graph
    nodes_info = {}
    read_csv(g, csv_file, nodes_info)
    betweenness = snap.TIntFltH()
    snap.GetBetweennessCentr(g, betweenness)
    centralities = []
    for node in nodes_info:
        centralities.append([node, nodes_info[node], snap.GetDegreeCentr(g, node), betweenness[node],
                             snap.GetClosenessCentr(g, node)])
    return json.dumps(centralities)


def read_csv(graph, csv_file, nodes_info):
    json_list = json.loads(csv_file)
    dummy = 0
    for row in json_list:
        if dummy == 0:
            dummy = 1
            continue
        src_node_id = int(row[1])
        if not graph.IsNode(src_node_id):
            graph.AddNode(src_node_id)
        dest_node_id = int(row[5])
        if not graph.IsNode(dest_node_id):
            graph.AddNode(dest_node_id)
        graph.AddEdge(src_node_id, dest_node_id)
        if src_node_id not in nodes_info:
            nodes_info[src_node_id] = row[2]
        if dest_node_id not in nodes_info:
            nodes_info[dest_node_id] = row[6]


