import path from 'path';

export function wccoaProjectPath(): string {
    const __dirname = import.meta.url
    let aux = path.normalize(new URL(__dirname).pathname).replace(/^[/\\]/, "")
    aux = path.dirname(aux);

    const wccoaProjectPath = path.resolve(process.cwd());
    aux = aux.replace(wccoaProjectPath, "")
    return wccoaProjectPath
}
export function projectPath(): string {
    const __dirname = import.meta.url
    let aux = path.normalize(new URL(__dirname).pathname).replace(/^[/\\]/, "")
    aux = path.dirname(aux);

    const wccoaProjectPath = path.resolve(process.cwd());
    aux = aux.replace(wccoaProjectPath, "")
    let isWinccoa = false;
    if (aux.includes("\\javascript\\")) {
        isWinccoa = true
    }
    const projectPath = isWinccoa ? aux.split("\\").splice(1, 2).join("/") : wccoaProjectPath;

    console.log('[WINCCOA] - ruta de instalación:', wccoaProjectPath);
    console.log('[JS] - ruta del proyecto:', projectPath);
    return projectPath
}