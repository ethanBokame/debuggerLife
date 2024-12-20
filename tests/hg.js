// Charger Highlight.js depuis le CDN
const highlightJsScript = document.createElement("script");
highlightJsScript.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js";
highlightJsScript.defer = true;
document.head.appendChild(highlightJsScript);

// Charger le style de Highlight.js
const highlightJsStyle = document.createElement("link");
highlightJsStyle.rel = "stylesheet";
highlightJsStyle.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/default.min.css";
document.head.appendChild(highlightJsStyle);

// Attendre que Highlight.js soit chargé
highlightJsScript.onload = () => {
  // Créer un élément <pre><code>
  const preNode = document.createElement("pre");
  const codeNode = document.createElement("code");
  
  // Ajouter la classe de langage (exemple : JavaScript)
  codeNode.className = "javascript";
  
  // Ajouter le contenu du code
  const codeContent = `
function sayHello() {
  console.log('Hello, World!');
}
sayHello();
  `;
  codeNode.textContent = codeContent;
  
  // Ajouter le <code> dans le <pre>
  preNode.appendChild(codeNode);
  
  // Ajouter le <pre> au corps du document
  document.body.appendChild(preNode);
  
  // Appliquer Highlight.js au bloc de code
  hljs.highlightElement(codeNode);
};
