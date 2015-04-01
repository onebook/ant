(function(win) {
  'use strict';

  if (!win.ant) {
    win.ant = {
      trigger: trigger,
      gather: gather
    };
  }

  var data = {};

  function trigger(id, fn) {
    if (!data[id]) {
      data[id] = {};
    }
    data[id].hook = fn;
  }

  function gather(id) {
    return data[id] && data[id].events;
  }

  parse();
  // private
  function parse() {
    var body = document.querySelector('body');
    getAntNodes(body);
  }

  function getAntNodes(node) {
    var nodes = node.childNodes;
    if (nodes && nodes.length) {
      for (var i = 0; i < nodes.length; i++) {
        getAntAttrs(nodes[i]);
        getAntNodes(nodes[i]);
      }
    }
  }

  function getAntAttrs(node) {
    var attrs = node.attributes;
    if (attrs && attrs.length) {
      var k, v;
      for (var i = 0; i < attrs.length; i++) {
        k = attrs[i] && attrs[i].name;
        if (k && k.indexOf('ant-') === 0) {
          v = node.getAttribute(k);
          handle(node, k, v);
        }
      }
    }
  }

  function handle(node, key, value) {
    var type = key.split('-')[1] || 'click';
    node.addEventListener(type, function(e) {
      if (!data[value]) {
        data[value] = {
          events: []
        };
      }
      if (!data[value].events) {
        data[value].events = [];
      }

      data[value].events.push({
        event: e,
        time: Date.now()
      });

      if (data[value].hook) {
        data[value].hook(e);
      }
      if (typeof win.ant.all === 'function') {
        win.ant.all(e, value);
      }
    });
  }

}(window));
