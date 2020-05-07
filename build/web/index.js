var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
() => {
    function webcord(url, name = null, avatar_url = null) {
        this['webhook'] = url;
        this['name'] = name;
        this['avatar_url'] = avatar_url;
        this['message'] = {
            embeds: [{}]
        };
        if (name)
            Object.assign(this.message, {
                'username': name
            });
        if (avatar_url && this.avatar_url)
            Object.assign(this.message, {
                'avatar_url': avatar_url
            });
    }
    webcord.prototype.setTitle = function (text) {
        Object.assign(this.message.embeds[0], {
            title: text
        });
        return this;
    };
    webcord.prototype.setDescription = function (text) {
        Object.assign(this.message.embeds[0], {
            description: text
        });
        return this;
    };
    webcord.prototype.addField = function (title, value, inline = false) {
        if (!this.message.embeds[0].fields) {
            Object.assign(this.message.embeds[0], {
                fields: new Array
            });
        }
        this.message.embeds[0].fields.push({
            name: title,
            value: value,
            inline: inline
        });
        return this;
    };
    webcord.prototype.setColor = function (hex) {
        if (typeof hex === 'string') {
            hex = hex.replace(/#/g, '');
            hex = parseInt(hex, 16);
        }
        Object.assign(this.message.embeds[0], {
            color: hex
        });
        return this;
    };
    webcord.prototype.setFooter = function (text) {
        Object.assign(this.message.embeds[0], {
            footer: {
                'text': text
            }
        });
        return this;
    };
    webcord.prototype.setImage = function (url) {
        Object.assign(this.message.embeds[0], {
            image: {
                'url': url
            }
        });
        return this;
    };
    webcord.prototype.setURL = function (url) {
        Object.assign(this.message.embeds[0], {
            url: url
        });
        return this;
    };
    webcord.prototype.setThumbnail = function (url) {
        Object.assign(this.message.embeds[0], {
            thumbnail: {
                'url': url
            }
        });
        return this;
    };
    webcord.prototype.setAuthor = function (name, image = null, url = null) {
        Object.assign(this.message.embeds[0], {
            author: {
                'name': name,
                'url': url,
                'icon_url': image,
            }
        });
        return this;
    };
    webcord.prototype.setTimestamp = function () {
        Object.assign(this.message.embeds[0], {
            timestamp: new Date()
        });
        return this;
    };
    webcord.prototype.send = function (message = null) {
        function post(webhook, data) {
            return __awaiter(this, void 0, void 0, function* () {
                data = JSON.stringify(data);
                require('node-fetch')(webhook, {
                    method: 'post',
                    body: data,
                    headers: { 'Content-Type': 'application/json' },
                }).then().catch((err) => {
                    if (err) {
                        if (err.code === 'ECONNRESET' || 'ETIMEDOUT')
                            return console.error('oof');
                        if (err.body && err.body.code === 50006)
                            return console.error('oof');
                    }
                });
            });
        }
        function isEmpty(obj) {
            return Object.keys(obj).length === 0 && obj.constructor === Object;
        }
        if (message && !isEmpty(this.message.embeds[0])) {
            post(this.webhook, { 'content': message, 'embeds': this.message.embeds, 'username': this.name, 'avatar_url': this.avatar_url });
        }
        else if (message && isEmpty(this.message.embeds[0])) {
            post(this.webhook, { 'content': message, embeds: {}, 'username': this.name, 'avatar_url': this.avatar_url });
        }
        else if (!message && !isEmpty(this.message.embeds[0])) {
            post(this.webhook, { 'content': '', 'embeds': this.message.embeds, 'username': this.name, 'avatar_url': this.avatar_url });
        }
        else
            return console.error('oof');
    };
};