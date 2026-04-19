# Default: Show help menu

default:
    @just help

# ============================================================================
# Help Command
# ============================================================================

help:
    @echo ""
    @echo "\033[1;36m======================================\033[0m"
    @echo "\033[1;36m            LazyPi Commands           \033[0m"
    @echo "\033[1;36m======================================\033[0m"
    @echo ""
    @echo "\033[1;35m  Most Common Commands:\033[0m"
    @echo "  just \033[0;33mhelp\033[0m                  \033[0;32mShow this help menu\033[0m"
    @echo "  just \033[0;33mpub\033[0m                   \033[0;32mPublish the package to npm\033[0m"
    @echo ""
    @echo "\033[1;35m  Building:\033[0m"
    @echo "  just \033[0;33mpub\033[0m                   \033[0;32mRun publish checks and npm publish\033[0m"
    @echo ""

# ============================================================================
# Building Commands
# ============================================================================
import 'justfiles/building/pub.just'
