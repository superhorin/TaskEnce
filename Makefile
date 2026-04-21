# ----------------------------------------------------------------              
# Variables
# ----------------------------------------------------------------
BACK_DIR 	:= backend
FRONT_DIR	:= frontend
MISE		:= mise exec --

# ----------------------------------------------------------------
# Main Commands
# ----------------------------------------------------------------

.PHONY: all
all: setup docker-up dev

# 1. 初回セットアップ（インストールと環境設定）
.PHONY: setup
setup:
	@echo "🚀 Setting up backend..."
	cd $(BACK_DIR) && mise trust && mise install && $(MISE) npm install
	@if [ ! -f $(BACK_DIR)/.env ]; then \
		cp $(BACK_DIR)/.env.local $(BACK_DIR)/.env; \
	fi
	@echo "🚀 Setting up frontend..."
	cd $(FRONT_DIR) && mise trust && mise install && $(MISE) npm install
	@if [ ! -f $(FRONT_DIR)/.env ]; then \
		cp $(FRONT_DIR)/.env.local $(FRONT_DIR)/.env; \
	fi

# 2. Docker起動
.PHONY: docker-up
docker-up:
	@echo "🐳 Starting Docker containers..."
	cd $(BACK_DIR) && docker-compose up -d

.PHONY: dev
dev:
	@echo "💡 Tip: Run 'make dev-back' and 'make dev-front' in separate terminals."

# 3. バックエンド起動
.PHONY: dev-back
dev-back:
	cd $(BACK_DIR) && $(MISE) npm run dev

# 4. フロントエンド起動
.PHONY: dev-front
dev-front:
	cd $(FRONT_DIR) && $(MISE) npm run dev

# 5. 全てを一度に停止（Dockerのみ）
.PHONY: down
down:
	cd $(BACK_DIR) && docker-compose down
