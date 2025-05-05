
import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Use a single PrismaClient instance globally to prevent too many connections
declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
try {
  if (process.env.NODE_ENV === "production") {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
    prisma = new PrismaClient({ adapter })
  } else {
    if (!global.cachedPrisma) {
      
      const adapter = new PrismaPg({connectionString:process.env.DATABASE_URL})
      global.cachedPrisma = new PrismaClient({ adapter })
    }
    prisma = global.cachedPrisma
  }
} catch (error) {
  console.error('Failed to connect to database:', error)
  throw new Error('Database connection failed')
}

export const db = prisma
