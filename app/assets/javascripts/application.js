//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
  const showHideFilterBtn = document.getElementById("show-hide-filter-btn");
  const clearFilterBtn = document.getElementById("clear-filter-btn");
  const filterForm = document.getElementById("filter-form");
  const filterList = document.getElementById("filter-list");
  const filteredByLabel = document.getElementById("filtered-by-label");
  const filteredByPlaceholderLabel = document.getElementById("filtered-by-placeholder-label");

  showHideFilterBtn.addEventListener('click', () => {
    const isHidden = filterForm.classList.toggle('hidden');
    showHideFilterBtn.textContent = isHidden ? 'Show filters' : 'Hide filters';
  });

  clearFilterBtn.addEventListener('click', () => {
    filterForm.reset()
    filterList.textContent = ''
    filteredByLabel.classList.add('hidden')
    filteredByPlaceholderLabel.classList.remove('hidden')
  });

  filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(filterForm);

    const selectedValues = Array.from(formData.entries()).filter(([, value]) => value).map(([name,]) => name);

    const humanisedValues = humaniseFilterList(selectedValues)

    filterList.textContent = humanisedValues

    if (humanisedValues !== '') {
      filteredByLabel.classList.remove('hidden');
      filteredByPlaceholderLabel.classList.add('hidden')
    }
  });

  const humaniseFilterList = (filters) => {
    let humanisedFilters = []
    filters.forEach(filter => {
      let titleCase = filter.charAt(0).toUpperCase() + filter.slice(1)

      // Special cases
      if (titleCase.startsWith('Date')) {
        titleCase = 'Date'
      }

      if (titleCase.startsWith('Total')) {
        titleCase = 'Total cost'
      }

      if (titleCase.startsWith('Created')) {
        titleCase = 'Submitted by'
      }

      if (!humanisedFilters.includes(titleCase)) {
        humanisedFilters.push(titleCase)
      }
    })

    return humanisedFilters.join(', ')
  }

})
