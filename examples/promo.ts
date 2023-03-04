import { g, Infer, InferResolvers } from './../src/index'
import { createYoga } from 'graphql-yoga'

const queryType = g.type('Query', {
  greet: g.string()
    .args({
      name: g.string().nullable().default('Max'),
    })
    .description('Greets a person')
})

const resolvers: InferResolvers<{ Query: typeof queryType }, {}> = {
  Query: {
    greet: (parent, args, context, info) => `Hello, ${args.name}`
  }
}

const schema = g.buildSchema({ resolvers })
const yoga = createYoga({ schema })
Bun.serve(yoga)
