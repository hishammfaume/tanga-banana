import fs from 'fs'
import handlebars from 'handlebars'
import path from 'path'
// import { fileURLToPath } from "url";

// const HERE = path.resolve(fileURLToPath(import.meta.url));

// const BASE_DIR = path.dirname(HERE);
const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'mjml')

const loadTemplate = (file: AvailableTemplates) => {
  if (!file.endsWith('.mjml')) {
    file = file + '.mjml'
  }

  const output = path.join(TEMPLATES_DIR, file.replace('.mjml', '.html'))

  try {
    return fs.readFileSync(output, 'utf8')
  } catch (e) {
    console.error(`Error loading template file: ${output}`, e)
    return null
  }
}

const loadAndCompileTemplate = <T extends AvailableTemplates>(path: T, params: Params[T]) => {
  console.log('Loading template:', path)
  const input = loadTemplate(path)!

  if (!input) {
    throw new Error(`Template ${path} not found. Make sure the compiled html exists.`)
  }
  const template = handlebars.compile(input)(params)

  return template
}

const getAllMjmlFiles = (strip: boolean = false) => {
  const files = fs.readdirSync(__dirname)
  console.log('MJML files found:', files)

  return files.reduce((acc, file) => {
    if (file.endsWith('.mjml')) {
      acc.push((strip ? file.replace('.mjml', '') : file) as AvailableTemplates)
    }
    return acc
  }, [] as AvailableTemplates[])
}

// types

type Params = {
  'tour-booking-notification': {
    title: string
    description: string
    booking: {
      items: {
        label: string
        value: string
      }[]
    }
  }
  'tour-booking-confirmation': {
    title: string
    description: string
    name: string
    booking: {
      items: {
        label: string
        value: string
      }[]
    }
  }
  'forms-submission': {
    title: string
    description: string
    form: {
      items: {
        label: string
        value: string
      }[]
      referer: string
    }
    banner?: {
      title: string
      description?: string
      image: string
      link?: {
        text: string
        url: string
      }
    }
  }
  'job-posted': {
    title: string
    description: string
    form: {
      items: {
        label: string
        value: string
      }[]
      referer: string
    }
    banner?: {
      title: string
      description?: string
      image: string
      link?: {
        text: string
        url: string
      }
    }
    unsubscribeUrl: string
  }
  'forgot-password': {
    link: string
    name: string
    expiry: number
  }
}

type AvailableTemplates = keyof Params

export { getAllMjmlFiles, loadAndCompileTemplate }

// src/mjml/templates.ts
