import {j,publicProcedure} from "../jstack"

export const adsRouter = j.router({
    getAll:publicProcedure.query(({c})=>{
        return c.superjson({
            message:"Hello from ads router"})
    })
})