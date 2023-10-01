console.log('Start')

const templateElements = document.querySelectorAll('.template');

templateElements.forEach((element) => console.log(element.getAttribute("name")))


function isElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  }
  catch(e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
}

templateElements.forEach((element) =>
	fetch('../html/' + element.getAttribute("name") + '.html')
	  .then(response => response.text())
	  .then(html => {
		// Create a temporary container element
		const tempContainer = document.createElement('div');
		tempContainer.innerHTML = html;
		
		// Append the contents of the loaded HTML to the target element
		if(isElement(element)){
			element.appendChild(tempContainer.firstChild);
		} else {
			console.log(element.getAttribute("name") + ' is an invalid template element!!!')
		}
	  })
	  .catch(error => console.log(error))
)

