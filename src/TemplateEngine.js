let TemplateEngine = function (tpl, data) {
    let re = /{([^}]+)?}/g, code = 'let r=[];\n', cursor = 0, match;
    let add = function(line, js) {
        js? code += 'r.push(' + line + ');\n' :
            code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
    }

    while(match = re.exec(tpl)) {
        add(tpl.slice(cursor, match.index));
        add(match[1], true);     cursor = match.index + match[0].length;
    }
  
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}

let template = '<p>Hello, my name is {this.name}. I\'m {this.profile.age} years old.</p>';
console.log(TemplateEngine(template, {
    name: "Krasimir Tsonev",
    profile: {
        age: 29
    }
}));

export {
    TemplateEngine
}