#!/bin/bash

# AlbCore Docs - Script de Inicialização
# Windows + Git Bash
# Autor: Copilot Agent
# Data: 2026-06-12

set -e

echo "📚 AlbCore Docs - Startup Script"
echo "================================"
echo ""

# 1. Verificar Node.js
echo "1️⃣ Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo "✅ npm encontrado: $(npm --version)"
echo ""

# 2. Verificar dependências
echo "2️⃣ Verificando dependências..."
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules não encontrado. Instalando dependências..."
    npm install
    echo ""
fi

echo "✅ Dependências OK"
echo ""

# 3. Verificar porta 3001
echo "3️⃣ Verificando porta 3001..."
if netstat -ano | grep -q ":3001"; then
    echo "⚠️  Porta 3001 em uso. Liberando..."
    PID=$(netstat -ano | grep ":3001" | awk '{print $5}' | head -1)
    taskkill //PID $PID //F 2>/dev/null || echo "Processo já finalizado"
    sleep 2
fi

echo "✅ Porta 3001 livre"
echo ""

# 4. Iniciar docs
echo "4️⃣ Iniciando AlbCore Docs (Nextra)..."
echo "🌐 URL: http://localhost:3001"
echo ""
echo "⚡ Iniciando (mantenha este terminal aberto)..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run dev

