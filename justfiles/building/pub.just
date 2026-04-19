# Publish the LazyPi package to npm
# Usage: just pub
# Example: just pub

pub:
    #!/usr/bin/env bash
    set -euo pipefail

    echo "📦 Preparing LazyPi publish..."

    if ! command -v npm >/dev/null 2>&1; then
        echo "❌ npm is required but was not found in PATH."
        exit 1
    fi

    if ! npm whoami >/dev/null 2>&1; then
        echo "🔐 npm login required. Starting npm login..."
        npm login
        if ! npm whoami >/dev/null 2>&1; then
            echo "❌ npm login did not complete successfully."
            exit 1
        fi
    fi

    if [ ! -f package.json ]; then
        echo "❌ package.json is missing."
        exit 1
    fi

    PACKAGE_NAME=$(node -p "require('./package.json').name")
    PACKAGE_VERSION=$(node -p "require('./package.json').version")

    echo "🔎 Publishing ${PACKAGE_NAME}@${PACKAGE_VERSION}"
    npm publish
    echo "✅ Publish complete"
