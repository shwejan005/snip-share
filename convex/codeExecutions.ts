import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const saveExecution = mutation({
  args: v.object({
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not Authenticated");

    // Query user based on identity
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    // Check Pro subscription for non-JavaScript languages
    if (!user?.isPro && args.language !== "javascript") {
      throw new ConvexError("Pro subscription required to use other languages");
    }

    // Insert the code execution record
    await ctx.db.insert("codeExecutions", {
      ...args,
      userId: identity.subject,
    });

    return { success: true, message: "Code execution saved successfully" };
  },
});
