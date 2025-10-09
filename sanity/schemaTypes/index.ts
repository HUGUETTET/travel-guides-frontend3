import { type SchemaTypeDefinition } from 'sanity'
import post from "../schemas/post"
import destination from "../schemas/destination"
import category from "../schemas/category"
import guide from "../schemas/guide"
import newsletter from "../schemas/newsletter"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, destination, category, guide, newsletter],
}