import { loadContent } from '../utils/dataloader'

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

    return (
        <div className="detail-view">
            {/* Prompt Section */}
            <div className="detail-section">
                <div className="detail-section-header">
                    <h3>Prompt</h3>
                </div>
                <div className="detail-section-content">
                    {promptContent !== null ? (
                        <pre>{promptContent}</pre>
                    ) : (
                        <div className="error-state">
                            <span className="error-state-icon">⚠️</span>
                            <span className="error-state-text">Data Not Found</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Expected Output Section */}
            <div className="detail-section">
                <div className="detail-section-header">
                    <h3>Expected</h3>
                </div>
                <div className="detail-section-content">
                    {expectedContent !== null ? (
                        <pre>{expectedContent}</pre>
                    ) : (
                        <div className="error-state">
                            <span className="error-state-icon">⚠️</span>
                            <span className="error-state-text">Data Not Found</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
