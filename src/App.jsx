import { useState } from 'react'
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels'
import Sidebar from './components/Sidebar'
import ComparisonView from './components/ComparisonView'
import DetailView from './components/DetailView'

import promptData from './data/prompt.json'
import modelData from './data/model.json'

export default function App() {
    const [selectedPromptId, setSelectedPromptId] = useState(
        promptData.length > 0 ? promptData[0].id : null
    )
    const [leftModelId, setLeftModelId] = useState(
        modelData.length > 0 ? modelData[0].id : null
    )
    const [rightModelId, setRightModelId] = useState(
        modelData.length > 1 ? modelData[1].id : modelData.length > 0 ? modelData[0].id : null
    )

    const selectedPrompt = promptData.find(p => p.id === selectedPromptId) || null

    return (
        <div className="app-container">
            <PanelGroup direction="horizontal">
                {/* Sidebar */}
                <Panel defaultSize={12} minSize={8} maxSize={25}>
                    <Sidebar
                        prompts={promptData}
                        selectedPromptId={selectedPromptId}
                        onSelectPrompt={setSelectedPromptId}
                    />
                </Panel>

                <PanelResizeHandle className="resize-handle-horizontal" />

                {/* Main Area */}
                <Panel defaultSize={88}>
                    <PanelGroup direction="vertical">
                        {/* Comparison View */}
                        <Panel defaultSize={70} minSize={30}>
                            <ComparisonView
                                selectedPrompt={selectedPrompt}
                                models={modelData}
                                leftModelId={leftModelId}
                                rightModelId={rightModelId}
                                onLeftModelChange={setLeftModelId}
                                onRightModelChange={setRightModelId}
                            />
                        </Panel>

                        <PanelResizeHandle className="resize-handle-vertical" />

                        {/* Detail View */}
                        <Panel defaultSize={30} minSize={15}>
                            <DetailView selectedPrompt={selectedPrompt} />
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    )
}
