# Ajax utilizando Javascript puro

## Utilização
  - Para utilizar, é necessário chamar adicionar o script e depois a função do ajax, passando os parâmentros necessários para ela, sendo eles:
    ```js
      <script src="./ajax.js"></script>
      
      Ajax();
    ```

    - ***data***: Objeto com os dados de configuração do ajax;
      ```js
        Ajax({Object});
      ```
  
    - Os campos desse objeto são:
      - **method**: Método de envio do ajax (get, post). *Default = 'get'*;
      - **url**: Url da requisição;
      - **type**: Tipo do response (application/json, application/stringfy). *Default: O response será retornado sem nenhuma formatação*;
      - **data**: Dados que vão ser enviados;
      - **success**:  Função que será executada, quando a requisição obtiver successo;
      - **error**: Função que será executada, quando a requisição obtiver erro;
    
    - **EX:**
      ```js
        Ajax({
          method: 'get',
          url: "http://url.com",
          type: "application/json",
          data: {
            tipo: "Pessoas"
          },
          success: data => {
            console.log(data);
          },
          error: () => {
            console.log("Not found");
          }
        });
      ```
    ---

    - ***async***: Define se o ajax será feito de forma assíncrona ou não. Por padrão, ele vem como `true`;
    ```js
      Ajax({...}, false);
    ```