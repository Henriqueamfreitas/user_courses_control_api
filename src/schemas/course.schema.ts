import { z } from "zod"


const courseSchema = z.object({
    id: z.number().positive().int(),
    name: z.string().max(50),
    description: z.string(),
})

const courseCreateSchema = courseSchema.omit({ id: true })
const courseReturnManySchema = courseSchema.array()

const courseUsersSchema = z.object({
    userId: z.number().positive().int(),
    userName: z.string().max(50),
    courseId: z.number().positive().int(),
    courseName: z.string().max(50),
    courseDescription: z.string(),
    userActiveInCourse: z.boolean(),
    id: z.number().positive().int(),
})

const courseUsersCreateSchema = courseUsersSchema.omit({ id: true })
const courseUsersReturnManySchema = courseUsersSchema.array()

export {
    courseSchema,
    courseCreateSchema,
    courseReturnManySchema,
    courseUsersSchema,
    courseUsersCreateSchema, 
    courseUsersReturnManySchema
}