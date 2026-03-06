/**
 * dataloader.js
 * 
 * Vite の import.meta.glob を使用して src/data 以下の
 * テキストファイルと HTML ファイルを一括読み込みし、
 * パスベースでコンテンツを取得する関数を提供します。
 */

// src/data 以下の全 .txt, .html, .md, .lang ファイルを raw テキストとして読み込み
const rawFiles = import.meta.glob('../data/**/*.{txt,html,md,lang}', {
    query: '?raw',
    eager: true,
})

/**
 * パスの正規化（./prompts/p0.txt → ../data/prompts/p0.txt）
 */
function normalizePath(relativePath) {
    // JSON 内の相対パス（"./prompts/p0.txt"）を
    // import.meta.glob のキー形式（"../data/prompts/p0.txt"）に変換
    return relativePath.replace(/^\.\//, '../data/')
}

/**
 * 指定パスのファイルコンテンツを取得
 * @param {string} relativePath - JSON内の相対パス (e.g. "./prompts/p0.txt")
 * @returns {string|null} ファイルの内容。見つからない場合は null
 */
export function loadContent(relativePath) {
    const key = normalizePath(relativePath)

    // import.meta.glob のキーと照合
    for (const [filePath, module] of Object.entries(rawFiles)) {
        if (filePath.endsWith(key.replace('../data/', '')) || filePath === key) {
            return module.default || module
        }
    }
    return null
}

/**
 * モデル出力のファイルパスを構築して内容を取得
 * @param {string} outputDir - モデルの output ディレクトリ (e.g. "./outputs/m0/")
 * @param {string} promptId - プロンプトID (e.g. "p0")
 * @param {string} extension - ファイル拡張子 (e.g. "txt" or "html")
 * @returns {string|null}
 */
export function loadModelOutput(outputDir, promptId, extension) {
    // outputDir: "./outputs/m0/" + promptId + "." + extension
    const path = `${outputDir}${promptId}.${extension}`
    return loadContent(path)
}
