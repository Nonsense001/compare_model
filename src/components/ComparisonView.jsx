import ModelOutput from './ModelOutput'

export default function ComparisonView({
    selectedPrompt,
    models,
    leftModelId,
    rightModelId,
    onLeftModelChange,
    onRightModelChange,
}) {
    if (!selectedPrompt) {
        return (
            <div className="comparison-view">
                <div className="empty-state">
                    <span className="empty-state-icon">📊</span>
                    <span className="empty-state-text">プロンプトを選択してください</span>
                </div>
            </div>
        )
    }

    const leftModel = models.find(m => m.id === leftModelId) || null
    const rightModel = models.find(m => m.id === rightModelId) || null

    return (
        <div className="comparison-view">
            {/* Left Pane */}
            <div className="comparison-pane">
                <div className="comparison-pane-header">
                    <span className="comparison-pane-label">Left</span>
                    <select
                        className="model-select"
                        value={leftModelId || ''}
                        onChange={e => onLeftModelChange(e.target.value)}
                    >
                        {models.map(model => (
                            <option key={model.id} value={model.id}>
                                {model.name}
                            </option>
                        ))}
                    </select>
                </div>
                <ModelOutput
                    model={leftModel}
                    prompt={selectedPrompt}
                />
            </div>

            {/* Right Pane */}
            <div className="comparison-pane">
                <div className="comparison-pane-header">
                    <span className="comparison-pane-label">Right</span>
                    <select
                        className="model-select"
                        value={rightModelId || ''}
                        onChange={e => onRightModelChange(e.target.value)}
                    >
                        {models.map(model => (
                            <option key={model.id} value={model.id}>
                                {model.name}
                            </option>
                        ))}
                    </select>
                </div>
                <ModelOutput
                    model={rightModel}
                    prompt={selectedPrompt}
                />
            </div>
        </div>
    )
}
