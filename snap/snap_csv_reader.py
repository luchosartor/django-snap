__author__ = 'Lucho Sartor'

def read_file(g, net_name, nodes_info):
    with open(net_name, 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        dummy = 0
        for row in reader:
            if dummy == 0:
                dummy = 1
                continue
            src_node_id = int(row[1])
            if not g.IsNode(src_node_id):
                g.AddNode(src_node_id)
            dest_node_id = int(row[5])
            if not g.IsNode(dest_node_id):
                g.AddNode(dest_node_id)
            g.AddEdge(src_node_id, dest_node_id)
            if src_node_id not in nodes_info:
                nodes_info[src_node_id] = row[2]
            if dest_node_id not in nodes_info:
                nodes_info[dest_node_id] = row[6]
    csvfile.close()
