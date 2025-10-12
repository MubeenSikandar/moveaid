# Troubleshooting Guide

## Next.js Cache Issues (ENOENT Errors)

### Problem

You might encounter errors like:

```
Error: ENOENT: no such file or directory, open '.next/static/development/_buildManifest.js.tmp...'
```

### Quick Fix

```bash
npm run clean
npm run dev
```

Or use the combined command:

```bash
npm run dev:clean
```

### Prevention Methods

#### 1. **Use Clean Scripts** (Recommended)

We've added these scripts to `package.json`:

- `npm run clean` - Removes `.next` directory
- `npm run clean:all` - Removes `.next` and `node_modules/.cache`
- `npm run dev:clean` - Cleans cache and starts dev server
- `npm run build:clean` - Cleans cache and builds

**When to use:**

- After pulling new code from git
- After switching branches
- After updating dependencies
- When you see cache-related errors
- After a long period of inactivity

#### 2. **Stop Multiple Dev Servers**

Only run ONE dev server at a time:

```bash
# Check if dev server is already running
lsof -i :3000
lsof -i :3001

# Kill process if needed
kill -9 <PID>
```

#### 3. **Proper Shutdown**

Always stop the dev server properly:

- Use `Ctrl + C` in terminal (not just closing the terminal window)
- Wait for graceful shutdown before closing terminal

#### 4. **File System Watchers**

On macOS, increase file system watchers if needed:

```bash
# Check current limit
sysctl -n kern.maxfiles

# If issues persist, consider increasing watchers
# (usually not necessary for most projects)
```

#### 5. **IDE Integration**

If using VS Code or other IDEs:

- Don't run multiple terminals with dev servers
- Use the integrated terminal
- Close old terminal sessions before starting new ones

#### 6. **Restart Dev Server Regularly**

If you've made many changes:

1. Stop the dev server (`Ctrl + C`)
2. Run `npm run dev:clean`
3. This ensures a fresh start

### Common Causes

1. **Multiple dev servers running** - Most common cause
2. **Abrupt terminal closure** - Doesn't clean up properly
3. **File system sync issues** - Especially with cloud storage (Dropbox, OneDrive)
4. **Git operations** - Branch switching while dev server is running
5. **Insufficient permissions** - File system permissions issues

### Best Practices

✅ **DO:**

- Use `npm run dev:clean` when starting fresh
- Stop dev server before switching git branches
- Use `Ctrl + C` to stop the dev server
- Run `npm run clean` after pulling code changes
- Keep only one dev server running

❌ **DON'T:**

- Close terminal window without stopping dev server
- Run multiple dev servers simultaneously
- Switch branches while dev server is running
- Store project in cloud-synced folders (Dropbox, OneDrive)

### Nuclear Option

If all else fails:

```bash
# Stop all Node processes
killall node

# Remove all caches
npm run clean:all

# Reinstall dependencies
rm -rf node_modules
npm install

# Start fresh
npm run dev
```

### Still Having Issues?

1. Check if another process is using the `.next` directory:

   ```bash
   lsof | grep .next
   ```

2. Ensure you have write permissions:

   ```bash
   ls -la .next
   ```

3. Try a different port:

   ```bash
   PORT=3002 npm run dev
   ```

4. Update Next.js:
   ```bash
   npm update next
   ```

### Automated Prevention

The project now includes:

- Optimized `next.config.ts` for better cache handling
- Clean scripts for easy cache clearing
- `.gitignore` properly configured to ignore `.next` directory

These configurations help prevent cache issues from occurring in the first place.
