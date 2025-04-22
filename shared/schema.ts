import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const botStats = pgTable("bot_stats", {
  id: serial("id").primaryKey(),
  serverCount: integer("server_count").notNull(),
  userCount: integer("user_count").notNull(),
  commandCount: integer("command_count").notNull(),
  uptimeDays: integer("uptime_days").notNull(),
  uptimeHours: integer("uptime_hours").notNull(),
  uptimeMinutes: integer("uptime_minutes").notNull(),
  lastUpdated: text("last_updated").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBotStatsSchema = createInsertSchema(botStats).pick({
  serverCount: true,
  userCount: true,
  commandCount: true,
  uptimeDays: true,
  uptimeHours: true,
  uptimeMinutes: true,
  lastUpdated: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertBotStats = z.infer<typeof insertBotStatsSchema>;
export type BotStats = typeof botStats.$inferSelect;
