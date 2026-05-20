# Configuração do Google Apps Script

Siga estes passos para fazer o formulário funcionar com sua planilha:

1. Abra a [Planilha do Google](https://sheets.new) onde deseja salvar as mensagens.
2. No menu superior, vá em **Extensões** > **Apps Script**.
3. Apague o código que estiver lá e cole o seguinte:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Adiciona uma linha com Data, Nome, Email, Assunto e Mensagem
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.subject || 'Sem assunto',
      data.message
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Necessário para evitar erros de CORS (Preflight request)
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

4. Clique no ícone de disquete para salvar (dê um nome ao projeto, como "Bot de Contato").
5. Clique em **Implantar** (Deploy) > **Nova implantação**.
6. Em "Selecionar tipo", escolha **App da Web**.
7. Em "Quem pode acessar", escolha **Qualquer pessoa**. Isso é importante para o formulário funcionar.
8. Clique em **Implantar** e autorize as permissões se solicitado.
9. **Copie a URL do App da Web** que será gerada.
10. Cole essa URL no arquivo `script.js` (ou no campo correspondente no `index.html`) do seu projeto.
