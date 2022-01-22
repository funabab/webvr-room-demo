import { Vector3 } from 'three'

AFRAME.registerComponent('proximity', {
  schema: {
    distace: { type: 'number', default: 1 },
    _target: { type: 'selector' },
  },
  update: function () {
    const el = this.el
    const data = this.data
    const self = this as any

    self.target = data.target ? el.sceneEl?.querySelector(data.target) : null
  },

  tick: function () {
    const el = this.el
    const data = this.data
    const self = this as any

    if (!self.target) {
      return
    }
    el.object3D.visible =
      el.object3D.position.distanceTo(self.target.object3D.position) <=
      data.distance
  },
})
