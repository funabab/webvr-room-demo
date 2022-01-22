import { Color, Mesh, MeshBasicMaterial } from 'three'

AFRAME.registerComponent('tintable', {
  schema: {
    color: { type: 'string', default: '#fff' },
  },

  init: function () {
    const el = this.el
    const self = this as any
    const data = this.data

    self.color = new Color(data.color)

    self.tint = function () {
      el.object3D.traverse((node) => {
        const obj: Mesh = node as Mesh
        if (obj.type === 'Mesh') {
          const mat: MeshBasicMaterial = obj.material as MeshBasicMaterial

          self.color.setStyle(data.color)
          mat.color = self.color
        }
      })
    }

    el.addEventListener('model-loaded', self.tint)
  },

  remove: function () {
    const self = this as any
    this.el.removeEventListener('model-loaded', self.tint)
  },

  update: function () {
    const self = this as any
    self.tint()
  },
})
