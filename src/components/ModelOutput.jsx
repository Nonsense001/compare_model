import { marked } from 'marked'
import { loadModelOutput } from '../utils/dataloader'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function ModelOutput({ model, prompt }) {
    if (!model || !prompt) {
        return (
            <div className="empty-state">
                <span className="empty-state-icon">🤖</span>
                <span className="empty-state-text">モデルを選択してください</span>
            </div>
        )
    }

    const content = loadModelOutput(model.output, prompt.id, prompt.extension)

    if (content === null) {
        return (
            <div className="error-state">
                <span className="error-state-icon">⚠️</span>
                <span className="error-state-text">Data Not Found</span>
                <span className="error-state-detail">
                    {model.output}{prompt.id}.{prompt.extension}
                </span>
            </div>
        )
    }

    // HTML コンテンツの場合は iframe で表示
    if (prompt.extension === 'html') {
        return (
            <div className="model-output-iframe">
                <iframe
                    srcDoc={content}
                    sandbox="allow-scripts"
                    title={`${model.name} - ${prompt.id}`}
                />
            </div>
        )
    }

    // Markdown コンテンツの場合はレンダリングして表示
    if (prompt.extension === 'md') {
        return (
            <div
                className="model-output markdown-body"
                dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
            />
        )
    }

    // lang（ソースコード）の表示
    if (prompt.extension === 'lang') {
        return (
            <div className="model-output-code">
                <SyntaxHighlighter
                    style={vs2015} // VS Code風ダークテーマ (hljs用)
                    showLineNumbers={true}
                    customStyle={{
                        margin: 0,
                        padding: '16px',
                        background: 'transparent',
                        fontSize: '13px',
                        fontFamily: 'var(--font-mono)'
                    }}
                >
                    {content}
                </SyntaxHighlighter>
            </div>
        )
    }

    // テキストコンテンツの場合
    return (
        <div className="model-output">
            <pre>{content}</pre>
        </div>
    )
}
