import { loadContent } from '../utils/dataloader'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

export default function DetailView({ selectedPrompt }) {
    if (!selectedPrompt) {
        return (
            <div className="detail-view">
                <div className="empty-state">
                    <span className="empty-state-icon">📋</span>
                    <span className="empty-state-text">プロンプトを選択してください</span>
                </div>
            </div>
        )
    }

    const promptContent = loadContent(selectedPrompt.prompt)
    const expectedContent = loadContent(selectedPrompt.expected)
    const isLang = selectedPrompt.extension === 'lang'

    const renderContent = (content) => {
        if (content === null) {
            return (
                <div className="error-state">
                    <span className="error-state-icon">⚠️</span>
                    <span className="error-state-text">Data Not Found</span>
                </div>
            )
        }

        if (isLang) {
            return (
                <div className="detail-section-code">
                    <SyntaxHighlighter
                        style={vs2015}
                        showLineNumbers={true}
                        customStyle={{
                            margin: 0,
                            padding: '14px 16px',
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

        return <pre>{content}</pre>
    }

    return (
        <div className="detail-view">
            {/* Prompt Section */}
            <div className="detail-section">
                <div className="detail-section-header">
                    <h3>Prompt</h3>
                </div>
                <div className="detail-section-content" style={{ padding: isLang ? 0 : '14px 16px' }}>
                    {renderContent(promptContent)}
                </div>
            </div>

            {/* Expected Output Section */}
            <div className="detail-section">
                <div className="detail-section-header">
                    <h3>Expected</h3>
                </div>
                <div className="detail-section-content" style={{ padding: isLang ? 0 : '14px 16px' }}>
                    {renderContent(expectedContent)}
                </div>
            </div>
        </div>
    )
}
