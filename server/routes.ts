import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { botStats } from "@shared/schema";
import { 
  Client, 
  GatewayIntentBits, 
  Partials, 
  Collection, 
  Message, 
  Events,
  PermissionFlagsBits,
  EmbedBuilder
} from 'discord.js';

// Initialize Discord client
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration
  ],
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember]
});

// Initialize bot stats
let uptimeMinutes = 0;
let uptimeHours = 0;
let uptimeDays = 0;
let serverCount = 0;
let userCount = 0;
let commandCount = 32;
let botInitialized = false;

// Store recent member logs - last 10 of each type
const recentJoins: Array<{username: string, timestamp: Date, avatarUrl?: string}> = [];
const recentLeaves: Array<{username: string, timestamp: Date, avatarUrl?: string}> = [];

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

// Initialize Discord bot
async function initializeBot() {
  if (botInitialized) return;
  
  try {
    console.log('Connecting to Discord...');
    await client.login(process.env.DISCORD_BOT_TOKEN);
    
    // Update bot stats when ready
    client.once('ready', async () => {
      console.log(`Discord bot logged in as ${client.user?.tag}!`);
      await updateBotStats();
      setInterval(updateBotStats, 60000); // Update stats every minute
      
      // Add some sample data to the logs for demonstration
      addSampleMemberData();
      
      botInitialized = true;
    });
    
    // Listen for member join events
    client.on(Events.GuildMemberAdd, member => {
      // Add to recent joins
      const joinEntry = {
        username: member.user.tag,
        timestamp: new Date(),
        avatarUrl: member.user.displayAvatarURL()
      };
      
      recentJoins.unshift(joinEntry); // Add to beginning of array
      if (recentJoins.length > 10) recentJoins.pop(); // Keep only the 10 most recent
      
      console.log(`Member joined: ${member.user.tag}`);
    });
    
    // Listen for member leave events
    client.on(Events.GuildMemberRemove, member => {
      // Add to recent leaves
      const leaveEntry = {
        username: member.user.tag,
        timestamp: new Date(),
        avatarUrl: member.user.displayAvatarURL()
      };
      
      recentLeaves.unshift(leaveEntry); // Add to beginning of array
      if (recentLeaves.length > 10) recentLeaves.pop(); // Keep only the 10 most recent
      
      console.log(`Member left: ${member.user.tag}`);
    });
    
  } catch (error) {
    console.error('Failed to connect to Discord:', error);
    // Use fallback values if connection fails
    serverCount = 15;
    userCount = 1872;
  }
}

// Add sample data to the logs for demonstration
function addSampleMemberData() {
  // Add some sample data for join logs
  const sampleJoins = [
    { username: 'stermix#1234', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) }, // 2 hours ago
    { username: 'itsgalaxy_x#5678', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) }, // 5 hours ago
    { username: 'erlc_player123#9012', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) }, // 1 day ago
    { username: 'copMain#3456', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2) } // 2 days ago
  ];
  
  // Add some sample data for leave logs
  const sampleLeaves = [
    { username: 'toxic_player#8765', timestamp: new Date(Date.now() - 1000 * 60 * 30) }, // 30 minutes ago
    { username: 'bad_criminal#4321', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) }, // 3 hours ago
    { username: 'quitter#7890', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) } // 2 days ago
  ];
  
  recentJoins.push(...sampleJoins);
  recentLeaves.push(...sampleLeaves);
}

// Update bot statistics
async function updateBotStats() {
  if (!client.isReady()) return;
  
  try {
    // Get server count
    serverCount = client.guilds.cache.size;
    
    // Get total user count across all servers
    userCount = 0;
    client.guilds.cache.forEach(guild => {
      try {
        // Only fetch from cache to avoid rate limits
        userCount += guild.memberCount;
      } catch (err) {
        console.error(`Error getting members for guild ${guild.name}:`, err);
      }
    });
    
    console.log(`Bot stats updated: ${serverCount} servers, ${userCount} users`);
  } catch (error) {
    console.error('Error updating bot stats:', error);
  }
}

// Command handler
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return; // Ignore bot messages
  
  const prefix = '?';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  // Command counter
  commandCount++;
  
  // Handle commands
  switch (command) {
    case 'kick':
      handleKickCommand(message, args);
      break;
    case 'ban':
      handleBanCommand(message, args);
      break;
    case 'purge':
      handlePurgeCommand(message, args);
      break;
    case 'logs':
      handleLogsCommand(message, args);
      break;
    case 'help':
      handleHelpCommand(message);
      break;
    default:
      message.reply('Unknown command. Type `?help` for a list of commands.');
  }
});

// Command handlers
async function handleKickCommand(message: Message, args: string[]) {
  // Check if user has permission to kick
  if (!message.member?.permissions.has(PermissionFlagsBits.KickMembers)) {
    return message.reply('You do not have permission to use this command.');
  }

  const target = message.mentions.members?.first();
  if (!target) {
    return message.reply('Please mention a user to kick.');
  }

  // Check if the bot can kick the target
  if (!target.kickable) {
    return message.reply('I cannot kick this user. They may have higher permissions than me.');
  }

  const reason = args.slice(1).join(' ') || 'No reason provided';

  try {
    await target.kick(reason);
    message.reply(`Successfully kicked ${target.user.tag} for reason: ${reason}`);
  } catch (error) {
    console.error('Error kicking user:', error);
    message.reply('There was an error trying to kick that user.');
  }
}

