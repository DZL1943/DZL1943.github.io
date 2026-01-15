let TFile;

const imageExtensions = ['avif', 'bmp', 'gif', 'jpeg', 'jpg', 'png', 'svg', 'webp'];

function getByIndex(arr, pos) {
    return arr?.[Math.max(0,Math.min(pos < 0 ? arr.length + pos : pos, arr.length - 1))];
}

async function poll(func, { interval = 100, timeout = 3000, attempts } = {}) {
    const endTime = Date.now() + timeout;
    for (let count = 0; Date.now() < endTime && (!attempts || count < attempts); count++) {
        const result = await func();
        if (result) return result;
        await new Promise(r => setTimeout(r, interval));
    }
}

// const tagPartsCache = new WeakMap();

function getTagParts(tags) {
    if (!tags) return new Set();
    
    // if (tagPartsCache.has(tags)) {
    //     return tagPartsCache.get(tags);
    // }
    
    const parts = new Set();
    
    for (const tag of tags) {
        const segments = tag.split('/');
        for (let i = 0; i < segments.length; i++) {
            for (let j = i; j < segments.length; j++) {
                const subPath = segments.slice(i, j + 1).join('/');
                parts.add(subPath);
            }
        }
    }
    
    // tagPartsCache.set(tags, parts);
    return parts;
}

function hasTag(tags, pattern) {
    const regex = new RegExp(`(^|/)${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(/|$)`);
    return tags?.some(tag => regex.test(tag)) ?? false;
}

async function renameAttachment(file) {
    if (!imageExtensions.includes(file.extension.toLowerCase())) return;
    
    const newName = `${file.stat.ctime}-${file.stat.size}.${file.extension}`;
    if (file.name === newName) return;
    
    await app.fileManager.renameFile(file, `${file.parent.path}/${newName}`);
}

async function renameAttachmentsInFolder(folder) {
    const files = Array.from(folder.children).filter(e => e instanceof TFile);
    
    for (const file of files) {
        try {
            await renameAttachment(file);
        } catch (error) {
            console.error(`Failed to rename ${file.path}`, error);
        }
    }
}

async function renameAttachmentsInFile(file) {
    if (file.extension !== 'md') return;
    
    const cache = app.metadataCache.getFileCache(file);
    const links = [
        ...(cache?.embeds?.map(e => e.link) || []),
        ...(cache?.frontmatterLinks?.map(e => e.link) || [])
    ].filter(link => link);
    const processed = new Set();
    
    for (const link of links) {
        try {
            const attachment = app.metadataCache.getFirstLinkpathDest(link, file.path);
            if (attachment && !processed.has(attachment.path)) {
                processed.add(attachment.path);
                await renameAttachment(attachment);
            }
        } catch (error) {
            console.error(`Failed to rename ${link}`, error);
        }
    }
}

async function downloadAttachments(file) {
    if (file.extension !== 'md') return;
    await app.workspace.getLeaf().openFile(file);
    await app.commands.executeCommandById('editor:download-attachments');
    (await poll(() => document.querySelector('.mod-cta')))?.click();
    
    if(!await poll(() => {
        const cache = app.metadataCache.getFileCache(file);
        return !!(cache?.embeds?.length || cache?.frontmatterLinks?.length);
    })) return;
    
    const cache = app.metadataCache.getFileCache(file);
    const fm = cache.frontmatter;
    if (!fm.image && cache.embeds?.length) {
        await app.fileManager.processFrontMatter(file, (fm) => {
            fm.image = `[[${getByIndex(cache.embeds, -1).link}]]`;
        });
    }
}

async function registerEvent(params) {
    app.plugins.plugins.quickadd.registerEvent(app.vault.on('create', async (file) => {
        if (file.extension === 'md') {
            if (!await poll(() => {
                const tags = app.metadataCache.getFileCache(file)?.frontmatter?.tags;
                if (!tags) return false;
                
                const tagParts = getTagParts(tags);
                return tagParts.has('clippings');
            })) return;
            await downloadAttachments(file);
            await renameAttachmentsInFile(file);
        } 
        // else {
            //     renameAttachment(file);
        // }
    }));
    console.log('registered');
}

async function cleanUnusedAttachments(params) {
    const {quickAddApi = app.plugins.plugins.quickadd.api} = params || {};
    const attachments = app.vault.getFiles().filter(f => imageExtensions.includes(f.extension.toLowerCase()));
    
    const unused = Object.fromEntries(
        attachments
            .filter((a) => !app.metadataCache.getBacklinksForFile(a)?.data?.size)
            .map((a) => [a.path, a])
    );

    const selected = await quickAddApi.checkboxPrompt(Object.keys(unused));
    for (path of selected) {
        try {
            await app.vault.delete(unused[path]);
            console.log(`Delete ${path} success.`);
        } catch(error) {
            console.error(`Delete ${path} failed: ${error}`);
        }
    }
}

module.exports = {
    registerEvent,
    downloadAttachments: async (params) => {
        await downloadAttachments(app.workspace.getActiveFile());
    },
    downloadAndRenameAttachments: async (params) => {
        const file = app.workspace.getActiveFile();
        await downloadAttachments(file);
        await renameAttachmentsInFile(file);
    },
    renameAttachmentsInCurrentFile: async (params) => {
        await renameAttachmentsInFile(app.workspace.getActiveFile());
    },
    renameAttachmentsInFolder: async (params) => {
        const { app, obsidian, quickAddApi } = params || {};
        ({TFile} = obsidian);
        const folders = app.vault.getAllFolders(true);
        const folder = await quickAddApi.suggester(
            folders.map(i=>i.path),
            folders
        );
        await renameAttachmentsInFolder(folder);
    },
    cleanUnusedAttachments,
};