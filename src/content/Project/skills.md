---
title: "StrayCat - Simple Claude Bot"
date: "2026-03-24"
category: "software"
subCategory: "Side Project"
tags: ["claude-code", "ai", "automation", "workflow"]
slug: "claude-code-skills-hooks"
---

###### 我的初號機 StrayCat

---

### Skills

Skills 是可被 Claude 觸發的 Markdown 指令集，本質上就是放在 `~/.claude/skills/` 下的 `SKILL.md` 檔案，Claude Code 啟動時會讀取這些檔案作為可用指令。

這邊把 skills 抽成獨立的 Git repo，再用 symlink 指回去，這樣多台設備可以共用同一套 skills：

```powershell
# Windows（管理員）
New-Item -ItemType SymbolicLink `
  -Path "C:\Users\<user>\.claude\skills" `
  -Target "<your-path>\claude-skills"
```

目錄分層 `bots` 是組合型的自動化流程，`development` 是跨專案通用的開發技能，`work/<project>` 是針對特定專案的 scaffolding：

```text
claude-skills/
├── bots/
│   └── StrayCat/SKILL.md         ← 自動開發 Bot
├── development/
│   ├── git-worktree-dev/SKILL.md ← worktree 隔離開發
│   └── task-checklist/SKILL.md   ← 進度追蹤
└── work/<project>/               ← 專案專屬 skills
    ├── add-ddd-aggregate-efcore/SKILL.md
    ├── add-ddd-repository/SKILL.md
    └── add-ddd-usecase/SKILL.md
```

---

### 通用型 Skill

#### git-worktree-dev

用 git worktree 建立隔離的工作目錄，讓 Claude 在分支上自由操作，不影響主分支。開發過程中用 `wip:` 前綴的 commit 記錄進度，類似開發日誌。

```bash
# 建立 worktree
# 命名慣例：
# - 目錄：`../skill-task-<feature-name>`
# - 分支：`skill/<base-branch>-v<N>`（例如 `skill/main-v1`）
git worktree add ../skill-task-<feature> skill/<base-branch>-v<N>

# 開發過程中隨手 commit
git add . && git commit -m "wip: initial structure"
git add . && git commit -m "wip: add validation logic"
```

#### task-checklist

接到任務後先拆解成 checklist，寫到自產的 `task-checklist.md`，每完成一步就即時打勾。

```markdown
# Task: 實作某個功能

- [x] 讀取現有程式碼結構
- [x] 建立 Domain Model
- [ ] 產生 Infrastructure 設定
- [ ] 寫入 Application Endpoint
```

---

### 專案型 Skill — DDD Skill Chain

拿 .NET DDD 專案來說，不管業務複雜度每次新增一個 Aggregate 都要建好幾個檔案：EF Core Configuration、DbContext 註冊、Repository Interface、Repository 實作、Application Endpoint。結構固定但細節不同，很適合封裝成 skill。

三個 skill 串成一條 chain：

```text
Aggregate Root (.cs)
  │
  ├─ skill:add-ddd-aggregate-efcore
  │   → 讀取 Entity class
  │   → 產生 IEntityTypeConfiguration
  │   → 更新 AppDbContext (加 DbSet)
  │   → 產生 Domain Repository Interface
  │
  ├─ skill:add-ddd-repository
  │   → 讀取 Repository Interface（含使用者新增的自訂方法）
  │   → 產生 Infrastructure Repository 實作
  │
  └─ skill:add-ddd-usecase
      → 根據口述需求判斷 Command / Query
      → 產生 Endpoint + Validator + DTO
      → 回頭補 Domain Interface 缺的方法
      → 產生 Repository 新方法的實作
```

每個 skill 的 `SKILL.md` 裡會定義：
- 前置條件（需要哪些檔案已存在）
- 解析規則（怎麼讀 Entity 的 property、annotation comment）
- 產出模板（code template + 檔案路徑慣例）
- 確認機制（產生後先 show 給使用者看，確認才寫入）

舉例，Aggregate Root 上的 inline comment 可以控制 EF Core mapping：

```csharp
public class Order : AggregateRoot<OrderId>
{
    public string CustomerName { get; private set; }  // MaxLength: 100
    public string? Note { get; private set; }          // MaxLength: 500
    public decimal TotalAmount { get; private set; }
    public IReadOnlyList<int> ItemIds { get; private set; } = []; // Ignore
}
```

Skill 會解析這些 comment，自動產出對應的 `.IsRequired().HasMaxLength(100)`、`builder.Ignore()` 等設定。不用開另一個設定檔，註解就是 metadata。

實際用下來，新增一個完整的 CRUD Aggregate（從 Entity 到 Endpoint）大約幾分鐘就能完成，而且產出的程式碼風格跟專案既有程式碼一致。

---

### 流程控管型 - Auto Bot

像這隻 StrayCat 是把上面的 skills 組合起來的 Bot，它的流程分五個 phase：

