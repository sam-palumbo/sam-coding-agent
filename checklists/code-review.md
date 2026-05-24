# Code Review Checklist

- [ ] Código compila/type-check sem erros
- [ ] Testes passam (e novos cenários estão cobertos)
- [ ] Sem secrets/credenciais no diff
- [ ] Nomes são claros (variáveis, funções, tipos)
- [ ] Funções fazem uma coisa só
- [ ] Tratamento de erro adequado (não engole exceptions)
- [ ] Sem magic numbers / strings — constantes nomeadas
- [ ] Side effects são documentados ou isolados
- [ ] Mutabilidade mínima (preferir const/imutável)
- [ ] Complexidade ciclomática baixa (sem if aninhados profundos)
