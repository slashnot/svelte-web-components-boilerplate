let TemplateEngine = function (tpl, data) {
    let re = /%-([^-%']+)?-%/g,
        code = 'let r=[];\n',
        cursor = 0,
        match;
    let add = function (line, js) {
        js ? code += 'r.push(' + line + ');\n' :
            code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
    }

    while (match = re.exec(tpl)) {
        add(tpl.slice(cursor, match.index));
        add(match[1], true);
        cursor = match.index + match[0].length;
    }

    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}

const renderTemplate = () => {
    let tpl = this.innerHTML;
    let tplHtml = TemplateEngine(tpl, {
        name: "Ram",
        profile: {
            age: 30
        }
    });
    this.innerHTML = tplHtml;
}

const htmlToElement = (html) => {
    var template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.childNodes;
}

export default TemplateEngine;