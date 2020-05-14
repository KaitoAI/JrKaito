const { readdirSync } = require("fs");

module.exports = (bot) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../../commands/${dir}/${file}`);
    
            if (pull.name) {
                bot.commands.set(pull.name, pull);
            }
    
            if (pull.config.aliases && Array.isArray(pull.config.aliases)) pull.config.aliases.forEach(alias => bot.aliases.set(alias, pull.config.name));
        }
    });
}