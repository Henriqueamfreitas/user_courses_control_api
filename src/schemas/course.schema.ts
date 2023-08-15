import { z } from "zod"


const courseSchema = z.object({
    id: z.number().positive().int(),
    name: z.string().max(50),
    description: z.string(),
})

const courseCreateSchema = courseSchema.omit({ id: true })
// const courseReturnSchema = courseSchema.omit({ password: true })
const courseReturnManySchema = courseSchema.array()

export {
    courseSchema,
    courseCreateSchema,
    courseReturnManySchema
}