import fs from 'fs'
import { minify } from 'html-minifier'
import mjml from 'mjml'
import path from 'path'
import { fileURLToPath } from 'url'
import { getAllMjmlFiles, loadAndCompileTemplate } from './helpers'

const HERE = path.resolve(fileURLToPath(import.meta.url))
const BASE_DIR = path.dirname(HERE)

const build = () => {
  const files = getAllMjmlFiles(true)

  // loop through the files if they are mjml files

  files.forEach((file) => {
    const input = fs.readFileSync(path.join(BASE_DIR, file + '.mjml'), 'utf8')
    const output = path.join(BASE_DIR, file + '.html')

    fs.writeFileSync(
      output,
      minify(
        mjml(input, {
          keepComments: process.env.NODE_ENV === 'development',
        }).html,
        {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true,
        },
      ),
    )

    console.log(`Built ${file} to ${output.replace(BASE_DIR, '')}`)
  })
}

const serve = async () => {
  Bun.serve({
    port: 3000,
    development: true,

    async fetch(event) {
      const url = new URL(event.url)
      const pathname = url.pathname

      if (pathname === '/' || pathname === '/index.html') {
        return Response.json(
          {
            message: 'Select a file to view',

            files: getAllMjmlFiles(true),
          },
          {
            headers: {
              'content-type': 'application/json',
            },
          },
        )
      }

      build()

      const response = loadAndCompileTemplate('forms-submission', {
        title: 'Form Submission',
        description: 'This is a form submission',

        form: {
          referer: 'https://www.google.com',
          items: [
            {
              label: 'Name',
              value: 'John Doe',
            },
            {
              label: 'Email',
              value: 'john@doe.com',
            },
          ],
        },

        // banner: {
        //   title: "Callback Request",
        //   image: "https://ignite-nursing.vercel.app/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Flive-in-care.6892c680.png&w=640&q=75",
        //   link: {
        //     url: "https://www.google.com",
        //     text: "Learn more",
        //   },
        // },
      })

      return new Response(response, {
        headers: {
          'content-type': 'text/html',
        },
      })
    },
  })
}

function main() {
  const args = process.argv.slice(2)

  if (args[0] === 'build') {
    return build()
  }

  if (args[0] === 'serve') {
    return serve()
  }

  console.log('Command not found', args[0])
}

const isEntrypoint = process.argv[1] && path.resolve(process.argv[1]) === HERE

if (isEntrypoint) {
  main()
}
