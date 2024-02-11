import * as vscode from 'vscode';
import * as lc from 'vscode-languageclient/node.js';
import * as path from 'path';

/** @type {lc.LanguageClient} */
let client;

/** @param {import('vscode').ExtensionContext} context */
export async function activate(context) {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(
        path.join('dist', 'server.cjs'),
    );
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can
    // attach to the server for debugging
    const debugOptions = {execArgv: ['--nolazy', '--inspect=6009']};

    // If the extension is launched in debug mode then the debug server options
    // are used. Otherwise the run options are used
    /** @type {lc.ServerOptions} */
    const serverOptions = {
        run: {module: serverModule, transport: lc.TransportKind.ipc},
        debug: {
            module: serverModule,
            transport: lc.TransportKind.ipc,
            options: debugOptions,
        },
    };

    // Options to control the language client
    /** @type {lc.LanguageClientOptions} */
    const clientOptions = {
        documentSelector: [{scheme: 'file', language: 'scarpet'}],
    };

    // Create the language client and start the client.
    client = new lc.LanguageClient(
        'scarpet',
        'Scarpet Language Server',
        serverOptions,
        clientOptions,
    );

    vscode.debug.registerDebugConfigurationProvider('scarpet', {

    });

    vscode.debug.registerDebugAdapterDescriptorFactory('scarpet', {
        createDebugAdapterDescriptor(_session) {
            console.log('helel')
            return new vscode.DebugAdapterServer(6090);
        },
    });

    // Start the client. This will also launch the server
    await client.start().catch((reason) => {
        console.error(reason);
    });
}

export async function deactivate() {
    if (client) await client.stop();
}
