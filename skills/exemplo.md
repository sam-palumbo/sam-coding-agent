# Skill: Configurar ESLint + Prettier em um projeto novo

## Passos
1. Instalar dependências:
   ```bash
   npm i -D eslint prettier eslint-config-prettier
   ```
2. Criar `.eslintrc.json` com extends `prettier`
3. Criar `.prettierrc` com as regras do time
4. Adicionar script `"lint": "eslint ."` e `"format": "prettier --write ."`
5. Rodar e corrigir

## Referências
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
