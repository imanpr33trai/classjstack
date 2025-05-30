import { HTTPException } from "hono/http-exception"
import { jstack } from "jstack"
import  {db}  from "@/db"


interface Env {
  Bindings: {}
}

export const j = jstack.init<Env>()

const authMiddleware = j.middleware(async ({c,next})=>{

  const isAuthenticated = true

  if(!isAuthenticated){
    throw new HTTPException(401,{
      message:"Unauthorized"
    })
  }


  await next({user:{
    where:{db.}
  }})
})

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const publicProcedure = j.procedure
export const privateProcedure = j.procedure.use(authMiddleware)
