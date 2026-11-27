// One-off import of the Astro site's static experience list: `npm run seed`
import config from '@payload-config'
import { getPayload } from 'payload'

// Path held in a variable so the Next build, which can't see outside cms/, doesn't type-check it
const source = '../../src/content/experience'
const { experiences } = await import(source)

const payload = await getPayload({ config })
const { totalDocs } = await payload.count({ collection: 'experiences' })

if (totalDocs > 0) {
  console.log(`Skipped: ${totalDocs} experiences already exist`)
} else {
  // Created one at a time, in file order, so the admin order stays newest first
  for (const data of experiences) await payload.create({ collection: 'experiences', data })
  console.log(`Seeded ${experiences.length} experiences`)
}

process.exit(0)
