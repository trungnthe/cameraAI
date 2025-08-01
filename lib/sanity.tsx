import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'sfr8ifp4',
  dataset: 'production',
  apiVersion: '2023-08-01',
  useCdn: true,
})