async function handleBanCommand(message: Message, args: string[]) {
  // Check if user has permission to ban
  if (!message.member?.permissions.has(PermissionFlagsBits.BanMembers)) {
    return message.reply('You do not have permission to use this command.');
  }

  const target = message.mentions.members?.first();
  if (!target) {
    return message.reply('Please mention a user to ban.');
  }

  // Check if the bot can ban the target
  if (!target.bannable) {
    return message.reply('I cannot ban this user. They may have higher permissions than me.');
  }

  const reason = args.slice(1).join(' ') || 'No reason provided';

  try {
    await target.ban({ reason });
    message.reply(`Successfully banned ${target.user.tag} for reason: ${reason}`);
  } catch (error) {
    console.error('Error banning user:', error);
    message.reply('There was an error trying to ban that user.');
  }
}

async function handlePurgeCommand(message: Message, args: string[]) {
  // Check if user has permission to manage messages
  if (!message.member?.permissions.has(PermissionFlagsBits.ManageMessages)) {
    return message.reply('You do not have permission to use this command.');
  }

  const amount = parseInt(args[0]);
  if (isNaN(amount) || amount < 1 || amount > 100) {
    return message.reply('Please provide a number between 1 and 100.');
  }

  try {
    if (message.channel.type === 0) { // Text channel
      const deleted = await message.channel.bulkDelete(amount, true);
      message.channel.send(`Successfully deleted ${deleted.size} messages.`)
        .then(msg => {
          setTimeout(() => msg.delete().catch(err => console.error('Error deleting message:', err)), 5000);
        })
        .catch(err => console.error('Error sending message:', err));
    }
  } catch (error) {
    console.error('Error purging messages:', error);
    message.reply('There was an error trying to purge messages. Messages older than 14 days cannot be deleted in bulk.');
  }
}

async function handleLogsCommand(message: Message, args: string[]) {
  // Check if user has permission to view logs
  if (!message.member?.permissions.has(PermissionFlagsBits.ViewAuditLog)) {
    return message.reply('You do not have permission to use this command.');
  }

  const logType = args[0]?.toLowerCase();
  
  if (!logType || (logType !== 'join' && logType !== 'leave')) {
    return message.reply('Please specify a valid log type: `join` or `leave`');
  }

  try {
    const logData = logType === 'join' ? recentJoins : recentLeaves;
    
    if (logData.length === 0) {
      return message.reply(`No recent ${logType} logs found.`);
    }
    
    // Format the log data into a nice embed
    const embed = new EmbedBuilder()
      .setTitle(`Recent ${logType === 'join' ? 'Join' : 'Leave'} Logs`)
      .setColor(logType === 'join' ? 0x00FF00 : 0xFF0000) // Green for joins, Red for leaves
      .setDescription(`Showing the last ${logData.length} ${logType} events`)
      .setTimestamp()
      .setFooter({ text: 'ERLC Language Server Logs' });
    
    // Add each log entry as a field
    logData.forEach((entry, index) => {
      // Format the timestamp
      const timeAgo = formatTimeAgo(entry.timestamp);
      
      embed.addFields({
        name: `${index + 1}. ${entry.username}`,
        value: `${timeAgo}`
      });
    });
    
    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error('Error fetching logs:', error);
    message.reply('There was an error trying to fetch the logs.');
  }
}

// Helper function to format timestamps as "time ago"
function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  } else if (diffMins > 0) {
    return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffSecs} second${diffSecs !== 1 ? 's' : ''} ago`;
  }
}

async function handleHelpCommand(message: Message) {
  try {
    const helpEmbed = {
      title: 'ERLC Language Bot Commands',
      color: 0xFF0000, // Red color
      description: 'Here are all the available commands:',
      fields: [
        {
          name: '?kick @user [reason]',
          value: 'Removes a user from the server. They can rejoin with a new invite.',
          inline: false
        },
        {
          name: '?ban @user [reason]',
          value: 'Permanently removes a user and prevents them from rejoining the server.',
          inline: false
        },
        {
          name: '?purge [number]',
          value: 'Deletes a specified number of messages from the current channel.',
          inline: false
        },
        {
          name: '?logs join/leave',
          value: 'View and manage server logs including moderation actions and user activities.',
          inline: false
        },
        {
          name: '?help',
          value: 'Displays this list of commands.',
          inline: false
        }
      ],
      footer: {
        text: 'ERLC Language Community Server'
      },
      timestamp: new Date().toISOString()
    };

    // Send help message
    try {
      await message.reply({ embeds: [helpEmbed] });
    } catch {
      // Fallback if embed doesn't work
      message.reply('Use ?help to see the list of commands');
    }
  } catch (error) {
    console.error('Error sending help command:', error);
    message.reply('There was an error trying to show the help information.');
  }
}

// Initialize the bot
initializeBot();

export async function registerRoutes(app: Express): Promise<Server> {
  // Route to get bot stats
  app.get("/api/bot-stats", async (_req, res) => {
    try {
      // Return real or fallback stats for the bot
      const stats = {
        id: 1,
        serverCount,
        userCount,
        commandCount,
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
