# AI Model Compare

AIモデルの出力結果を並べて比較するウェブアプリです。

## 起動方法

```bash
npm install
npm run dev
```

`http://localhost:5173/` で起動します。

## 技術スタック

- React 19 + Vite 6
- react-resizable-panels（リサイズ可能なレイアウト）
- Vanilla CSS（ダークテーマ）

## ディレクトリ構成

```
compare_model/
├── index.html                  # HTMLエントリポイント
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                # Reactエントリポイント
    ├── index.css               # グローバルスタイル（ダークテーマ、100vh固定）
    ├── App.jsx                 # メインレイアウト & 状態管理
    ├── components/
    │   ├── Sidebar.jsx         # プロンプト一覧（左カラム）
    │   ├── ComparisonView.jsx  # 比較ビュー（左右分割、モデル選択）
    │   ├── ModelOutput.jsx     # 出力レンダリング（txt/html/エラー）
    │   └── DetailView.jsx      # プロンプト & 想定解（下カラム）
    ├── utils/
    │   └── dataloader.js       # データ読み込みユーティリティ
    └── data/
        ├── prompt.json         # プロンプト定義
        ├── model.json          # モデル定義
        ├── prompts/            # プロンプト本文 (.txt)
        ├── expected/           # 想定解 (.txt)
        └── outputs/            # モデル出力（モデルID別フォルダ）
            └── {modelId}/      # 例: m0/, m1/, ...
                └── {promptId}.{ext}  # 例: p0.txt, p1.html
```

## データ管理

### prompt.json

プロンプトの定義。各プロンプトに対してファイルパスと出力形式を指定します。

```json
[
    {
        "id": "p0",
        "title": "自己紹介",
        "prompt": "./prompts/p0.txt",
        "extension": "txt",
        "expected": "./expected/p0.txt"
    }
]
```

| フィールド | 説明 |
|---|---|
| `id` | 一意のプロンプトID（出力ファイル名にも使用） |
| `title` | サイドバーに表示されるタイトル |
| `prompt` | プロンプト本文ファイルへの相対パス |
| `extension` | 出力ファイルの拡張子（`txt` or `html`） |
| `expected` | 想定解ファイルへの相対パス |

### model.json

モデルの定義。新しいモデルを追加するたびにエントリを追加します。

```json
[
    {
        "id": "m0",
        "name": "Gemini demo",
        "output": "./outputs/m0/",
        "description": "Gemini demo"
    }
]
```

| フィールド | 説明 |
|---|---|
| `id` | 一意のモデルID |
| `name` | プルダウンに表示されるモデル名 |
| `output` | 出力ファイルのディレクトリパス |
| `description` | モデルの説明 |

### データ追加手順

**プロンプトを追加する場合:**
1. `src/data/prompts/` にプロンプトファイルを追加（例: `p1.txt`）
2. `src/data/expected/` に想定解ファイルを追加（例: `p1.txt`）
3. 各モデルの `src/data/outputs/{modelId}/` に出力ファイルを追加（例: `p1.txt`）
4. `prompt.json` にエントリを追加

**モデルを追加する場合:**
1. `src/data/outputs/` にモデル用フォルダを作成（例: `m1/`）
2. フォルダ内に各プロンプトに対応する出力ファイルを追加
3. `model.json` にエントリを追加

## レイアウト

- **画面全体**: `100vh` 固定。ウィンドウスクロールなし。
- **サイドバー**（左）: プロンプト一覧。内部スクロール対応。
- **比較ビュー**（右上）: 左右にモデル出力を並べて表示。プルダウンでモデル切り替え。
- **詳細ビュー**（右下）: 選択中のプロンプトと想定解を表示。
- 各領域の境界はドラッグでリサイズ可能。

## 出力形式

- `extension: "txt"` → `<pre>` タグでテキスト表示
- `extension: "html"` → `<iframe>` でHTML/CSS/JSをレンダリング（`sandbox="allow-scripts"`）
- ファイルが見つからない場合 → "Data Not Found" エラー表示
