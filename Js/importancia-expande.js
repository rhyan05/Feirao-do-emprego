function toggleCard(clickedCard) {
  const allCards = document.querySelectorAll('.importance-card');
  const wasActive = clickedCard.classList.contains('active');
  
  // Fecha todos os cards
  allCards.forEach(card => {
    card.classList.remove('active');
  });
  
  // Se não estava ativo antes, abre o card clicado
  if (!wasActive) {
    clickedCard.classList.add('active');
  }
}