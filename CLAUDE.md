# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Commands

- `bun build` - Build library using bunup
- `bun run check` - Type check without emitting files
- `bun test` - Run tests

## Architecture

Library for generating URLs to Railway.com resources. Uses Bun runtime and bunup
for building. TypeScript with strict mode and isolated declarations enabled.
Exports ESM only from `dist/`.
