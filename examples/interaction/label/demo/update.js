import G6 from '@antv/g6';
/**
   * 本示例演示以下功能：
   * 鼠标 hover 节点更新节点样式及其标签文本
   * 鼠标 hover 边更新边样式及其标签文本
   * by 十吾
   */

const data = {
  nodes: [{
    id: 'node1',
    x: 100,
    y: 100,
    label: 'hover 前的\n节点文本 node1'
  }, {
    id: 'node2',
    x: 400,
    y: 100,
    label: 'hover 前的\n节点文本 node2'
  }],
  edges: [{
    source: 'node1',
    target: 'node2',
    label: 'hover 前的边文本',
    labelCfg: {
      refY: 10
    }
  }]
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  defaultEdge: {
    color: '#bae7ff',
    lineAppendWidth: 3
  },
  nodeStateStyles: {
    hover: {
      fill: 'steelblue'
    }
  },
  edgeStateStyles: {
    hover: {
      stroke: '#000',
      lineWidth: 3
    }
  }
});
graph.data(data);
graph.render();

graph.on('node:mouseenter', function(evt) {
  const node = evt.item;
  const model = node.getModel();
  model.oriLabel = model.label;
  graph.setItemState(node, 'hover', true);
  graph.updateItem(node, {
    label: 'hover 后 ' + model.id,
    labelCfg: {
      style: {
        fill: '#f00'
      }
    }
  });
});

graph.on('node:mouseleave', function(evt) {
  const node = evt.item;
  const model = node.getModel();
  graph.setItemState(node, 'hover', false);
  graph.updateItem(node, {
    label: model.oriLabel,
    labelCfg: {
      style: {
        fill: '#555'
      }
    }
  });
});

graph.on('edge:mouseenter', function(evt) {
  const edge = evt.item;
  const model = edge.getModel();
  model.oriLabel = model.label;
  graph.setItemState(edge, 'hover', true);
  graph.updateItem(edge, {
    label: 'hover 后',
    labelCfg: {
      style: {
        fill: '#f00'
      }
    }
  });
});

graph.on('edge:mouseleave', function(evt) {
  const edge = evt.item;
  graph.setItemState(edge, 'hover', false);
  graph.updateItem(edge, {
    label: 'hover 前的边文本',
    labelCfg: {
      style: {
        fill: '#555'
      }
    }
  });
});
