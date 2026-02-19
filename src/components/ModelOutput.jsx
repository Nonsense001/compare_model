import { loadModelOutput } from '../utils/dataloader'

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

    // テキストコンテンツの場合
    return (
        <div className="model-output">
            <pre>{content}</pre>
        </div>
    )
}
