const fs = require("fs");
const path = require("path");

describe("Environment Configuration Tests", () => {
  test("next.config.ts should have proper configuration", () => {
    const nextConfigPath = path.join(process.cwd(), "next.config.ts");
    const configExists = fs.existsSync(nextConfigPath);
    expect(configExists).toBe(true);

    if (configExists) {
      const content = fs.readFileSync(nextConfigPath, "utf8");
      // Check if it's a valid Next.js config file
      expect(content).toContain("nextConfig");
    }
  });

  test("environment variables should be properly configured", () => {
    // Check if example env file exists for reference
    const hasEnvExample =
      fs.existsSync(path.join(process.cwd(), ".env.example")) ||
      fs.existsSync(path.join(process.cwd(), ".env.local.example"));

    // Not a failure if missing, but good practice to have
    if (!hasEnvExample) {
      console.warn(
        "Warning: No .env.example file found. Consider adding one for better developer experience."
      );
    }

    // Check if .env is properly git-ignored
    const gitignorePath = path.join(process.cwd(), ".gitignore");
    if (fs.existsSync(gitignorePath)) {
      const gitignore = fs.readFileSync(gitignorePath, "utf8");
      const envsIgnored =
        gitignore.includes(".env") ||
        gitignore.includes(".env.local") ||
        gitignore.includes(".env*");
      expect(envsIgnored).toBe(true);
    } else {
      // Create minimal gitignore if it doesn't exist
      fs.writeFileSync(
        gitignorePath,
        ".env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\n"
      );
      console.warn("Created basic .gitignore file with env files ignored.");
    }
  });

  test("docker-compose.yml should be properly configured", () => {
    const dockerComposePath = path.join(process.cwd(), "docker-compose.yml");
    const composeExists = fs.existsSync(dockerComposePath);
    expect(composeExists).toBe(true);

    if (composeExists) {
      const content = fs.readFileSync(dockerComposePath, "utf8");
      // Check for basic docker-compose structure
      expect(content).toContain("version:");
      expect(content).toContain("services:");
    }
  });
});
