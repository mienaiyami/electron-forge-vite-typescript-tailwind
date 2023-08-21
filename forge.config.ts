import { renameSync } from "fs";
import pkgJSON from "./package.json";

import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { VitePlugin } from "@electron-forge/plugin-vite";

const config: ForgeConfig = {
    packagerConfig: {
        name: pkgJSON.productName,
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({}),
        new MakerZIP({}, ["win32"]),
        new MakerDeb({
            options: {
                maintainer: pkgJSON.author.name,
                homepage: pkgJSON.author.url,
                bin: "./" + pkgJSON.productName,
            },
        }),
        new MakerRpm({}),
    ],
    plugins: [
        new VitePlugin({
            build: [
                {
                    // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
                    entry: "src/electron/main.ts",
                    config: "vite.main.config.ts",
                },
                {
                    entry: "src/electron/preload.ts",
                    config: "vite.preload.config.ts",
                },
            ],
            renderer: [
                {
                    name: "main_window",
                    config: "vite.renderer.config.ts",
                },
            ],
        }),
    ],
    hooks: {
        postMake: (config, makeResults) => {
            return new Promise((res) => {
                // writeFileSync("./test.json", JSON.stringify(makeResults, null, "\t"));
                makeResults.forEach((e, i1) => {
                    e.artifacts.forEach((e, i2) => {
                        const newName = e.replace(pkgJSON.version, "v" + pkgJSON.version);
                        makeResults[i1].artifacts[i2] = newName;
                        renameSync(e, newName);
                    });
                });
                res(makeResults);
            });
        },
    },
};

export default config;
