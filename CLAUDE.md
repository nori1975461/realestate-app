# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a real estate application. Architecture, commands, and structure will be documented here as the project develops.

## Git Rules

**Every code change must be committed and pushed to GitHub immediately.**

```bash
git add <changed-files>
git commit -m "description of change"
git push origin main
```

- Always push after each meaningful change — do not batch multiple unrelated changes into one commit.
- Write clear, descriptive commit messages in the imperative mood (e.g. "Add property search filter", "Fix price formatting bug").
- Never commit sensitive data (API keys, credentials, `.env` files).
- If the repository has not been initialized yet, run:

```bash
git init
git remote add origin <GitHub-repo-URL>
git push -u origin main
```
