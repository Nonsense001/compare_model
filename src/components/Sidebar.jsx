export default function Sidebar({ prompts, selectedPromptId, onSelectPrompt }) {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Prompts</h2>
            </div>
            <div className="sidebar-list">
                {prompts.map(prompt => (
                    <div
                        key={prompt.id}
                        className={`sidebar-item ${prompt.id === selectedPromptId ? 'active' : ''}`}
                        onClick={() => onSelectPrompt(prompt.id)}
                    >
                        <span className="sidebar-item-id">{prompt.id}</span>
                        <span className="sidebar-item-title">{prompt.title}</span>
                    </div>
                ))}
                {prompts.length === 0 && (
                    <div className="empty-state">
                        <span className="empty-state-icon">📝</span>
                        <span className="empty-state-text">No prompts</span>
                    </div>
                )}
            </div>
        </div>
    )
}
