# Bug Report Standards

[Purpose: guide how to document, analisar e registrar bugs encontrados em testes manuais ou sessões de QA, garantindo rastreabilidade, análise de causa raiz e avaliação das lacunas de cobertura de testes]

## Quando criar um bug report

Crie um arquivo `bug-report-{YYYY-MM-DD}.md` em `.sdd/specs/{feature}/` sempre que:
- Testes manuais revelarem comportamento incorreto em ambiente de desenvolvimento ou staging
- Erros de runtime forem reproduzíveis e não cobertos por testes automatizados
- Um fluxo de negócio crítico falhar após integração de componentes

Localização padrão: `.sdd/specs/{feature}/bug-report-{YYYY-MM-DD}.md`

---

## Estrutura do arquivo

### Cabeçalho obrigatório
```markdown
# Bug Report — {Descrição curta} ({YYYY-MM-DD})

## Contexto
Descreva em 2–3 linhas: ambiente, usuário de teste, fluxo executado.
```

### Por bug: seção `BUG-{NN}`
```markdown
## BUG-{NN} — {Título do sintoma observado}

### Sintoma
O que o usuário vê. Mensagem de erro exata, tela afetada.

### Causa raiz
O que tecnicamente está errado. Incluir:
- Arquivo e linha do frontend: `path/to/file.ts:NN`
- Arquivo e linha do backend: `path/to/file.ts:NN`
- Diff mínimo mostrando o desalinhamento (ex: URL esperada vs. URL real)

### Por que os testes não impediram este erro
Tabela obrigatória:

| Camada | O que foi testado | O que não foi testado |
|--------|-------------------|-----------------------|
| ...    | ...               | ...                   |

Conclua com a lacuna estrutural de teste (ex: "gap de contrato", "ausência de teste E2E").
```

### Seção de resumo
```markdown
## Resumo

| Bug | Localização | Tipo | Causa raiz |
|-----|-------------|------|------------|
| BUG-01 | `file.ts:NN` | Contrato HTTP | ... |

## Lacunas de teste identificadas
Lista numerada das lacunas estruturais, não dos bugs individuais.
```

---

## Tipos de causa raiz

Categorize cada bug em um destes tipos para facilitar triagem:

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **Contrato HTTP** | URL, método, params ou body shape divergem entre frontend e backend | Path param vs. query param |
| **Lógica de negócio** | Regra implementada incorretamente no serviço | Validação de horário invertida |
| **Estado de UI** | Componente exibe dado desatualizado ou condição de corrida | Cache não invalidado |
| **Configuração de ambiente** | CORS, variável de env, porta errada | `NEXT_PUBLIC_API_URL` apontando para URL privada |
| **Schema de dados** | Tipos incompatíveis, campos ausentes, nomes diferentes | `emailVerifiedAt` vs. `email_verified_at` |

---

## Análise de lacunas de teste

Todo bug report deve responder: **por que a suíte de testes existente não detectou isso?**

Padrões comuns neste projeto:

- **Testes de frontend mockam axios** — validam lógica mas não a URL construída nem o shape enviado
- **Testes de backend mockam o repositório** — exercitam o serviço mas não o binding de rota no controller
- **Ausência de testes de contrato** — frontend e backend evoluem sem artefato compartilhado (OpenAPI, Pact)
- **Ausência de testes E2E** — nenhum teste atravessa a pilha completa e valida o fluxo do usuário

Para cada lacuna, referencie a task correspondente no plano de implementação se houver (ex: `Task 12.1`, `Task 12.3`).

---

## Convenções de escrita

- Idioma: seguir o `spec.json.language` da especificação ativa
- IDs de bug: sequenciais por arquivo (`BUG-01`, `BUG-02`, `BUG-02a`, `BUG-02b`)
- Referências de código: sempre incluir caminho relativo e número de linha
- Não descrever correções no bug report — correções vão em commits ou tasks separadas
