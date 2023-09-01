Promise.all([
  fetch('cy-style.json')
    .then(function(res) {
      return res.json();
    }),
  fetch('cbo_cytoscape.json')
    .then(function(res) {
      return res.json();
    })
])
  .then(function(dataArray) {
    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {name: 'circle'},

      style: dataArray[0],
      
      elements: dataArray[1],
    });

    cy.unbind('click');
    cy.bind('click', function(e){
      if (e.target === cy)  {
        cy.nodes().removeClass('highlighted');  
        cy.edges().removeClass('highlighted');  
      }
      else { 
        cy.nodes("[id = '" + e.target.id() + "']").addClass('highlighted');
        cy.edges("[source='" + e.target.id() + "']").addClass('highlighted');
        cy.edges("[target='" + e.target.id() + "']").addClass('highlighted');
      }
    });

  });
