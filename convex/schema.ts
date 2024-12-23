import { error } from "console";
import { defineSchema,defineTable } from "convex/server";
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    userId: v.string(), //clerkid
    email: v.string(),
    name: v.string(),
    isPro: v.boolean(),
    proSince: v.optional(v.number()),
    lemonSqueezyCustomerId: v.optional(v.string()),
    lemonsqueezyOrderId: v.optional(v.string())
  }).index("by_user_id",["userId"]),

  codeExecutions: defineTable({
    userId: v.string(),
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string())
  }).index("by_user_id",["userId"]),

  snippets: defineTable({
    userId: v.string(),
    language: v.string(),
    title: v.string(),
    code: v.string(),
    userName: v.string(),// store user's name
  }).index("by_user_id",["userId"]),

  
  snippetComments: defineTable({
    snippetId: v.string(),
    userId: v.string(),
    userName: v.string(),
    content: v.string(),//html content
  }).index("by_snippet_id",["snippetId"]),

  stars: defineTable({
    userId: v.string(),
    snippetId: v.id("snippets")
  })
  .index("by_user_id",["userId"])
  .index("by_snippet_id",["snippetId"])
  .index("by_user_id_and_snippet_id",["userId","snippetId"])
})