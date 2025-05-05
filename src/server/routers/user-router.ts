import {z} from "zod"
import {j, publicProcedure} from "../jstack"
import { db } from "@/db"
import { create } from "domain";


export const userRouter = j.router({
    getAll:publicProcedure.query(async({c, ctx})=>{
        const allUsers = await db.user.findMany({
            select:{
                id:true,
                createdAt:true,
                updatedAt:true,
                email:true,
                firstName:true,
                lastName:true,

            }
        })
         
        return c.superjson({allUsers})      
        
    }),

    create: publicProcedure
        .input(z.object({
            email: z.string().email(),
            firstName: z.string(),
            lastName: z.string(),
        }))
        .mutation(async({c, ctx, input})=>{
            const user = await db.user.create({
                data: {
                    email: input.email,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    id: Math.random().toString(36) // Generate random ID
                }
            })
            return c.superjson({user})
        })
})