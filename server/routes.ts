import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { botStats } from "@shared/schema";

// Initialize bot stats
let uptimeMinutes = 37;
let uptimeHours = 14;
let uptimeDays = 29;

// Update uptime every minute
setInterval(() => {
  uptimeMinutes++;
  if (uptimeMinutes >= 60) {
    uptimeMinutes = 0;
    uptimeHours++;
    if (uptimeHours >= 24) {
      uptimeHours = 0;
      uptimeDays++;
    }
  }
}, 60000);

export async function registerRoutes(app: Express): Promise<Server> {
  // Route to get bot stats
  app.get("/api/bot-stats", async (_req, res) => {
    try {
      // Return mock stats for the bot since we don't have a real Discord bot to query
      const stats = {
        id: 1,
        serverCount: 15,
        userCount: 1872,
        commandCount: 32,
        uptimeDays,
        uptimeHours,
        uptimeMinutes,
        lastUpdated: new Date().toISOString()
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching bot stats:", error);
      res.status(500).json({ message: "Failed to fetch bot stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
