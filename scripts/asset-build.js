const shell = require('shelljs')
const fg = require('fast-glob')
const sharp = require('sharp')
const path = require('path')
const { writeFile } = require('fs/promises')

const TEXTURE_REDUCE_FACTOR = 1

async function build() {
  shell.rm('-rf', 'dist/textures')
  shell.mkdir('-p', 'dist/textures')
  shell.cp('-R', 'assets/models/', 'dist')

  const { default: imagemin } = await import('imagemin')
  const { default: imageminGifsicle } = await import('imagemin-gifsicle')
  const { default: imageminJpegtran } = await import('imagemin-jpegtran')
  const { default: imageminPngquant } = await import('imagemin-pngquant')

  const cwd = process.cwd()
  const texturesOutPath = path.join(cwd, 'dist', 'textures')
  const publicTexAssetsPath = path.join(cwd, 'assets', 'textures')

  const texturesPath = await (
    await fg('./assets/textures/**/*.{jpg,png,gif}')
  ).map((filePath) => path.resolve(cwd, filePath))

  await Promise.all(
    texturesPath.map((texturePath) => {
      const image = sharp(texturePath)
      return image.metadata().then(async ({ width }) => {
        const outPath = path.join(
          texturesOutPath,
          path.relative(publicTexAssetsPath, texturePath)
        )

        const buf = await image
          .resize({ width: Math.floor(width / TEXTURE_REDUCE_FACTOR) })
          .toBuffer()
        const outBuf = await imagemin.buffer(buf, {
          plugins: [imageminPngquant(), imageminJpegtran(), imageminGifsicle()],
        })

        shell.mkdir('-p', path.dirname(path.relative(cwd, outPath)))

        return writeFile(outPath, outBuf)
      })
    })
  )
}

build()
