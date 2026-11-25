import { spawnSync } from "node:child_process";
const result = spawnSync("pnpm", ["exec", "vite", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    STAGE10_PRIVATE_CANARY: "STAGE10_SERVER_ONLY_CANARY",
    VITE_PUBLIC_LABEL: "PUBLIC_LABEL",
  },
});
if (result.status !== 0) process.exit(result.status || 1);
