'use strict'

var store = {}

function trigger(id, fn) {
  if (!store[id]) {
    store[id] = {}
  }
  store[id].hook = fn
}

function gather(id) {
  return store[id] && store[id].events
}

parse()

/**
 * private
 */

function parse() {
  var body = document.querySelector('body')
  getAntNodes(body)
}

function getAntNodes(node) {
  var nodes = node && node.childNodes
  if (nodes && nodes.length) {
    for (var i = 0; i < nodes.length; i++) {
      getAntAttrs(nodes[i])
      getAntNodes(nodes[i])
    }
  }
}

function getAntAttrs(node) {
  var attrs = node && node.attributes
  if (attrs && attrs.length) {
    var k, v
    for (var i = 0; i < attrs.length; i++) {
      k = attrs[i] && attrs[i].name
      if (k && k.indexOf('ant-') === 0) {
        v = node.getAttribute(k)
        handle(node, k, v)
      }
    }
  }
}

/**
 * @param {dom} node
 * @param {String} type
 * @param {String} id
 */
function handle(node, type, id) {
  type = type.split('-')[1] || 'click'
  node.addEventListener(type, function(e) {
    if (!store[id]) {
      store[id] = {
        events: []
      }
    }

    var obj = store[id]

    if (!obj.events) {
      obj.events = []
    }

    obj.events.push({
      event: e,
      time: Date.now()
    })

    if (obj.hook) {
      obj.hook(e, id, type)
    }

    var all = store['*']
    if (all && typeof all.hook === 'function') {
      all.hook(e, id, type)
    }
  })
}

export { trigger, gather }
