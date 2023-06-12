import fastify from "fastify";
import fs from "fs";
import yaml from "yaml";

let data = yaml.parse(fs.readFileSync("data.yml", "utf-8"));

const server = fastify({ logger: true });

server.get("/", async (req, res) => "online");
server.get("/refresh", async (req, res) => {
    try {
        data = yaml.parse(fs.readFileSync("data.yml", "utf-8"));
        return "OK";
    } catch (error) {
        server.log.error(error);
        return "INVALID";
    }
});

server.get("/genshin/characters", async (req, res) => data.genshin.characters);

server.listen({ port: parseInt(process.env.PORT ?? "5000") }).catch((error) => {
    server.log.error(error);
    process.exit(1);
});