```text
Phase 0: Boot      → 偵測專案環境，等待指令
Phase 1: Understand → 讀取指定的 skills，釐清缺少的資訊
Phase 2: Plan       → 產生 task checklist，等使用者確認
Phase 3: Setup      → 建立 git worktree 隔離環境
Phase 4: Execute    → 逐步執行，每步打勾 + commit
Phase 5: Complete   → 回報完成，建議下一步
```

用起來像

```text
User Command: "@StrayCat"

StrayCat:
🐈‍⬛ StrayCat IN
Project: my-project
Branch:  main
Ready. 給我你的需求和要使用的 Skills。

User Command: "幫我新增 Order aggregate，參考 domain/order.cs 當前屬性欄位
              與 SKILL 生成三層架構, SKILL:<XXXX> <XXXX>"

StrayCat:
我讀了這兩個 skill，確認幾件事：
1. Order.cs 的完整路徑是？
2. Repository Interface 要我一併建立還是已經有了？
3. Namespace 照現有慣例？

User Command: "src/Domain/Orders/Order.cs，一併建，照慣例"

StrayCat:
## Task Plan
1. 讀取 Order.cs 分析 aggregate 結構 (manual)
2. 產生 EF Core Configuration → skill:add-ddd-aggregate-efcore
3. 產生 Repository 實作 → skill:add-ddd-repository

Approve?

User: "ok"

→ 建 worktree，寫 checklist，逐步執行，每步 commit
→ 全部完成後回報 summary
```

要注意的是呼叫 StrayCat 不一定每次成功，記得在 bot/SKILL.md 加入能辨識已啟動的指令

```text
### Phase 0: Boot — 進入 StrayCat 模式

When the user invokes StrayCat (e.g., `/StrayCat`, `@StrayCat`, or mentions StrayCat by name):

1. Detect the current project context:
   - **Project name**: derive from the current working directory (repo root folder name)
   - **Branch**: run `git branch --show-current`
   - **Repo root**: run `git rev-parse --show-toplevel`
2. Display the boot message and wait for the user's task:

🐈‍⬛ StrayCat IN
Project: <project-name>
Branch:  <current-branch>
Root:    <repo-root-path>

Ready. 給我你的需求和要使用的 Skills。

3. **Do NOT proceed until the user provides their task.** StrayCat is now in standby, waiting for input.
```

---

### Hooks

文謅謅的官方解釋:

```Hooks 是使用者定義的 shell 命令，在 Claude Code 生命週期的特定時間點執行。它們提供對 Claude Code 行為的確定性控制，確保某些操作始終發生，而不是依賴 LLM 選擇執行它們。使用 hooks 來強制執行專案規則、自動化重複性任務，並將 Claude Code 與您現有的工具整合。```

那設定的方法就是在`.claude/settings.json` 寫指定的 hook 配上需要用到的```.sh```：

```json
{
  "hooks": {
    "PermissionRequest": [{ "hooks": [{ "type": "command", "command": "~/.claude/hooks/auto-approve.sh" }] }],
    "PreToolUse":        [{ "matcher": "Bash", "hooks": [{ "type": "command", "command": "~/.claude/hooks/block-danger.sh" }] }],
    "Stop":              [{ "hooks": [{ "type": "command", "command": "~/.claude/hooks/notify-done.sh" }] }]
  }
}
```

#### auto-approve.sh - Skill Worktree 自動核准

剛剛有提到`.claude/settings.json`是吃全域的，而我只想在開 worktree 時幫我 auto approve，所以這個 hook 在偵測到 `skill-task-*` 目錄或 `skill/*` 分支時，才會自動放行白名單操作：

```bash
# 只在 skill worktree 中生效
CURRENT_DIR=$(basename "$PWD")
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

if [[ "$CURRENT_DIR" != skill-task-* ]] && [[ "$CURRENT_BRANCH" != skill/* ]]; then
  exit 0  # 不在 skill worktree → 正常跳確認
fi

# 白名單 Tool：Write, Edit, Read, Glob, Grep ...
# 白名單 Bash：git, npm, mkdir, cp, node ...
```

#### block-danger.sh - 擋危險指令

該防的也要防一下，不管在哪裡都永遠攔截：

```bash
DANGER_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  ":(){ :|:& };:"        # fork bomb
  "curl.*| *(bash|sh)"   # pipe to shell
  "wget.*| *(bash|sh)"
)
```

命中就 `exit 2` 直接擋掉，Claude 拿不到執行權限。

#### notify-done.sh - 完成通知

Claude Code 跑完任務（Stop 事件）時發一個通知：

```bash
powershell.exe -NoProfile -Command "
  Add-Type -AssemblyName System.Windows.Forms
  \$n = New-Object System.Windows.Forms.NotifyIcon
  \$n.Icon = [System.Drawing.SystemIcons]::Information
  \$n.Visible = \$true
  \$n.ShowBalloonTip(6000, 'Claude Code 完成', '${STOP_REASON}', 'Info')
  Start-Sleep -Milliseconds 6500
  \$n.Dispose()
"

# 順便寫 log
echo "[$(date)] stop_reason: $STOP_REASON" >> "$HOME/.claude/done.log"
```

---

### 小結

權限不敢亂開所以 auto approve 常常被打掉，之後再邊用邊微調修改，但效率真的提高很多...
