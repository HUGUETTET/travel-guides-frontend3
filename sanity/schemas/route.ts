// ./schemas/route.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'route',
  title: 'Travel Route',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Route Title',
      type: 'string',
      description: 'e.g., "Northern Thailand Adventure" or "Southeast Asia Circuit"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mapType',
      title: 'Map Type',
      type: 'string',
      options: {
        list: [
          { title: 'Single Country', value: 'country' },
          { title: 'Region', value: 'region' },
          { title: 'Multi-Country', value: 'multi-country' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mapCenter',
      title: 'Map Center',
      type: 'object',
      description: 'Center point for the map view',
      fields: [
        defineField({ name: 'lat', title: 'Latitude', type: 'number' }),
        defineField({ name: 'lng', title: 'Longitude', type: 'number' }),
      ],
    }),
    defineField({
      name: 'mapZoom',
      title: 'Map Zoom Level',
      type: 'number',
      description: 'Zoom level for the map (1-20, higher = more zoomed in)',
      initialValue: 6,
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'destinations',
      title: 'Destinos',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'destination' } }],
    }),
    defineField({
      name: 'stops',
      title: 'Route Stops',
      type: 'array',
      description: 'Add destinations in chronological order',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'destination',
              title: 'Destination Name',
              type: 'string',
              description: 'e.g., "Bangkok", "Chiang Mai", "Thailand"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'country',
              title: 'Country',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'latitude',
              title: 'Latitude',
              type: 'number',
              validation: (Rule) => Rule.required().min(-90).max(90),
            }),
            defineField({
              name: 'longitude',
              title: 'Longitude',
              type: 'number',
              validation: (Rule) => Rule.required().min(-180).max(180),
            }),
            defineField({
              name: 'arrivalDate',
              title: 'Arrival Date',
              type: 'date',
            }),
            defineField({
              name: 'departureDate',
              title: 'Departure Date',
              type: 'date',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'highlights',
              title: 'Highlights',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'accommodation',
              title: 'Accommodation',
              type: 'string',
            }),
            defineField({
              name: 'activities',
              title: 'Activities',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: {
              title: 'destination',
              subtitle: 'country',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'transportation',
      title: 'Transportation Between Stops',
      type: 'array',
      description: 'Add transportation methods in order (one less than stops)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'method',
              title: 'Transportation Method',
              type: 'string',
              options: {
                list: [
                  { title: '🚌 Bus', value: 'bus' },
                  { title: '✈️ Plane', value: 'plane' },
                  { title: '🚂 Train', value: 'train' },
                  { title: '🚗 Car', value: 'car' },
                  { title: '⛴️ Boat', value: 'boat' },
                  { title: '🚶 Walk', value: 'walk' },
                  { title: '🚴 Bike', value: 'bike' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'emoji',
              title: 'Emoji',
              type: 'string',
              description: 'Emoji to display on map',
              initialValue: '🚌',
            }),
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'string',
              description: 'e.g., "3 hours", "1 day"',
            }),
            defineField({
              name: 'cost',
              title: 'Cost',
              type: 'string',
              description: 'e.g., "$20", "500 THB"',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'tips',
              title: 'Travel Tips',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              method: 'method',
              duration: 'duration',
            },
            prepare({ method, duration }) {
              return {
                title: method,
                subtitle: duration || 'No duration specified',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'totalDuration',
      title: 'Total Duration',
      type: 'string',
      description: 'e.g., "2 weeks", "10 days"',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Moderate', value: 'moderate' },
          { title: 'Challenging', value: 'challenging' },
        ],
      },
    }),
    defineField({
      name: 'budget',
      title: 'Budget Level',
      type: 'string',
      options: {
        list: [
          { title: 'Budget', value: 'budget' },
          { title: 'Moderate', value: 'moderate' },
          { title: 'Luxury', value: 'luxury' },
        ],
      },
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'string',
      description: 'e.g., "November to February"',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
