function sortable(id, methodArg, startColumn){
  var headings = document.querySelectorAll(id + ' thead th')
  var rows = document.querySelectorAll(id + ' tbody tr')
  var tbody = document.querySelector(id + ' tbody')
  var ASC = 'asc'
  var DESC = 'desc'
  var DATA_METHOD = 'data-method'
  
  var rowsArray = []

  function getRows(index){
    if(rowsArray.indexOf(rows[index]) < 0){
      var tr = rows[index]
      rowsArray.push(tr)
    }
  }

  function sortBy(index, method){

    function compare(a, b) {
      a = a.children[index].textContent
      b = b.children[index].textContent
      
      if(!isNaN(parseFloat(a))){
        a = parseInt(a)
        b = parseInt(b)
      }

      if(method == ASC){
        if (a > b) return 1
        if (b > a) return -1
        return 0
      }

      // Method is DESC
      if (b > a) return 1
      if (a > b) return -1
      return 0
    }

    rowsArray.sort(compare)
    tbody.innerHTML = null
    rowsArray.forEach(function(tr){
      tbody.appendChild(tr) 
    })
  }

  rows.forEach(function(_, index){ getRows(index) })

  headings.forEach(setMethodAndAttachClickEvent)

  function setMethodAndAttachClickEvent(th, index){
    th.setAttribute(DATA_METHOD, methodArg || ASC)
    sort(startColumn || 0, th)
    
    th.addEventListener('click', function(e){
      sort(index, e.target)
    }, false)
  }

  function sort(index, target){
    var method = target.getAttribute(DATA_METHOD)
    sortBy(index, method)
    target.setAttribute(DATA_METHOD, (method == ASC ? DESC : ASC))
  }
}

